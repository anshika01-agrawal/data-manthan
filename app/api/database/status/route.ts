import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'
import { 
  Species, 
  GeneticSequence, 
  OceanographicData, 
  EdnaAnalysis, 
  OtolithAnalysis 
} from '@/lib/models'

export async function GET() {
  try {
    await connectDB()
    
    // Get basic connection info
    const dbName = mongoose.connection.name
    const host = mongoose.connection.host
    const readyState = mongoose.connection.readyState
    
    const stateMap = {
      0: 'disconnected',
      1: 'connected', 
      2: 'connecting',
      3: 'disconnecting'
    }
    
    // Get collection counts
    const [
      speciesCount,
      geneticCount,
      oceanCount,
      ednaCount,
      otolithCount
    ] = await Promise.all([
      Species.countDocuments().catch(() => 0),
      GeneticSequence.countDocuments().catch(() => 0),
      OceanographicData.countDocuments().catch(() => 0),
      EdnaAnalysis.countDocuments().catch(() => 0),
      OtolithAnalysis.countDocuments().catch(() => 0)
    ])
    
    // Get recent data
    const recentOceanData = await OceanographicData.find({})
      .sort({ measurementDate: -1 })
      .limit(5)
      .select('stationId measurementDate temperature salinity')
      .catch(() => [])
    
    return NextResponse.json({
      success: true,
      database: {
        name: dbName,
        host: host,
        status: stateMap[readyState as keyof typeof stateMap] || 'unknown',
        connected: readyState === 1
      },
      collections: {
        species: speciesCount,
        genetic_sequences: geneticCount,
        oceanographic_data: oceanCount,
        edna_analysis: ednaCount,
        otolith_analysis: otolithCount,
        total: speciesCount + geneticCount + oceanCount + ednaCount + otolithCount
      },
      recentData: {
        oceanographic: recentOceanData
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      database: {
        connected: false,
        status: 'error'
      },
      error: error instanceof Error ? error.message : 'Database connection failed',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}