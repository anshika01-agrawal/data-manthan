const mongoose = require('mongoose');

// Connection URIs for different setups
const connections = [
  // Primary MongoDB Atlas connection
  'mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/data-manthan?retryWrites=true&w=majority&appName=data-manthan',
  
  // Alternative connection without specific database
  'mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/?retryWrites=true&w=majority&appName=data-manthan',
  
  // Fallback with different options
  'mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/test?retryWrites=true&w=majority&appName=data-manthan'
];

console.log('🌊 Data Manthan - Advanced MongoDB Connection Test');
console.log('=================================================');

async function tryConnection(uri, index) {
  console.log(`\n🔄 Attempt ${index + 1}: Testing connection...`);
  console.log(`   URI: ${uri.replace(/:[^:@]+@/, ':****@')}`);
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 30000,
      family: 4, // Force IPv4
      bufferCommands: false,
      maxPoolSize: 10,
      retryWrites: true,
    });
    
    console.log('✅ CONNECTION SUCCESSFUL!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    console.log('⚡ Ready State:', mongoose.connection.readyState);
    
    // Test database operations
    console.log('\n🧪 Testing database operations...');
    
    const db = mongoose.connection.db;
    
    // Get database stats
    const stats = await db.stats();
    console.log('📈 Database Stats:');
    console.log(`   Collections: ${stats.collections || 0}`);
    console.log(`   Data Size: ${Math.round((stats.dataSize || 0) / 1024)}KB`);
    console.log(`   Storage Size: ${Math.round((stats.storageSize || 0) / 1024)}KB`);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name).join(', ') || 'None');
    
    // Test creating a collection and document
    const testCollection = db.collection('data_manthan_test');
    const result = await testCollection.insertOne({
      message: 'Data Manthan connection test successful',
      timestamp: new Date(),
      version: '1.0.0',
      github_source: 'AnuragTiwari1508/data-manthan'
    });
    
    console.log('✅ Test document inserted with ID:', result.insertedId);
    
    // Create indexes for main collections
    console.log('\n🏗️  Setting up collection indexes...');
    
    try {
      await db.collection('species').createIndex({ scientificName: 1 });
      await db.collection('oceanographic_data').createIndex({ measurementDate: -1 });
      await db.collection('edna_analysis').createIndex({ collectionDate: -1 });
      console.log('✅ Indexes created successfully');
    } catch (indexError) {
      console.log('ℹ️  Indexes already exist or will be created on first data insert');
    }
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Test document cleaned up');
    
    console.log('\n🎉 DATABASE IS FULLY OPERATIONAL!');
    console.log('\n📋 Next steps:');
    console.log('   1. pnpm run db:seed     (Add sample marine data)');
    console.log('   2. pnpm dev             (Start development server)');
    console.log('   3. Visit: http://localhost:3000');
    
    return true;
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return false;
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
}

async function testAllConnections() {
  console.log('🔍 Testing multiple connection configurations...\n');
  
  for (let i = 0; i < connections.length; i++) {
    const success = await tryConnection(connections[i], i);
    
    if (success) {
      console.log('\n✅ SUCCESS! Using connection configuration', i + 1);
      process.exit(0);
    }
    
    if (i < connections.length - 1) {
      console.log('\n⏳ Trying next configuration...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n❌ All connection attempts failed');
  console.log('\n🔧 TROUBLESHOOTING STEPS:');
  console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
  console.log('2. Verify database credentials are correct');
  console.log('3. Ensure network connectivity to MongoDB servers');
  console.log('4. Try adding 0.0.0.0/0 to IP whitelist (development only)');
  
  console.log('\n📱 The application will continue with mock data');
  console.log('   Run: pnpm dev');
  
  process.exit(1);
}

testAllConnections();