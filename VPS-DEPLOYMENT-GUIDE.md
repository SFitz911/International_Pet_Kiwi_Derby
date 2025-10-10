# 🥝 International Pet Kiwi Derby - VPS Deployment Guide

## 📋 Prerequisites on Your VPS

Your VPS needs:
- Ubuntu 20.04 or newer (or any Linux distro)
- Node.js 18+ and npm
- At least 1GB RAM
- SSH access

---

## 🚀 Step-by-Step Deployment

### 1️⃣ Connect to Your VPS

```bash
ssh root@YOUR_VPS_IP
# Or: ssh username@YOUR_VPS_IP
```

### 2️⃣ Install Node.js (if not installed)

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 3️⃣ Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 4️⃣ Upload Your Project to VPS

**Option A: Using Git (RECOMMENDED)**
```bash
# On VPS
cd /var/www
git clone YOUR_GITHUB_REPO_URL
cd International_Pet_Kiwi_Derby
```

**Option B: Using SCP from your Windows machine**
```powershell
# On your Windows machine (in PowerShell)
cd "c:\Users\Sean Fitz\OneDrive\Desktop"
scp -r International_Pet_Kiwi_Derby root@YOUR_VPS_IP:/var/www/
```

### 5️⃣ Install Dependencies on VPS

```bash
cd /var/www/International_Pet_Kiwi_Derby
npm install
```

### 6️⃣ Create Environment File

```bash
nano .env.local
```

Paste this content:
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=2d4f2d6f9b45c4d9b7f8c3e1a6b5d4e3
SEPOLIA_PRIVATE_KEY=4e5987e176f7aa33984adeed55efa3b7473d6805d2e80735dc8412e7d6c1b30f
DEMO_WALLET_PRIVATE_KEY=336bbc42d68717bba528aefc993f314d97f054f818dd1a450008b7f234692345
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### 7️⃣ Build the Production App

```bash
npm run build
```

### 8️⃣ Start with PM2

```bash
pm2 start npm --name "kiwi-derby" -- start
pm2 save
pm2 startup
```

### 9️⃣ Configure Firewall

```bash
# Allow port 3000
sudo ufw allow 3000
sudo ufw enable
```

### 🔟 Access Your App

Your app is now live at:
```
http://YOUR_VPS_IP:3000
```

---

## 🔧 Useful PM2 Commands

```bash
# View app status
pm2 status

# View logs
pm2 logs kiwi-derby

# Restart app
pm2 restart kiwi-derby

# Stop app
pm2 stop kiwi-derby

# Delete app from PM2
pm2 delete kiwi-derby
```

---

## 🌐 Optional: Set Up Nginx (For Port 80)

If you want to access without `:3000`:

### 1. Install Nginx
```bash
sudo apt install nginx -y
```

### 2. Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/kiwi-derby
```

Paste:
```nginx
server {
    listen 80;
    server_name YOUR_VPS_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Enable Config
```bash
sudo ln -s /etc/nginx/sites-available/kiwi-derby /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo ufw allow 80
```

Now access at: `http://YOUR_VPS_IP` (no port needed!)

---

## 🔄 Updating Your App

```bash
cd /var/www/International_Pet_Kiwi_Derby
git pull  # If using git
npm install
npm run build
pm2 restart kiwi-derby
```

---

## 🛑 Troubleshooting

### App not starting?
```bash
pm2 logs kiwi-derby --lines 100
```

### Port already in use?
```bash
# Check what's using port 3000
sudo lsof -i :3000
# Kill it
sudo kill -9 PID_NUMBER
```

### Build fails?
```bash
# Check Node version (needs 18+)
node --version

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## 📱 Share with Friends

Just share: `http://YOUR_VPS_IP:3000`

Or if using Nginx: `http://YOUR_VPS_IP`

✅ No tunnels needed!
✅ Always online!
✅ Fast and reliable!

---

## 🎉 Your Kiwi Derby is Now Live!

Friends can:
- Visit the hilarious landing page
- Click "Demo Mint" to mint tickets
- View analytics
- Connect their wallets
- See the Red Cable Car rule! 🚡

Built by SFitz911 🥝
