const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/?retryWrites=true&w=majority&appName=data-manthan';

console.log('🔌 Testing MongoDB connection with native driver...');
console.log('Current IP:', '20.192.21.55');
console.log('URI:', uri.replace(/:[^:@]+@/, ':****@'));

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB Atlas!');
    
    const db = client.db();
    console.log('📊 Database name:', db.databaseName);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    // Test creating a collection
    const testCollection = db.collection('connection_test');
    await testCollection.insertOne({ 
      test: 'connection successful', 
      timestamp: new Date(),
      ip: '20.192.21.55'
    });
    console.log('✅ Test document inserted successfully!');
    
    // Clean up test document
    await testCollection.deleteOne({ test: 'connection successful' });
    console.log('🧹 Test document cleaned up');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.message.includes('IP')) {
      console.log('💡 Please add IP 20.192.21.55 to your MongoDB Atlas whitelist');
      console.log('   Or add 0.0.0.0/0 to allow all IPs (development only)');
    }
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

testConnection();