import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Species } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const marineZone = searchParams.get('marineZone') || ''
    const conservationStatus = searchParams.get('conservationStatus') || ''
    
    const filter: any = {}
    
    if (search) {
      filter.$or = [
        { scientificName: { $regex: search, $options: 'i' } },
        { commonName: { $regex: search, $options: 'i' } },
        { genus: { $regex: search, $options: 'i' } },
        { family: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (marineZone) filter.marineZone = marineZone
    if (conservationStatus) filter.conservationStatus = conservationStatus
    
    const species = await Species.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ lastUpdated: -1 })
    
    const total = await Species.countDocuments(filter)
    
    return NextResponse.json({
      species,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    })
  } catch (error) {
    console.error('Error fetching species:', error)
    return NextResponse.json(
      { error: 'Failed to fetch species data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const data = await request.json()
    const species = new Species(data)
    await species.save()
    
    return NextResponse.json({ species }, { status: 201 })
  } catch (error) {
    console.error('Error creating species:', error)
    return NextResponse.json(
      { error: 'Failed to create species' },
      { status: 500 }
    )
  }
}