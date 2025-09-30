import connectDB from '../lib/mongodb'
import mongoose from 'mongoose'
import { 
  Species, 
  GeneticSequence, 
  OceanographicData, 
  EdnaAnalysis, 
  OtolithAnalysis, 
  ResearchProject 
} from '../lib/models'

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing Data Manthan Database...')
    console.log('=====================================')
    
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB Atlas...')
    await connectDB()
    
    console.log('✅ Connected to MongoDB successfully!')
    console.log(`📊 Database: ${mongoose.connection.name}`)
    console.log(`🌐 Host: ${mongoose.connection.host}`)
    
    // List existing collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`📁 Existing collections: ${collections.map(c => c.name).join(', ') || 'None'}`)
    
    // Create collections by ensuring indexes (this creates the collections)
    console.log('🏗️  Creating collections and indexes...')
    
    // Create Species collection
    await Species.createIndexes()
    console.log('✅ Species collection and indexes created')
    
    // Create GeneticSequence collection
    await GeneticSequence.createIndexes()
    console.log('✅ GeneticSequence collection and indexes created')
    
    // Create OceanographicData collection
    await OceanographicData.createIndexes()
    console.log('✅ OceanographicData collection and indexes created')
    
    // Create EdnaAnalysis collection
    await EdnaAnalysis.createIndexes()
    console.log('✅ EdnaAnalysis collection and indexes created')
    
    // Create OtolithAnalysis collection
    await OtolithAnalysis.createIndexes()
    console.log('✅ OtolithAnalysis collection and indexes created')
    
    // Create ResearchProject collection
    await ResearchProject.createIndexes()
    console.log('✅ ResearchProject collection and indexes created')
    
    // Insert sample data to verify collections work
    console.log('🌱 Inserting sample data...')
    
    // Sample species data
    const sampleSpecies = new Species({
      scientificName: 'Test Species Initial',
      commonName: 'Test Fish',
      taxonomyId: 'test123',
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Perciformes',
      family: 'Testidae',
      genus: 'Testus',
      species: 'initialus',
      habitat: ['test'],
      geographicDistribution: [{
        coordinates: [75.0, 15.0],
        locationName: 'Test Location',
        depth: 10
      }],
      conservationStatus: 'LC',
      marineZone: 'pelagic',
      characteristics: {
        length: 10,
        weight: 100,
        lifespan: 2,
        diet: ['test food']
      },
      dataSource: 'Database Initialization Test'
    })
    
    await sampleSpecies.save()
    console.log('✅ Sample species data inserted')
    
    // Sample oceanographic data
    const sampleOceanData = new OceanographicData({
      stationId: 'TEST_001',
      location: {
        coordinates: [75.0, 15.0],
        name: 'Test Station',
        region: 'Test Region'
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
      instrument: 'Test CTD',
      dataSource: 'Database Initialization Test'
    })
    
    await sampleOceanData.save()
    console.log('✅ Sample oceanographic data inserted')
    
    // Verify collections were created
    const newCollections = await mongoose.connection.db.listCollections().toArray()
    console.log('📁 Collections after initialization:')
    newCollections.forEach(collection => {
      console.log(`   - ${collection.name}`)
    })
    
    // Get collection stats
    console.log('📊 Collection Statistics:')
    for (const collection of newCollections) {
      try {
        const stats = await mongoose.connection.db.collection(collection.name).stats()
        console.log(`   ${collection.name}: ${stats.count} documents, ${Math.round(stats.size / 1024)}KB`)
      } catch (error) {
        console.log(`   ${collection.name}: Ready for data`)
      }
    }
    
    console.log('🎉 Database initialization completed successfully!')
    console.log('🌊 Data Manthan database is ready for marine research data!')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('✅ Database initialization completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Database initialization failed:', error)
      process.exit(1)
    })
}

export { initializeDatabase }