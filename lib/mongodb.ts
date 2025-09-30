import mongoose from 'mongoose'

// Multiple connection options for flexibility
const MONGODB_URI = process.env.MONGODB_URI || 
  process.env.DATABASE_URL ||
  'mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/data-manthan?retryWrites=true&w=majority&appName=data-manthan'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

interface GlobalWithMongoose {
  mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

declare const global: GlobalWithMongoose

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      // Add retry logic
      retryWrites: true,
      retryReads: true,
    }

    console.log('🔌 Connecting to MongoDB...')
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully!')
      console.log('📊 Database:', mongoose.connection.name)
      console.log('🌐 Host:', mongoose.connection.host)
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ MongoDB connection failed:', e)
    throw e
  }

  return cached.conn
}

export default connectDB