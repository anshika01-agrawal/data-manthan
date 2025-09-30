import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'
import { 
  Species, 
  GeneticSequence, 
  OceanographicData, 
  EdnaAnalysis, 
  OtolithAnalysis, 
  ResearchProject 
} from '@/lib/models'

// Auto-initialize database when connection is available
export async function autoInitializeDatabase() {
  try {
    console.log('🔄 Auto-initializing database...')
    await connectDB()
    
    console.log('✅ Connected to MongoDB successfully!')
    
    // Check if collections exist
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map(c => c.name)
    
    console.log('📁 Existing collections:', collectionNames.length > 0 ? collectionNames.join(', ') : 'None')
    
    // Create indexes for all models (this creates collections if they don't exist)
    const models = [
      { name: 'Species', model: Species },
      { name: 'GeneticSequence', model: GeneticSequence },
      { name: 'OceanographicData', model: OceanographicData },
      { name: 'EdnaAnalysis', model: EdnaAnalysis },
      { name: 'OtolithAnalysis', model: OtolithAnalysis },
      { name: 'ResearchProject', model: ResearchProject }
    ]
    
    for (const { name, model } of models) {
      try {
        await model.createIndexes()
        console.log(`✅ ${name} collection ready`)
      } catch (error) {
        console.log(`⚠️  ${name} collection warning:`, error.message)
      }
    }
    
    // Insert sample data if collections are empty
    const speciesCount = await Species.countDocuments()
    if (speciesCount === 0) {
      console.log('🌱 Adding initial sample data...')
      
      // Add sample species
      const sampleSpecies = new Species({
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
          coordinates: [68.5, 18.2],
          locationName: 'Arabian Sea',
          depth: 250
        }],
        conservationStatus: 'NT',
        marineZone: 'pelagic',
        characteristics: {
          length: 200,
          weight: 200000,
          lifespan: 7,
          diet: ['fish', 'squid', 'crustaceans']
        },
        dataSource: 'Auto-initialization'
      })
      
      await sampleSpecies.save()
      
      // Add sample oceanographic data
      const sampleOceanData = new OceanographicData({
        stationId: 'AUTO_001',
        location: {
          coordinates: [75.0, 15.0],
          name: 'Arabian Sea Auto Station',
          region: 'Arabian Sea'
        },
        measurementDate: new Date(),
        depth: 10,
        temperature: 28.5,
        salinity: 35.2,
        pH: 8.1,
        dissolvedOxygen: 6.2,
        chlorophyll: 2.1,
        turbidity: 0.8,
        nutrients: {
          nitrate: 0.5,
          phosphate: 0.12,
          silicate: 2.3
        },
        currentSpeed: 0.25,
        currentDirection: 245,
        waveHeight: 1.2,
        dataQuality: 'excellent',
        instrument: 'Auto-generated CTD',
        dataSource: 'Auto-initialization'
      })
      
      await sampleOceanData.save()
      console.log('✅ Sample data added successfully')
    }
    
    // Get final stats
    const finalStats = {
      species: await Species.countDocuments(),
      oceanographic: await OceanographicData.countDocuments(),
      edna: await EdnaAnalysis.countDocuments(),
      otolith: await OtolithAnalysis.countDocuments(),
      genetic: await GeneticSequence.countDocuments()
    }
    
    console.log('📊 Database Statistics:')
    Object.entries(finalStats).forEach(([key, count]) => {
      console.log(`   ${key}: ${count} documents`)
    })
    
    console.log('🎉 Database auto-initialization completed!')
    return true
    
  } catch (error) {
    console.log('⚠️  Database auto-initialization failed:', error.message)
    console.log('📱 Application will continue with mock data')
    return false
  }
}

// Run auto-initialization
if (require.main === module) {
  autoInitializeDatabase()
    .then((success) => {
      if (success) {
        console.log('✅ Ready to use database')
      } else {
        console.log('📱 Using mock data mode')
      }
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Auto-initialization error:', error)
      process.exit(1)
    })
}