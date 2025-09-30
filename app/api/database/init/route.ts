import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    if (action !== 'initialize') {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      )
    }
    
    console.log('🚀 Initializing database from API...')
    await connectDB()
    
    // Get database info
    const db = mongoose.connection.db
    const dbName = mongoose.connection.name
    const collections = await db.listCollections().toArray()
    
    // Create collections by ensuring they exist
    const collectionNames = [
      'species',
      'genetic_sequences', 
      'oceanographic_data',
      'edna_analysis',
      'otolith_analysis',
      'research_projects'
    ]
    
    const createdCollections = []
    
    for (const collectionName of collectionNames) {
      const exists = collections.some(c => c.name === collectionName)
      if (!exists) {
        await db.createCollection(collectionName)
        createdCollections.push(collectionName)
      }
    }
    
    // Get final collection list
    const finalCollections = await db.listCollections().toArray()
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      database: dbName,
      collections: finalCollections.map(c => c.name),
      createdCollections,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database initialization failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    
    const db = mongoose.connection.db
    const dbName = mongoose.connection.name
    const collections = await db.listCollections().toArray()
    
    // Get collection stats
    const collectionStats = []
    for (const collection of collections) {
      try {
        const stats = await db.collection(collection.name).stats()
        collectionStats.push({
          name: collection.name,
          count: stats.count,
          size: Math.round(stats.size / 1024) + 'KB'
        })
      } catch (error) {
        collectionStats.push({
          name: collection.name,
          count: 0,
          size: '0KB'
        })
      }
    }
    
    return NextResponse.json({
      success: true,
      database: dbName,
      host: mongoose.connection.host,
      collections: collectionStats,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get database status',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}