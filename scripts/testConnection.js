const { default: connectDB } = require('../lib/mongodb')

async function testConnection() {
  console.log('🔄 Testing MongoDB connection...')
  
  try {
    await connectDB()
    console.log('✅ MongoDB connection successful!')
    console.log('🎉 Database is ready to use')
    process.exit(0)
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

testConnection()