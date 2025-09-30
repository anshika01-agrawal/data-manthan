import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { OtolithAnalysis } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const species = searchParams.get('species') || ''
    const otolithType = searchParams.get('otolithType') || ''
    const minAge = searchParams.get('minAge')
    const maxAge = searchParams.get('maxAge')
    
    const filter: any = {}
    
    if (species) filter.species = { $regex: species, $options: 'i' }
    if (otolithType) filter.otolithType = otolithType
    
    if (minAge || maxAge) {
      filter.ageEstimate = {}
      if (minAge) filter.ageEstimate.$gte = parseInt(minAge)
      if (maxAge) filter.ageEstimate.$lte = parseInt(maxAge)
    }
    
    const analyses = await OtolithAnalysis.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ analysisDate: -1 })
    
    const total = await OtolithAnalysis.countDocuments(filter)
    
    // Calculate morphometric statistics
    const morphometricStats = await OtolithAnalysis.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$species',
          avgLength: { $avg: '$measurements.length' },
          avgWidth: { $avg: '$measurements.width' },
          avgWeight: { $avg: '$measurements.weight' },
          avgAge: { $avg: '$ageEstimate' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ])
    
    return NextResponse.json({
      analyses,
      statistics: morphometricStats,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Error fetching otolith analyses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch otolith analyses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const data = await request.json()
    const analysis = new OtolithAnalysis(data)
    await analysis.save()
    
    return NextResponse.json({ analysis }, { status: 201 })
  } catch (error) {
    console.error('Error creating otolith analysis:', error)
    return NextResponse.json(
      { error: 'Failed to create otolith analysis' },
      { status: 500 }
    )
  }
}