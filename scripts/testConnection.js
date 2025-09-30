const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/?retryWrites=true&w=majority&appName=data-manthan';

console.log('🌊 Data Manthan - MongoDB Connection Test');
console.log('==========================================');
console.log('🔌 Testing connection to MongoDB Atlas...');

async function testConnection() {
  try {
    // Connect with proper options
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    });
    
    console.log('✅ SUCCESS! Connected to MongoDB Atlas');
    console.log('� Database:', mongoose.connection.name || 'default');
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('⚡ Ready State:', mongoose.connection.readyState);
    
    // Test basic operations
    console.log('🧪 Testing basic database operations...');
    
    const db = mongoose.connection.db;
    
    // List existing collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Existing collections:', collections.map(c => c.name).join(', ') || 'None');
    
    // Test create collection
    const testCollection = db.collection('connection_test');
    await testCollection.insertOne({
      message: 'MongoDB connection successful!',
      timestamp: new Date(),
      source: 'Data Manthan Connection Test'
    });
    console.log('✅ Test document inserted successfully');
    
    // Clean up
    await testCollection.deleteOne({ message: 'MongoDB connection successful!' });
    console.log('🧹 Test document cleaned up');
    
    console.log('');
    console.log('🎉 DATABASE IS READY!');
    console.log('Next steps:');
    console.log('  1. Run: pnpm run db:init     (Initialize schemas)');
    console.log('  2. Run: pnpm run db:seed     (Add sample data)');
    console.log('  3. Run: pnpm dev             (Start development server)');
    
    process.exit(0)
  } catch (error) {
    console.error('❌ CONNECTION FAILED:', error.message);
    
    if (error.message.includes('IP')) {
      console.log('');
      console.log('💡 SOLUTION: Add your IP to MongoDB Atlas whitelist');
      console.log('   Current IP might be: 20.192.21.55');
      console.log('   Or add 0.0.0.0/0 for development (allows all IPs)');
    } else if (error.message.includes('authentication')) {
      console.log('');
      console.log('💡 SOLUTION: Check database credentials');
      console.log('   Username: 23btc108_db_user');
      console.log('   Password: Check if correct in .env.local');
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.log('');
      console.log('💡 SOLUTION: SSL/TLS issue detected');
      console.log('   This might be a network or certificate issue');
    }
    
    console.log('');
    console.log('🔧 For help, run: pnpm run db:setup');
    process.exit(1)
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

testConnection()