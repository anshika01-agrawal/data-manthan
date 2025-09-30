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
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const dataType = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    let data
    let total

    switch (dataType) {
      case 'species':
        data = await Species.find({}).limit(limit).sort({ createdAt: -1 })
        total = await Species.countDocuments()
        break
        
      case 'genetic-sequence':
        data = await GeneticSequence.find({}).limit(limit).sort({ submissionDate: -1 }).select('-sequence')
        total = await GeneticSequence.countDocuments()
        break
        
      case 'oceanographic':
        data = await OceanographicData.find({}).limit(limit).sort({ measurementDate: -1 })
        total = await OceanographicData.countDocuments()
        break
        
      case 'edna':
        data = await EdnaAnalysis.find({}).limit(limit).sort({ collectionDate: -1 })
        total = await EdnaAnalysis.countDocuments()
        break
        
      case 'otolith':
        data = await OtolithAnalysis.find({}).limit(limit).sort({ analysisDate: -1 })
        total = await OtolithAnalysis.countDocuments()
        break
        
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid data type' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      data,
      total,
      limit
    })
    
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}