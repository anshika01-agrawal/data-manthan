#!/bin/bash

echo "🔐 Data Manthan - MongoDB Atlas IP Whitelisting Guide"
echo "=================================================="
echo ""

# Get current IP address
echo "🌐 Getting your current IP addresses..."
CURRENT_IP_V4=$(curl -s https://ipv4.icanhazip.com || echo "Unable to get IPv4")
CURRENT_IP_V6=$(curl -s https://ipv6.icanhazip.com || echo "Unable to get IPv6")

echo "📍 Your current IPv4 address: $CURRENT_IP_V4"
echo "📍 Your current IPv6 address: $CURRENT_IP_V6"
echo ""

echo "🚀 STEPS TO WHITELIST YOUR IP IN MONGODB ATLAS:"
echo "=============================================="
echo ""
echo "1. Go to MongoDB Atlas: https://cloud.mongodb.com/"
echo "2. Login to your account"
echo "3. Navigate to your 'data-manthan' cluster"
echo "4. Click on 'Network Access' in the left sidebar"
echo "5. Click 'ADD IP ADDRESS' button"
echo "6. You have these options:"
echo ""
echo "   Option A - Add Current IP:"
echo "   -------------------------"
echo "   • Click 'ADD CURRENT IP ADDRESS'"
echo "   • Or manually enter: $CURRENT_IP_V4"
echo ""
echo "   Option B - Allow All IPs (Development Only):"
echo "   -------------------------------------------"
echo "   • Enter: 0.0.0.0/0"
echo "   • ⚠️  WARNING: This allows access from anywhere!"
echo "   • Only use for development, never for production!"
echo ""
echo "   Option C - Add Specific IP Range:"
echo "   --------------------------------"
echo "   • For Gitpod/Codespaces: Check your platform's IP ranges"
echo ""
echo "7. Add a comment like 'Development Environment'"
echo "8. Click 'Confirm'"
echo "9. Wait 1-2 minutes for changes to take effect"
echo ""

echo "🧪 TESTING DATABASE CONNECTION:"
echo "=============================="
echo ""
echo "After whitelisting, run these commands:"
echo ""
echo "# Test connection:"
echo "pnpm run db:test"
echo ""
echo "# Initialize database and create schemas:"
echo "pnpm run db:init"
echo ""
echo "# Seed with sample data:"
echo "pnpm run db:seed"
echo ""

echo "🐛 TROUBLESHOOTING:"
echo "=================="
echo ""
echo "If connection still fails:"
echo "• Wait 2-3 minutes after adding IP"
echo "• Check if your IP changed (run this script again)"
echo "• Try adding 0.0.0.0/0 temporarily for testing"
echo "• Verify database credentials are correct"
echo ""

echo "🔄 AUTO-RETRY CONNECTION TEST:"
echo "============================="
echo ""

# Function to test connection
test_connection() {
    node -e "
    const mongoose = require('mongoose');
    const uri = 'mongodb+srv://23btc108_db_user:asdfghjkl123A@data-manthan.mhkalju.mongodb.net/?retryWrites=true&w=majority&appName=data-manthan';
    mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 }).then(() => {
        console.log('✅ DATABASE CONNECTION SUCCESSFUL!');
        console.log('Database:', mongoose.connection.name);
        mongoose.disconnect();
        process.exit(0);
    }).catch(err => {
        console.log('❌ Still waiting for IP whitelist...');
        process.exit(1);
    });
    " 2>/dev/null
}

echo "Testing connection every 30 seconds..."
echo "Press Ctrl+C to stop testing"
echo ""

ATTEMPT=1
while true; do
    echo "🔄 Attempt $ATTEMPT: $(date)"
    if test_connection; then
        echo ""
        echo "🎉 SUCCESS! Your database is now accessible!"
        echo ""
        echo "Next steps:"
        echo "1. Run: pnpm run db:init"
        echo "2. Run: pnpm run db:seed" 
        echo "3. Run: pnpm dev"
        echo ""
        break
    fi
    
    echo "⏳ Waiting 30 seconds before retry..."
    sleep 30
    ATTEMPT=$((ATTEMPT + 1))
    
    if [ $ATTEMPT -gt 20 ]; then
        echo ""
        echo "⚠️  After 20 attempts, please verify:"
        echo "• IP whitelist was added correctly"
        echo "• Database credentials are correct"
        echo "• Network connectivity is working"
        break
    fi
done