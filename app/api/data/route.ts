import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Species, GeneticSequence, OceanographicData, EdnaAnalysis, OtolithAnalysis } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { dataType, data } = await request.json()
    
    let savedData

    switch (dataType) {
      case 'species':
        savedData = new Species(data)
        await savedData.save()
        break
        
      case 'genetic-sequence':
        savedData = new GeneticSequence(data)
        await savedData.save()
        break
        
      case 'oceanographic':
        savedData = new OceanographicData(data)
        await savedData.save()
        break
        
      case 'edna':
        savedData = new EdnaAnalysis(data)
        await savedData.save()
        break
        
      case 'otolith':
        savedData = new OtolithAnalysis(data)
        await savedData.save()
        break
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid data type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      message: `${dataType} data saved successfully`,
      id: savedData._id
    })
    
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const limit = parseInt(searchParams.get('limit') || '50')
    
    // Try to connect to database
    try {
      await connectDB()
      console.log('✅ Database connected, fetching real data')
    } catch (dbError) {
      console.log('⚠️  Database not available, using mock data')
      // Import and return mock data
      const { getMockDashboardStats } = await import('@/lib/mockDataService')
      const mockStats = await getMockDashboardStats()
      return NextResponse.json({
        success: true,
        data: {
          species: type === 'all' || type === 'species' ? mockStats.speciesDistribution : undefined,
          oceanographic: type === 'all' || type === 'oceanographic' ? mockStats.oceanographicTrend : undefined,
          edna: type === 'all' || type === 'edna' ? [] : undefined,
          otolith: type === 'all' || type === 'otolith' ? [] : undefined,
          genetic: type === 'all' || type === 'genetic' ? [] : undefined
        },
        source: 'mock',
        timestamp: new Date().toISOString()
      })
    }
    
    let data: any = {}
    
    if (type === 'all' || type === 'species') {
      data.species = await Species.find({}).limit(limit).lean()
    }
    
    if (type === 'all' || type === 'oceanographic') {
      data.oceanographic = await OceanographicData.find({})
        .sort({ measurementDate: -1 })
        .limit(limit)
        .lean()
    }
    
    if (type === 'all' || type === 'edna') {
      data.edna = await EdnaAnalysis.find({})
        .sort({ collectionDate: -1 })
        .limit(limit)
        .lean()
    }
    
    if (type === 'all' || type === 'otolith') {
      data.otolith = await OtolithAnalysis.find({})
        .sort({ analysisDate: -1 })
        .limit(limit)
        .lean()
    }
    
    if (type === 'all' || type === 'genetic') {
      data.genetic = await GeneticSequence.find({})
        .sort({ submissionDate: -1 })
        .limit(limit)
        .select('-sequence')
        .lean()
    }
    
    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}