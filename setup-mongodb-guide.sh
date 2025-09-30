#!/bin/bash

echo "🔐 MongoDB Atlas Setup Instructions for Data Manthan"
echo "=================================================="
echo ""

echo "📍 Your Current IP Addresses:"
echo "  IPv4: 20.192.21.55"
echo "  Local: 10.0.3.4"
echo ""

echo "🚀 STEP-BY-STEP INSTRUCTIONS:"
echo "=============================="
echo ""
echo "1. Open MongoDB Atlas in your browser:"
echo "   → https://cloud.mongodb.com/"
echo ""
echo "2. Login with your account"
echo ""
echo "3. Go to your 'data-manthan' cluster"
echo ""
echo "4. Click 'Network Access' in the left sidebar"
echo ""
echo "5. Click 'ADD IP ADDRESS' button"
echo ""
echo "6. Choose one of these options:"
echo ""
echo "   Option A - Add Current IP (Recommended):"
echo "   ----------------------------------------"
echo "   • Enter: 20.192.21.55"
echo "   • Comment: 'Development Environment'"
echo ""
echo "   Option B - Allow All IPs (Easy but less secure):"
echo "   ------------------------------------------------"
echo "   • Enter: 0.0.0.0/0"
echo "   • Comment: 'Development - Allow All'"
echo "   • ⚠️  Only for development, not production!"
echo ""
echo "7. Click 'Confirm' and wait 2-3 minutes"
echo ""

echo "🧪 TESTING CONNECTION:"
echo "====================="
echo ""
echo "After adding IP, run these commands:"
echo ""
echo "# Test connection:"
echo "pnpm run db:test"
echo ""
echo "# If successful, initialize database:"
echo "pnpm run db:init"
echo ""
echo "# Add sample data:"
echo "pnpm run db:seed"
echo ""
echo "# Start development server:"
echo "pnpm dev"
echo ""

echo "📱 CURRENT APPLICATION STATUS:"
echo "============================="
echo ""
echo "✅ Development server is running on: http://localhost:3001"
echo "✅ Chart colors have been updated (ocean analysis graphs)"
echo "✅ Mobile responsiveness improved"
echo "⏳ Database connection pending IP whitelist"
echo ""

echo "🔄 AUTO-TESTING CONNECTION:"
echo "============================"

# Function to test connection
test_connection() {
    cd /workspaces/data-manthan
    pnpm run db:test > /dev/null 2>&1
    return $?
}

echo "Testing connection every 30 seconds..."
echo "Press Ctrl+C to stop"
echo ""

ATTEMPT=1
while [ $ATTEMPT -le 10 ]; do
    echo "🔄 Attempt $ATTEMPT: $(date +%H:%M:%S)"
    
    if test_connection; then
        echo ""
        echo "🎉 SUCCESS! Database connection established!"
        echo ""
        echo "✅ Ready to run:"
        echo "   1. pnpm run db:init"
        echo "   2. pnpm run db:seed"
        echo ""
        echo "🌊 Your Data Manthan platform is ready!"
        break
    else
        echo "   ❌ Still waiting for IP whitelist..."
    fi
    
    if [ $ATTEMPT -lt 10 ]; then
        echo "   ⏳ Next test in 30 seconds..."
        sleep 30
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
done

if [ $ATTEMPT -gt 10 ]; then
    echo ""
    echo "⚠️  After 10 attempts, please verify:"
    echo "• IP whitelist was added correctly in MongoDB Atlas"
    echo "• Database credentials are correct"
    echo "• Network connectivity is working"
    echo ""
    echo "📞 Need help? The application is still running with mock data"
    echo "   Visit: http://localhost:3001"
fi