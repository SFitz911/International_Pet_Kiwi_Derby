#!/bin/bash

# 🔍 Kiwi Derby - Diagnostic Script
# Run this on your Hostinger VPS to diagnose connection issues

echo "═══════════════════════════════════════════════════════"
echo "🔍 Kiwi Derby Diagnostics"
echo "═══════════════════════════════════════════════════════"
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    SUDO=""
else
    SUDO="sudo"
fi

# 1. Check PM2 Status
echo "1️⃣ Checking PM2 Status..."
if command -v pm2 &> /dev/null; then
    pm2 status
else
    echo "❌ PM2 not installed!"
fi
echo ""

# 2. Check if port 3000 is listening
echo "2️⃣ Checking if port 3000 is in use..."
if $SUDO netstat -tlnp 2>/dev/null | grep -q ":3000"; then
    echo "✅ Port 3000 is listening:"
    $SUDO netstat -tlnp | grep ":3000"
else
    echo "❌ Nothing is listening on port 3000!"
fi
echo ""

# 3. Check UFW firewall
echo "3️⃣ Checking UFW Firewall..."
if command -v ufw &> /dev/null; then
    $SUDO ufw status | grep -E "Status|3000"
else
    echo "⚠️  UFW not installed"
fi
echo ""

# 4. Test local connection
echo "4️⃣ Testing local connection to localhost:3000..."
if command -v curl &> /dev/null; then
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "304" ]; then
        echo "✅ App responds locally (HTTP $HTTP_CODE)"
        echo "   First 500 chars of response:"
        curl -s http://localhost:3000 2>/dev/null | head -c 500
    else
        echo "❌ App not responding locally (HTTP $HTTP_CODE)"
    fi
else
    echo "⚠️  curl not installed, installing..."
    $SUDO apt install curl -y
fi
echo ""
echo ""

# 5. Check PM2 logs
echo "5️⃣ Recent PM2 Logs (last 10 lines)..."
if command -v pm2 &> /dev/null; then
    pm2 logs kiwi-derby --lines 10 --nostream 2>/dev/null || echo "No logs found"
fi
echo ""

# 6. Check all listening ports
echo "6️⃣ All listening ports:"
$SUDO netstat -tlnp 2>/dev/null | grep LISTEN || $SUDO ss -tlnp
echo ""

# 7. Get server IP
echo "7️⃣ Server Network Info..."
echo "IP Address: $(hostname -I | awk '{print $1}')"
echo ""

# 8. Check if project exists
echo "8️⃣ Checking project directory..."
PROJECT_DIR="/var/www/International_Pet_Kiwi_Derby"
if [ -d "$PROJECT_DIR" ]; then
    echo "✅ Project found at $PROJECT_DIR"
    echo "   Build directory exists: $([ -d "$PROJECT_DIR/.next" ] && echo "Yes" || echo "No")"
    echo "   node_modules exists: $([ -d "$PROJECT_DIR/node_modules" ] && echo "Yes" || echo "No")"
else
    echo "❌ Project not found at $PROJECT_DIR"
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════"
echo "📋 DIAGNOSIS SUMMARY"
echo "═══════════════════════════════════════════════════════"
echo ""

# Determine the issue
PM2_RUNNING=$(pm2 list 2>/dev/null | grep -c "online" || echo "0")
PORT_LISTENING=$($SUDO netstat -tlnp 2>/dev/null | grep -c ":3000" || echo "0")
UFW_ALLOWS=$($SUDO ufw status 2>/dev/null | grep -c "3000" || echo "0")

if [ "$PM2_RUNNING" -gt 0 ] && [ "$PORT_LISTENING" -gt 0 ]; then
    echo "✅ App is running correctly on the server"
    echo ""
    if [ "$UFW_ALLOWS" -gt 0 ]; then
        echo "✅ UFW firewall allows port 3000"
        echo ""
        echo "⚠️  If you still can't access from browser, check:"
        echo "   1. Hostinger Control Panel → Firewall/Security Groups"
        echo "   2. Make sure port 3000 TCP is allowed from 0.0.0.0/0"
        echo "   3. Try accessing: http://$(hostname -I | awk '{print $1}'):3000"
    else
        echo "❌ UFW firewall is NOT allowing port 3000"
        echo ""
        echo "🔧 Run these commands to fix:"
        echo "   sudo ufw allow 3000/tcp"
        echo "   sudo ufw reload"
    fi
else
    echo "❌ App is NOT running properly"
    echo ""
    echo "🔧 Run these commands to fix:"
    echo "   cd /var/www/International_Pet_Kiwi_Derby"
    echo "   npm install"
    echo "   npm run build"
    echo "   pm2 restart kiwi-derby"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
