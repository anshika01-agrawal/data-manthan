import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { OceanographicData } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')
    const stationId = searchParams.get('stationId') || ''
    const region = searchParams.get('region') || ''
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const minDepth = searchParams.get('minDepth')
    const maxDepth = searchParams.get('maxDepth')
    
    const filter: any = {}
    
    if (stationId) filter.stationId = stationId
    if (region) filter['location.region'] = { $regex: region, $options: 'i' }
    
    if (startDate || endDate) {
      filter.measurementDate = {}
      if (startDate) filter.measurementDate.$gte = new Date(startDate)
      if (endDate) filter.measurementDate.$lte = new Date(endDate)
    }
    
    if (minDepth || maxDepth) {
      filter.depth = {}
      if (minDepth) filter.depth.$gte = parseFloat(minDepth)
      if (maxDepth) filter.depth.$lte = parseFloat(maxDepth)
    }
    
    const data = await OceanographicData.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ measurementDate: -1 })
    
    const total = await OceanographicData.countDocuments(filter)
    
    // Calculate averages for dashboard
    const aggregation = await OceanographicData.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          avgTemperature: { $avg: '$temperature' },
          avgSalinity: { $avg: '$salinity' },
          avgChlorophyll: { $avg: '$chlorophyll' },
          avgPh: { $avg: '$pH' },
          avgDissolvedOxygen: { $avg: '$dissolvedOxygen' }
        }
      }
    ])
    
    return NextResponse.json({
      data,
      statistics: aggregation[0] || {},
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Error fetching oceanographic data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch oceanographic data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const data = await request.json()
    const oceanData = new OceanographicData(data)
    await oceanData.save()
    
    return NextResponse.json({ data: oceanData }, { status: 201 })
  } catch (error) {
    console.error('Error creating oceanographic data:', error)
    return NextResponse.json(
      { error: 'Failed to create oceanographic data' },
      { status: 500 }
    )
  }
}