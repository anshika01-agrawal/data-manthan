import { NextRequest, NextResponse } from 'next/server'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import connectDB from '@/lib/mongodb'
import { Species, OceanographicData, EdnaAnalysis, OtolithAnalysis, GeneticSequence } from '@/lib/models'

// File upload configuration is handled by Next.js App Router automatically

// Helper function to parse CSV content
function parseCSV(content: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data)
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}

// Helper function to parse Excel content
function parseExcel(buffer: Buffer): any[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  return XLSX.utils.sheet_to_json(worksheet)
}

// Helper function to map uploaded data to appropriate schema
function mapDataToSchema(data: any[], dataType: string) {
  switch (dataType) {
    case 'species':
      return data.map(row => ({
        scientificName: row.scientificName || row['Scientific Name'] || `Species_${Date.now()}`,
        commonName: row.commonName || row['Common Name'] || '',
        taxonomyId: row.taxonomyId || row['Taxonomy ID'] || `txid_${Date.now()}`,
        kingdom: row.kingdom || row.Kingdom || 'Animalia',
        phylum: row.phylum || row.Phylum || 'Unknown',
        class: row.class || row.Class || 'Unknown',
        order: row.order || row.Order || 'Unknown',
        family: row.family || row.Family || 'Unknown',
        genus: row.genus || row.Genus || 'Unknown',
        species: row.species || row.Species || 'unknown',
        habitat: typeof row.habitat === 'string' ? row.habitat.split(',') : ['marine'],
        geographicDistribution: [{
          coordinates: [
            parseFloat(row.longitude || row.Longitude || '75.0'),
            parseFloat(row.latitude || row.Latitude || '15.0')
          ],
          locationName: row.location || row.Location || 'Unknown Location',
          depth: parseFloat(row.depth || row.Depth || '10')
        }],
        conservationStatus: row.conservationStatus || row['Conservation Status'] || 'LC',
        marineZone: row.marineZone || row['Marine Zone'] || 'pelagic',
        characteristics: {
          length: parseFloat(row.length || row.Length || '0'),
          weight: parseFloat(row.weight || row.Weight || '0'),
          lifespan: parseFloat(row.lifespan || row.Lifespan || '1'),
          diet: typeof row.diet === 'string' ? row.diet.split(',') : ['unknown']
        },
        dataSource: 'User Upload'
      }))
      
    case 'oceanographic':
      return data.map(row => ({
        stationId: row.stationId || row['Station ID'] || `STATION_${Date.now()}`,
        location: {
          coordinates: [
            parseFloat(row.longitude || row.Longitude || '75.0'),
            parseFloat(row.latitude || row.Latitude || '15.0')
          ],
          name: row.locationName || row['Location Name'] || 'Unknown Station',
          region: row.region || row.Region || 'Unknown Region'
        },
        measurementDate: new Date(row.date || row.Date || Date.now()),
        depth: parseFloat(row.depth || row.Depth || '10'),
        temperature: parseFloat(row.temperature || row.Temperature || '25'),
        salinity: parseFloat(row.salinity || row.Salinity || '35'),
        pH: parseFloat(row.pH || row.ph || '8.0'),
        dissolvedOxygen: parseFloat(row.dissolvedOxygen || row['Dissolved Oxygen'] || '6.0'),
        chlorophyll: parseFloat(row.chlorophyll || row.Chlorophyll || '1.0'),
        turbidity: parseFloat(row.turbidity || row.Turbidity || '0.5'),
        nutrients: {
          nitrate: parseFloat(row.nitrate || row.Nitrate || '0.3'),
          phosphate: parseFloat(row.phosphate || row.Phosphate || '0.1'),
          silicate: parseFloat(row.silicate || row.Silicate || '2.0')
        },
        currentSpeed: parseFloat(row.currentSpeed || row['Current Speed'] || '0.2'),
        currentDirection: parseFloat(row.currentDirection || row['Current Direction'] || '180'),
        waveHeight: parseFloat(row.waveHeight || row['Wave Height'] || '1.0'),
        dataQuality: row.dataQuality || row['Data Quality'] || 'good',
        instrument: row.instrument || row.Instrument || 'Manual Entry',
        dataSource: 'User Upload'
      }))
      
    case 'edna':
      return data.map(row => ({
        sampleId: row.sampleId || row['Sample ID'] || `eDNA_${Date.now()}`,
        location: {
          coordinates: [
            parseFloat(row.longitude || row.Longitude || '75.0'),
            parseFloat(row.latitude || row.Latitude || '15.0')
          ],
          siteName: row.siteName || row['Site Name'] || 'Unknown Site',
          waterBody: row.waterBody || row['Water Body'] || 'Unknown Water Body'
        },
        collectionDate: new Date(row.collectionDate || row['Collection Date'] || Date.now()),
        depth: parseFloat(row.depth || row.Depth || '10'),
        sampleVolume: parseFloat(row.sampleVolume || row['Sample Volume'] || '1000'),
        filtrationMethod: row.filtrationMethod || row['Filtration Method'] || '0.22μm filter',
        extractionMethod: row.extractionMethod || row['Extraction Method'] || 'DNeasy Kit',
        sequencingPlatform: row.sequencingPlatform || row['Sequencing Platform'] || 'Illumina MiSeq',
        sequencingResults: {
          totalReads: parseInt(row.totalReads || row['Total Reads'] || '100000'),
          qualityFilteredReads: parseInt(row.qualityFilteredReads || row['Quality Filtered Reads'] || '95000'),
          taxonomicAssignments: []
        },
        diversityMetrics: {
          richness: parseFloat(row.richness || row.Richness || '25'),
          shannon: parseFloat(row.shannon || row.Shannon || '2.5'),
          simpson: parseFloat(row.simpson || row.Simpson || '0.8'),
          evenness: parseFloat(row.evenness || row.Evenness || '0.7')
        },
        environmentalFactors: {
          temperature: parseFloat(row.temperature || row.Temperature || '25'),
          salinity: parseFloat(row.salinity || row.Salinity || '35'),
          pH: parseFloat(row.pH || row.ph || '8.0')
        },
        qualityControl: {
          contamination: Boolean(row.contamination || false),
          inhibition: Boolean(row.inhibition || false),
          negativeControl: Boolean(row.negativeControl || true),
          positiveControl: Boolean(row.positiveControl || true)
        },
        analysisDate: new Date(row.analysisDate || row['Analysis Date'] || Date.now()),
        analyst: row.analyst || row.Analyst || 'User Upload'
      }))
      
    case 'otolith':
      return data.map(row => ({
        specimenId: row.specimenId || row['Specimen ID'] || `OTO_${Date.now()}`,
        species: row.species || row.Species || 'Unknown species',
        otolithType: row.otolithType || row['Otolith Type'] || 'sagitta',
        measurements: {
          length: parseFloat(row.length || row.Length || '5'),
          width: parseFloat(row.width || row.Width || '3'),
          weight: parseFloat(row.weight || row.Weight || '0.01'),
          area: parseFloat(row.area || row.Area || '15'),
          perimeter: parseFloat(row.perimeter || row.Perimeter || '18')
        },
        morphometrics: {
          roundness: parseFloat(row.roundness || row.Roundness || '0.75'),
          rectangularity: parseFloat(row.rectangularity || row.Rectangularity || '0.65'),
          ellipticity: parseFloat(row.ellipticity || row.Ellipticity || '0.8'),
          formFactor: parseFloat(row.formFactor || row['Form Factor'] || '0.7')
        },
        ageEstimate: parseInt(row.ageEstimate || row['Age Estimate'] || '2'),
        growthRings: parseInt(row.growthRings || row['Growth Rings'] || '2'),
        captureInfo: {
          location: {
            coordinates: [
              parseFloat(row.longitude || row.Longitude || '75.0'),
              parseFloat(row.latitude || row.Latitude || '15.0')
            ],
            siteName: row.captureLocation || row['Capture Location'] || 'Unknown Location'
          },
          date: new Date(row.captureDate || row['Capture Date'] || Date.now()),
          depth: parseFloat(row.captureDepth || row['Capture Depth'] || '20'),
          fishLength: parseFloat(row.fishLength || row['Fish Length'] || '15'),
          fishWeight: parseFloat(row.fishWeight || row['Fish Weight'] || '100')
        },
        imageAnalysis: {
          imagePath: row.imagePath || row['Image Path'] || '',
          magnification: parseFloat(row.magnification || row.Magnification || '40'),
          resolution: parseFloat(row.resolution || row.Resolution || '1024'),
          imageQuality: row.imageQuality || row['Image Quality'] || 'good'
        },
        analyst: row.analyst || row.Analyst || 'User Upload',
        analysisDate: new Date(row.analysisDate || row['Analysis Date'] || Date.now()),
        notes: row.notes || row.Notes || ''
      }))
      
    default:
      return data
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const dataType = formData.get('dataType') as string
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded' },
        { status: 400 }
      )
    }
    
    if (!dataType) {
      return NextResponse.json(
        { success: false, error: 'Data type not specified' },
        { status: 400 }
      )
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    let parsedData: any[] = []
    
    // Parse file based on type
    if (file.name.endsWith('.csv')) {
      const content = buffer.toString('utf-8')
      parsedData = await parseCSV(content)
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      parsedData = parseExcel(buffer)
    } else if (file.name.endsWith('.json')) {
      const content = buffer.toString('utf-8')
      parsedData = JSON.parse(content)
    } else {
      return NextResponse.json(
        { success: false, error: 'Unsupported file format. Please use CSV, Excel, or JSON files.' },
        { status: 400 }
      )
    }
    
    if (parsedData.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No data found in file' },
        { status: 400 }
      )
    }
    
    // Map data to appropriate schema
    const mappedData = mapDataToSchema(parsedData, dataType)
    
    // Store data in MongoDB based on type
    let savedCount = 0
    let errors: string[] = []
    
    for (const item of mappedData) {
      try {
        let savedItem
        
        switch (dataType) {
          case 'species':
            savedItem = new Species(item)
            await savedItem.save()
            break
          case 'oceanographic':
            savedItem = new OceanographicData(item)
            await savedItem.save()
            break
          case 'edna':
            savedItem = new EdnaAnalysis(item)
            await savedItem.save()
            break
          case 'otolith':
            savedItem = new OtolithAnalysis(item)
            await savedItem.save()
            break
          case 'genetic':
            savedItem = new GeneticSequence(item)
            await savedItem.save()
            break
          default:
            throw new Error(`Unsupported data type: ${dataType}`)
        }
        
        savedCount++
      } catch (error) {
        errors.push(`Row ${savedCount + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        if (errors.length > 10) break // Limit error reporting
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully processed ${file.name}`,
      results: {
        totalRows: parsedData.length,
        savedCount,
        errorCount: errors.length,
        errors: errors.slice(0, 5), // Return first 5 errors
        dataType,
        fileName: file.name,
        fileSize: file.size
      }
    })
    
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process file',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}