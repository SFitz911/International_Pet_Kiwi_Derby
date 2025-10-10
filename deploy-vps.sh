#!/bin/bash

# 🥝 International Pet Kiwi Derby - Quick VPS Setup Script
# Run this on your VPS after uploading the project

echo "═══════════════════════════════════════════════════════"
echo "🥝 Kiwi Derby - VPS Setup Script"
echo "═══════════════════════════════════════════════════════"
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    SUDO=""
else
    SUDO="sudo"
fi

# Update system
echo "📦 Updating system packages..."
$SUDO apt update && $SUDO apt upgrade -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📥 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | $SUDO -E bash -
    $SUDO apt install -y nodejs
else
    echo "✅ Node.js already installed: $(node --version)"
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "📥 Installing PM2..."
    $SUDO npm install -g pm2
else
    echo "✅ PM2 already installed"
fi

# Navigate to project directory
PROJECT_DIR="/var/www/International_Pet_Kiwi_Derby"
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Project directory not found at $PROJECT_DIR"
    echo "Please upload your project first!"
    exit 1
fi

cd $PROJECT_DIR

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << 'EOF'
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=2d4f2d6f9b45c4d9b7f8c3e1a6b5d4e3
SEPOLIA_PRIVATE_KEY=4e5987e176f7aa33984adeed55efa3b7473d6805d2e80735dc8412e7d6c1b30f
DEMO_WALLET_PRIVATE_KEY=336bbc42d68717bba528aefc993f314d97f054f818dd1a450008b7f234692345
EOF
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

# Build the app
echo "🔨 Building production app..."
npm run build

# Stop existing PM2 process if running
pm2 delete kiwi-derby 2>/dev/null || true

# Start with PM2
echo "🚀 Starting app with PM2..."
pm2 start npm --name "kiwi-derby" -- start
pm2 save
pm2 startup | tail -n 1 | $SUDO bash

# Configure firewall
echo "🔥 Configuring firewall..."
$SUDO ufw allow 3000
$SUDO ufw --force enable

# Get IP address
IP=$(hostname -I | awk '{print $1}')

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✅ DEPLOYMENT COMPLETE!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "🌐 Your Kiwi Derby is now live at:"
echo "   http://$IP:3000"
echo ""
echo "📱 Share this URL with your friends!"
echo ""
echo "🔧 Useful commands:"
echo "   pm2 status          - Check app status"
echo "   pm2 logs kiwi-derby - View logs"
echo "   pm2 restart kiwi-derby - Restart app"
echo ""
echo "═══════════════════════════════════════════════════════"
