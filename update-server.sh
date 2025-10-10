#!/bin/bash

# 🔄 Quick Update & Rebuild Script for Hostinger VPS

echo "🔄 Updating Kiwi Derby on server..."

# Navigate to project
cd ~/International_Pet_Kiwi_Derby || { echo "❌ Project directory not found!"; exit 1; }

# Stop PM2
echo "⏸️  Stopping PM2..."
pm2 stop kiwi-derby

# Pull latest code from GitHub
echo "📥 Pulling latest code..."
git pull origin main

# Install any new dependencies
echo "📦 Installing dependencies..."
npm install

# Remove old build
echo "🗑️  Removing old build..."
rm -rf .next

# Build fresh
echo "🔨 Building production app..."
npm run build

# Restart PM2
echo "🚀 Restarting PM2..."
pm2 delete kiwi-derby 2>/dev/null || true
pm2 start npm --name "kiwi-derby" -- start
pm2 save

# Check status
echo ""
echo "✅ Done! Checking status..."
pm2 status

echo ""
echo "🌐 Test your app at: http://160.238.36.194"
echo ""
echo "📋 View logs: pm2 logs kiwi-derby"
