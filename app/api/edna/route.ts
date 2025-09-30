import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { EdnaAnalysis } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const waterBody = searchParams.get('waterBody') || ''
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    const filter: any = {}
    
    if (waterBody) filter['location.waterBody'] = { $regex: waterBody, $options: 'i' }
    
    if (startDate || endDate) {
      filter.collectionDate = {}
      if (startDate) filter.collectionDate.$gte = new Date(startDate)
      if (endDate) filter.collectionDate.$lte = new Date(endDate)
    }
    
    const analyses = await EdnaAnalysis.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ collectionDate: -1 })
    
    const total = await EdnaAnalysis.countDocuments(filter)
    
    // Calculate diversity statistics
    const diversityStats = await EdnaAnalysis.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgRichness: { $avg: '$diversityMetrics.richness' },
          avgShannon: { $avg: '$diversityMetrics.shannon' },
          avgSimpson: { $avg: '$diversityMetrics.simpson' },
          totalSamples: { $sum: 1 }
        }
      }
    ])
    
    return NextResponse.json({
      analyses,
      statistics: diversityStats[0] || {},
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Error fetching eDNA analyses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch eDNA analyses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const data = await request.json()
    const analysis = new EdnaAnalysis(data)
    await analysis.save()
    
    return NextResponse.json({ analysis }, { status: 201 })
  } catch (error) {
    console.error('Error creating eDNA analysis:', error)
    return NextResponse.json(
      { error: 'Failed to create eDNA analysis' },
      { status: 500 }
    )
  }
}