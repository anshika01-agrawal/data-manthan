import cron from 'node-cron'
import { collectRealTimeData } from './realTimeDataCollector'

console.log('🚀 Starting Data Manthan Real-time Data Collection Service...')

// Schedule real-time data collection every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log(`📅 [${new Date().toISOString()}] Running scheduled data collection...`)
  try {
    await collectRealTimeData()
  } catch (error) {
    console.error('Scheduled data collection failed:', error)
  }
})

// Schedule comprehensive data sync every hour  
cron.schedule('0 * * * *', async () => {
  console.log(`🔄 [${new Date().toISOString()}] Running hourly comprehensive sync...`)
  try {
    // Run multiple data collection cycles
    for (let i = 0; i < 3; i++) {
      await collectRealTimeData()
      await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds between collections
    }
    console.log('✅ Hourly sync completed')
  } catch (error) {
    console.error('Hourly sync failed:', error)
  }
})

console.log('✅ Data collection service is running!')
console.log('📊 Real-time data will be collected every 5 minutes')
console.log('🔄 Comprehensive sync will run every hour')
console.log('Press Ctrl+C to stop the service')

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down data collection service...')
  process.exit(0)
})

// Run initial collection
collectRealTimeData().catch(console.error)