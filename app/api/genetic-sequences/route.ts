import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { GeneticSequence } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const organism = searchParams.get('organism') || ''
    const gene = searchParams.get('gene') || ''
    const sequenceType = searchParams.get('sequenceType') || ''
    
    const filter: any = {}
    
    if (organism) filter.organism = { $regex: organism, $options: 'i' }
    if (gene) filter.gene = { $regex: gene, $options: 'i' }
    if (sequenceType) filter.sequenceType = sequenceType
    
    const sequences = await GeneticSequence.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ submissionDate: -1 })
      .select('-sequence') // Exclude large sequence field by default
    
    const total = await GeneticSequence.countDocuments(filter)
    
    return NextResponse.json({
      sequences,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Error fetching genetic sequences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch genetic sequences' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const data = await request.json()
    const sequence = new GeneticSequence(data)
    await sequence.save()
    
    return NextResponse.json({ sequence }, { status: 201 })
  } catch (error) {
    console.error('Error creating genetic sequence:', error)
    return NextResponse.json(
      { error: 'Failed to create genetic sequence' },
      { status: 500 }
    )
  }
}