# 🔍 Hostinger Deployment Troubleshooting

## Current Status
- **Server IP**: 160.238.36.194
- **Expected Port**: 3000
- **URL**: http://160.238.36.194:3000/
- **Issue**: Cannot access from browser

---

## 🛠️ Troubleshooting Steps

### Step 1: SSH into Your Hostinger VPS

```bash
ssh root@160.238.36.194
# Or with your username: ssh username@160.238.36.194
```

### Step 2: Check if the App is Running

```bash
# Check PM2 status
pm2 status

# Check if Node.js is listening on port 3000
sudo netstat -tlnp | grep 3000

# Or use ss command
sudo ss -tlnp | grep 3000

# Check PM2 logs for errors
pm2 logs kiwi-derby --lines 50
```

### Step 3: Check Firewall Rules

```bash
# Check UFW status
sudo ufw status

# Check if port 3000 is allowed
sudo ufw status numbered

# If port 3000 is NOT allowed, add it:
sudo ufw allow 3000/tcp
sudo ufw reload
```

### Step 4: Check if Process is Actually Running

```bash
# List all node processes
ps aux | grep node

# Check what's listening on all ports
sudo netstat -tlnp

# Restart the app
pm2 restart kiwi-derby
```

### Step 5: Test from the Server Itself

```bash
# Test locally on the VPS
curl http://localhost:3000

# If this works but external doesn't, it's a firewall issue
```

### Step 6: Check Hostinger Firewall/Security Groups

⚠️ **IMPORTANT**: Hostinger VPS might have additional firewall layers:

1. **Log into Hostinger Control Panel**
2. Go to **VPS** → **Your VPS** → **Firewall** or **Security Groups**
3. Make sure port **3000 TCP** is allowed from all IPs (0.0.0.0/0)

### Step 7: Alternative - Use Nginx Reverse Proxy

If direct port access is blocked, set up Nginx:

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx config
sudo nano /etc/nginx/sites-available/kiwi-derby
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name 160.238.36.194;

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

Then:
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/kiwi-derby /etc/nginx/sites-enabled/

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Allow HTTP through firewall
sudo ufw allow 'Nginx Full'
```

Now try: **http://160.238.36.194** (without :3000)

---

## 🚀 Quick Fix Commands

Run these on your VPS:

```bash
# Restart everything
pm2 restart kiwi-derby

# Check if it's running
pm2 status

# Open port 3000
sudo ufw allow 3000/tcp
sudo ufw reload

# Test locally
curl http://localhost:3000
```

---

## 📞 Common Issues & Solutions

### Issue: "Connection Refused"
- **Cause**: App is not running or crashed
- **Fix**: `pm2 restart kiwi-derby` and check `pm2 logs`

### Issue: "Connection Timeout"
- **Cause**: Firewall blocking the port
- **Fix**: Open port 3000 in UFW AND Hostinger control panel

### Issue: "Site Can't Be Reached"
- **Cause**: Hostinger cloud firewall blocking external access
- **Fix**: Check Hostinger control panel firewall settings

### Issue: App Runs but Shows Error Page
- **Cause**: Build error or missing dependencies
- **Fix**: 
  ```bash
  cd /var/www/International_Pet_Kiwi_Derby
  npm install
  npm run build
  pm2 restart kiwi-derby
  ```

---

## ✅ Success Checklist

- [ ] SSH connection works
- [ ] `pm2 status` shows app is "online"
- [ ] `curl http://localhost:3000` returns HTML
- [ ] `sudo ufw status` shows port 3000 is allowed
- [ ] Hostinger control panel firewall allows port 3000
- [ ] Can access http://160.238.36.194:3000 from browser

---

## 🆘 Still Not Working?

1. **Share the output of these commands:**
   ```bash
   pm2 status
   pm2 logs kiwi-derby --lines 20
   sudo ufw status
   curl http://localhost:3000
   ```

2. **Check Hostinger's firewall** in their control panel
3. **Consider using Nginx** (port 80) as shown above
