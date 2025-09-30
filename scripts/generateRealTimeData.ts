import connectDB from '@/lib/mongodb'
import { OceanographicData } from '@/lib/models'

// Simulate real-time oceanographic sensor data
const STATIONS = [
  { id: 'AS_001', coords: [68.5, 18.2], name: 'Western Arabian Sea', region: 'Western Arabian Sea' },
  { id: 'AS_002', coords: [72.8, 15.5], name: 'Central Arabian Sea', region: 'Central Arabian Sea' },
  { id: 'AS_003', coords: [75.1, 13.0], name: 'Eastern Arabian Sea', region: 'Eastern Arabian Sea' },
  { id: 'KC_001', coords: [76.2, 9.9], name: 'Kerala Coast', region: 'Kerala Coast' },
  { id: 'TN_001', coords: [77.0, 8.5], name: 'Tamil Nadu Coast', region: 'Tamil Nadu Coast' },
]

function generateRealisticOceanData(station: any) {
  const now = new Date()
  const hour = now.getHours()
  const season = Math.floor((now.getMonth() + 1) / 4) // 0-2 representing seasons
  
  // Base values that vary by location and season
  const baseTemp = 26 + Math.sin(season * Math.PI / 2) * 3 + Math.random() * 2
  const baseSalinity = 35 + Math.sin(season * Math.PI / 2) * 0.5 + Math.random() * 0.5
  const baseChlorophyll = 1 + Math.sin(season * Math.PI / 2) * 2 + Math.random() * 1.5
  
  // Diurnal variations
  const tempVariation = Math.sin((hour - 14) * Math.PI / 12) * 1.5
  const chlorophyllVariation = Math.sin((hour - 10) * Math.PI / 12) * 0.5
  
  return {
    stationId: station.id,
    location: {
      coordinates: station.coords,
      name: station.name,
      region: station.region
    },
    measurementDate: now,
    depth: Math.floor(Math.random() * 100) + 5,
    temperature: Number((baseTemp + tempVariation).toFixed(2)),
    salinity: Number((baseSalinity + Math.random() * 0.3 - 0.15).toFixed(2)),
    pH: Number((8.0 + Math.random() * 0.4 - 0.2).toFixed(2)),
    dissolvedOxygen: Number((6.0 + Math.random() * 2).toFixed(2)),
    chlorophyll: Number((baseChlorophyll + chlorophyllVariation).toFixed(2)),
    turbidity: Number((0.5 + Math.random() * 1.5).toFixed(2)),
    nutrients: {
      nitrate: Number((0.3 + Math.random() * 0.8).toFixed(2)),
      phosphate: Number((0.1 + Math.random() * 0.2).toFixed(2)),
      silicate: Number((2.0 + Math.random() * 2.0).toFixed(2))
    },
    currentSpeed: Number((0.1 + Math.random() * 0.4).toFixed(2)),
    currentDirection: Math.floor(Math.random() * 360),
    waveHeight: Number((0.5 + Math.random() * 2.0).toFixed(2)),
    dataQuality: Math.random() > 0.1 ? 'excellent' : 'good',
    instrument: 'CTD-Rosette-Automated',
    dataSource: 'CMLRE Real-time Monitoring Network'
  }
}

export async function generateRealTimeData() {
  try {
    console.log('🌊 Generating real-time oceanographic data...')
    await connectDB()
    
    const dataPoints = STATIONS.map(station => generateRealisticOceanData(station))
    
    for (const dataPoint of dataPoints) {
      const oceanData = new OceanographicData(dataPoint)
      await oceanData.save()
      console.log(`✅ Saved data for station ${dataPoint.stationId}`)
    }
    
    console.log(`🎯 Generated ${dataPoints.length} real-time data points`)
    return dataPoints
    
  } catch (error) {
    console.error('❌ Error generating real-time data:', error)
    throw error
  }
}

// Auto-generate data every 15 minutes if running as main module
if (require.main === module) {
  console.log('🚀 Starting real-time data generation...')
  
  // Generate initial data
  generateRealTimeData()
    .then(() => {
      console.log('✅ Initial data generated')
      
      // Set up interval for continuous data generation
      setInterval(async () => {
        try {
          await generateRealTimeData()
          console.log(`⏰ Real-time data updated at ${new Date().toISOString()}`)
        } catch (error) {
          console.error('Error in scheduled data generation:', error)
        }
      }, 15 * 60 * 1000) // Every 15 minutes
      
      console.log('🔄 Real-time data generation scheduled every 15 minutes')
    })
    .catch(error => {
      console.error('Failed to start real-time data generation:', error)
      process.exit(1)
    })
}