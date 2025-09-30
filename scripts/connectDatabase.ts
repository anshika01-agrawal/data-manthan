import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...')
    
    const connection = await connectDB()
    
    if (connection) {
      console.log('✅ MongoDB connected successfully!')
      console.log(`📊 Connected to: ${connection.connection.name}`)
      console.log(`🌐 Host: ${connection.connection.host}:${connection.connection.port}`)
      console.log(`📈 Ready State: ${connection.connection.readyState}`)
      
      // Test basic operations
      if (connection.connection.db) {
        const testCollection = connection.connection.db.collection('test')
        await testCollection.insertOne({ test: 'connection', timestamp: new Date() })
        console.log('✅ Test write operation successful!')
        
        await testCollection.deleteOne({ test: 'connection' })
        console.log('✅ Test delete operation successful!')
      }
      
    } else {
      console.log('❌ Failed to establish MongoDB connection')
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    console.log('\n🔧 Troubleshooting tips:')
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas')
    console.log('2. Verify the connection string is correct')
    console.log('3. Check if the username and password are correct')
    console.log('4. Ensure the database name exists')
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
    process.exit(0)
  }
}

if (require.main === module) {
  testConnection()
}