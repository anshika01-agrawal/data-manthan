import connectDB from '@/lib/mongodb'
import { OceanographicData, Species, EdnaAnalysis } from '@/lib/models'
import mongoose from 'mongoose'

// Simulate real-time oceanographic data from different stations
const STATIONS = [
  { id: 'AS_001', name: 'Arabian Sea Station 1', coords: [68.5, 18.2], region: 'Western Arabian Sea' },
  { id: 'AS_002', name: 'Arabian Sea Station 2', coords: [72.8, 15.5], region: 'Central Arabian Sea' },
  { id: 'IO_001', name: 'Indian Ocean Station 1', coords: [75.1, 13.0], region: 'Eastern Arabian Sea' },
  { id: 'IO_002', name: 'Indian Ocean Station 2', coords: [77.6, 8.1], region: 'Tamil Nadu Coast' },
  { id: 'KB_001', name: 'Kerala Backwaters 1', coords: [76.2, 9.9], region: 'Kerala Coast' }
]

function generateRealisticOceanData(station: typeof STATIONS[0]) {
  const now = new Date()
  
  // Base values with realistic variations based on Arabian Sea conditions
  let baseTemp = 27.5
  let baseSalinity = 35.2
  let baseChlorophyll = 1.8
  
  // Seasonal adjustments (simplified)
  const month = now.getMonth()
  if (month >= 5 && month <= 9) { // Monsoon season
    baseTemp -= 2
    baseSalinity -= 0.5
    baseChlorophyll += 1.2
  }
  
  // Random variations to simulate real sensor data
  const temperature = baseTemp + (Math.random() - 0.5) * 3
  const salinity = baseSalinity + (Math.random() - 0.5) * 1.5
  const chlorophyll = Math.max(0.1, baseChlorophyll + (Math.random() - 0.5) * 2)
  const depth = Math.floor(Math.random() * 200) + 5
  const pH = 7.9 + Math.random() * 0.4
  const dissolvedOxygen = 5.0 + Math.random() * 2.5
  const turbidity = Math.random() * 3
  
  return {
    stationId: station.id,
    location: {
      coordinates: station.coords,
      name: station.name,
      region: station.region
    },
    measurementDate: now,
    depth,
    temperature: Math.round(temperature * 10) / 10,
    salinity: Math.round(salinity * 10) / 10,
    pH: Math.round(pH * 100) / 100,
    dissolvedOxygen: Math.round(dissolvedOxygen * 10) / 10,
    chlorophyll: Math.round(chlorophyll * 10) / 10,
    turbidity: Math.round(turbidity * 10) / 10,
    nutrients: {
      nitrate: Math.round(Math.random() * 2 * 10) / 10,
      phosphate: Math.round(Math.random() * 0.5 * 100) / 100,
      silicate: Math.round(Math.random() * 5 * 10) / 10
    },
    currentSpeed: Math.round(Math.random() * 0.8 * 100) / 100,
    currentDirection: Math.floor(Math.random() * 360),
    waveHeight: Math.round(Math.random() * 3 * 10) / 10,
    dataQuality: Math.random() > 0.8 ? 'excellent' : Math.random() > 0.6 ? 'good' : 'fair',
    instrument: 'CTD-Rosette-AutoSampler',
    dataSource: 'CMLRE Real-time Monitoring'
  }
}

async function fetchAndStoreRealTimeData() {
  try {
    console.log('🌊 Starting real-time oceanographic data collection...')
    await connectDB()
    
    // Generate and store oceanographic data for all stations
    const oceanDataBatch = []
    for (const station of STATIONS) {
      const data = generateRealisticOceanData(station)
      oceanDataBatch.push(data)
    }
    
    console.log(`📊 Inserting ${oceanDataBatch.length} oceanographic records...`)
    await OceanographicData.insertMany(oceanDataBatch)
    console.log('✅ Oceanographic data stored successfully!')
    
    // Simulate species sighting data (less frequent)
    if (Math.random() > 0.7) { // 30% chance of new species sighting
      const speciesSightings = [
        {
          scientificName: 'Thunnus albacares',
          commonName: 'Yellowfin Tuna',
          taxonomyId: 'txid8238',
          kingdom: 'Animalia',
          phylum: 'Chordata',
          class: 'Actinopterygii',
          order: 'Perciformes',
          family: 'Scombridae',
          genus: 'Thunnus',
          species: 'albacares',
          habitat: ['pelagic', 'open ocean'],
          geographicDistribution: [{
            coordinates: STATIONS[Math.floor(Math.random() * STATIONS.length)].coords,
            locationName: STATIONS[Math.floor(Math.random() * STATIONS.length)].name,
            depth: Math.floor(Math.random() * 300) + 50
          }],
          conservationStatus: 'NT',
          marineZone: 'pelagic',
          characteristics: {
            length: 180 + Math.random() * 40,
            weight: 150000 + Math.random() * 100000,
            lifespan: 6 + Math.random() * 2,
            diet: ['fish', 'squid', 'crustaceans']
          },
          dataSource: 'CMLRE Field Survey'
        }
      ]
      
      try {
        // Use upsert to avoid duplicates
        for (const species of speciesSightings) {
          await Species.findOneAndUpdate(
            { scientificName: species.scientificName },
            { $push: { geographicDistribution: species.geographicDistribution[0] } },
            { upsert: true, new: true }
          )
        }
        console.log('🐟 Species sighting data updated!')
      } catch (error) {
        console.log('⚠️  Species data already exists or error occurred')
      }
    }
    
    // Get latest statistics
    const totalRecords = await OceanographicData.countDocuments()
    const latestData = await OceanographicData.findOne().sort({ measurementDate: -1 })
    
    console.log('📈 Real-time Data Summary:')
    console.log(`  Total Records: ${totalRecords}`)
    console.log(`  Latest Temperature: ${latestData?.temperature}°C`)
    console.log(`  Latest Salinity: ${latestData?.salinity} PSU`)
    console.log(`  Latest Station: ${latestData?.stationId}`)
    console.log(`  Data Quality: ${latestData?.dataQuality}`)
    
  } catch (error) {
    console.error('❌ Error in real-time data collection:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
  }
}

// Function to run continuously (for real-time monitoring)
async function startRealTimeMonitoring(intervalMinutes: number = 5) {
  console.log(`🕐 Starting continuous monitoring (every ${intervalMinutes} minutes)...`)
  console.log('Press Ctrl+C to stop monitoring')
  
  // Initial fetch
  await fetchAndStoreRealTimeData()
  
  // Set up interval for continuous monitoring
  const interval = setInterval(async () => {
    console.log('\n🔔 Real-time data update triggered...')
    await fetchAndStoreRealTimeData()
  }, intervalMinutes * 60 * 1000)
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping real-time monitoring...')
    clearInterval(interval)
    process.exit(0)
  })
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0] || 'once'
  
  if (command === 'monitor') {
    const interval = parseInt(args[1]) || 5
    startRealTimeMonitoring(interval)
  } else {
    fetchAndStoreRealTimeData()
      .then(() => {
        console.log('✅ Single data fetch completed')
        process.exit(0)
      })
      .catch((error) => {
        console.error('❌ Data fetch failed:', error)
        process.exit(1)
      })
  }
}