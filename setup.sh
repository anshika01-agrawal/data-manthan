#!/bin/bash
echo "🚀 Data Manthan Setup Script"
echo "=========================="

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check MongoDB connection
echo "🔌 Testing MongoDB connection..."
node -e "
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb+srv://23btc108_db_user:z3YYxuHVvGWimiFJ@data-manthan.mhkalju.mongodb.net/?retryWrites=true&w=majority&appName=data-manthan';
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 }).then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  mongoose.disconnect();
  process.exit(0);
}).catch(err => {
  console.warn('⚠️  MongoDB Connection Failed - Using mock data mode');
  console.warn('Please whitelist your IP in MongoDB Atlas to enable database features');
  process.exit(1);
});
" && echo "🎯 Database connected - running seed script..." && npx tsx scripts/seedDatabase.ts || echo "📊 Using mock data mode"

# Build the application
echo "🏗️  Building application..."
pnpm build

echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  pnpm dev          - Start development server"
echo "  pnpm build        - Build for production"  
echo "  pnpm start        - Start production server"
echo "  pnpm seed         - Seed database (requires MongoDB connection)"
echo "  pnpm test-db      - Test database connection"
echo "  pnpm fetch-data   - Fetch real-time oceanographic data"
echo ""
echo "🌊 Access your marine research platform at http://localhost:3000"