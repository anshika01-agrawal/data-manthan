import connectDB from '@/lib/mongodb'
import { 
  Species, 
  GeneticSequence, 
  OceanographicData, 
  EdnaAnalysis, 
  OtolithAnalysis, 
  ResearchProject 
} from '@/lib/models'
import mongoose from 'mongoose'

async function resetDatabase(confirm: boolean = false) {
  try {
    if (!confirm) {
      console.log('⚠️  This will delete ALL data from the database!')
      console.log('To confirm, run: pnpm db:reset --confirm')
      return
    }
    
    console.log('🗑️  Resetting database...')
    await connectDB()
    
    console.log('🧹 Clearing Species collection...')
    await Species.deleteMany({})
    
    console.log('🧹 Clearing GeneticSequence collection...')
    await GeneticSequence.deleteMany({})
    
    console.log('🧹 Clearing OceanographicData collection...')
    await OceanographicData.deleteMany({})
    
    console.log('🧹 Clearing EdnaAnalysis collection...')
    await EdnaAnalysis.deleteMany({})
    
    console.log('🧹 Clearing OtolithAnalysis collection...')
    await OtolithAnalysis.deleteMany({})
    
    console.log('🧹 Clearing ResearchProject collection...')
    await ResearchProject.deleteMany({})
    
    console.log('✅ Database reset completed successfully!')
    
    // Show final counts
    const counts = {
      species: await Species.countDocuments(),
      sequences: await GeneticSequence.countDocuments(),
      oceanographic: await OceanographicData.countDocuments(),
      edna: await EdnaAnalysis.countDocuments(),
      otolith: await OtolithAnalysis.countDocuments(),
      projects: await ResearchProject.countDocuments()
    }
    
    console.log('📊 Final collection counts:')
    console.log(`  Species: ${counts.species}`)
    console.log(`  Genetic Sequences: ${counts.sequences}`)
    console.log(`  Oceanographic Data: ${counts.oceanographic}`)
    console.log(`  eDNA Analyses: ${counts.edna}`)
    console.log(`  Otolith Analyses: ${counts.otolith}`)
    console.log(`  Research Projects: ${counts.projects}`)
    
  } catch (error) {
    console.error('❌ Error resetting database:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
  }
}

if (require.main === module) {
  const args = process.argv.slice(2)
  const confirm = args.includes('--confirm')
  
  resetDatabase(confirm)
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Database reset failed:', error)
      process.exit(1)
    })
}