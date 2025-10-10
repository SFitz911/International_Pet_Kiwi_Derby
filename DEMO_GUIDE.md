# 🎬 DEMO GUIDE: International Pet Kiwi Derby NFT Tickets

This guide demonstrates the full functionality of the NFT ticket system using a demo wallet.

---

## 📋 **Demo Wallet Information**

- **Address:** `0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae`
- **Network:** Sepolia Testnet
- **Starting Balance:** 0.06 ETH
- **Purpose:** Demonstrate minting and ticket viewing functionality

---

## 🚀 **Quick Start Demo**

### **Step 1: Check Demo Wallet Status**

```bash
npm run demo:check
```

**This will show:**
- ✅ Current ETH balance
- ✅ Current ticket count
- ✅ Contract statistics
- ✅ Whether you have enough balance to mint

**Expected Output:**
```
💰 Demo Wallet Info:
   Address: 0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae
   Balance: 0.060000 ETH

🎟️  Ticket Info:
   Current Tickets: 0

📊 Contract Info:
   Total Minted: 0 / 500
   Contract: 0x971745b3d6f5774705574e635272c2ef26305bcf

💡 Minting Simulation:
   Tickets to Mint: 3
   Cost per Ticket: 0.001 ETH
   Total Cost: 0.003 ETH
   Remaining Balance After: 0.057000 ETH

✅ Wallet has sufficient balance to mint!
```

---

### **Step 2: Mint Demo Tickets**

```bash
npm run demo:mint
```

**This will:**
1. Connect to Sepolia using the demo wallet
2. Mint 3 NFT tickets
3. Show transaction details
4. Display updated balances

**Expected Output:**
```
🎫 Starting Demo Mint Process...

🔐 Using wallet: 0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae
💰 Balance Before: 0.060000 ETH

🎟️  Tickets Before: 0

📦 Minting 3 tickets...
   Cost: 0.003 ETH
   To: 0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae

⏳ Sending transaction...
📝 Transaction Hash: 0x...
⏳ Waiting for confirmation...
✅ Transaction Confirmed!
   Block: 12345678
   Gas Used: 150000

📊 Results:
   Tickets After: 3 (+3)
   Balance After: 0.056800 ETH
   ETH Spent: 0.003200 ETH

🎉 Contract Stats:
   Total Minted: 3 / 500

🔗 View Transaction:
   https://sepolia.etherscan.io/tx/0x...

🔗 View Wallet:
   https://sepolia.etherscan.io/address/0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae

✨ Demo mint complete! Check the frontend at:
   http://localhost:3000/my-tickets
```

---

### **Step 3: View Tickets on Frontend**

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:3000
   ```

3. **Connect the demo wallet:**
   - Click "Connect Wallet"
   - Select MetaMask (or your wallet)
   - Make sure you're on **Sepolia network**
   - Switch to the demo wallet account

4. **Navigate to "My Tickets":**
   ```
   http://localhost:3000/my-tickets
   ```

5. **You should see:**
   - ✅ 3 ticket cards displayed
   - ✅ QR codes for each ticket
   - ✅ Wallet address showing ownership
   - ✅ Network showing "Sepolia"

---

## 🎯 **Demo Flow Walkthrough**

### **Complete User Journey:**

#### **1. Home Page** (`/`)
- Landing page with event information
- Links to mint and view tickets

#### **2. Mint Page** (`/mint`)
- **Before minting:** Shows 0 tickets owned
- **Connect wallet** to demo address
- **Select quantity** (use + / - buttons)
- **View total cost** in ETH and USD
- **Click "Mint Tickets"** button
- **Confirm transaction** in wallet
- **Wait for confirmation**

#### **3. My Tickets Page** (`/my-tickets`)
- **Wallet info** displayed
- **Total tickets owned** shown
- **Individual ticket cards** with:
  - Ticket number
  - QR code for verification
  - Owner address
  - Network (Sepolia)
- **Refresh button** to update balance

#### **4. Scanner Page** (`/scanner`)
- Camera-based QR code scanner
- Placeholder for ticket verification
- (Full verification requires signature implementation)

---

## 💰 **Cost Breakdown**

### **Per Ticket:**
- **Price:** 0.001 ETH
- **Fee (10%):** 0.0001 ETH
  - Dev Team (7%): 0.00007 ETH
  - Profits City (3%): 0.00003 ETH
- **Owner Revenue (90%):** 0.0009 ETH (stays in contract)

### **3 Tickets Total:**
- **Total Paid:** 0.003 ETH
- **Gas Fee:** ~0.0002 ETH (variable)
- **Total Cost:** ~0.0032 ETH

### **Remaining Balance:**
- **Started with:** 0.06 ETH
- **After minting:** ~0.0568 ETH

---

## 🔍 **Verification on Etherscan**

### **Check Contract Activity:**
1. Visit: https://sepolia.etherscan.io/address/0x971745b3d6f5774705574e635272c2ef26305bcf
2. Click "Transactions" tab
3. Look for "mint" transactions

### **Check Demo Wallet:**
1. Visit: https://sepolia.etherscan.io/address/0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae
2. View transaction history
3. Check token holdings (ERC-1155 tokens)

---

## 🧪 **Testing Scenarios**

### **Scenario 1: First-Time User**
1. Start with 0 tickets
2. Mint 1 ticket
3. Verify it appears in "My Tickets"
4. Check QR code generates

### **Scenario 2: Multiple Tickets**
1. Mint 3 tickets at once
2. Verify all 3 appear
3. Each has unique QR code
4. Total count updates

### **Scenario 3: Insufficient Balance**
1. Try minting more tickets than balance allows
2. Transaction should fail
3. Error message displayed

### **Scenario 4: Network Check**
1. Connect on wrong network (e.g., Mainnet)
2. Contract functions should not work
3. Switch to Sepolia to fix

---

## 📸 **Screenshots to Capture**

For documentation/presentation:

1. ✅ Check wallet script output
2. ✅ Mint transaction in progress
3. ✅ Successful mint confirmation
4. ✅ Etherscan transaction details
5. ✅ "My Tickets" page showing 3 tickets
6. ✅ Individual ticket with QR code
7. ✅ Wallet connection on Sepolia
8. ✅ Contract on Etherscan

---

## 🎬 **Video Demo Script**

**30-Second Demo:**
1. (0:00-0:05) "Here's our NFT ticket system on Sepolia"
2. (0:05-0:10) Run `npm run demo:check` - show balance
3. (0:10-0:15) Run `npm run demo:mint` - show minting
4. (0:15-0:20) Open `/my-tickets` - show tickets appear
5. (0:20-0:25) Zoom in on QR codes
6. (0:25-0:30) Show Etherscan confirmation

**2-Minute Full Demo:**
1. Introduction to the project
2. Check wallet status
3. Explain minting process
4. Execute mint transaction
5. Wait for confirmation
6. Show Etherscan details
7. Navigate to frontend
8. Connect wallet
9. View tickets
10. Show QR codes
11. Explain verification flow
12. Summary

---

## 🐛 **Troubleshooting**

### **Issue: "DEMO_WALLET_PRIVATE_KEY not found"**
**Solution:** Make sure `.env.local` has:
```
DEMO_WALLET_PRIVATE_KEY=336bbc42d68717bba528aefc993f314d97f054f818dd1a450008b7f234692345
```

### **Issue: "Insufficient balance"**
**Solution:** 
- Check balance with `npm run demo:check`
- Get more Sepolia ETH from faucet: https://sepoliafaucet.com/

### **Issue: "Transaction failed"**
**Solution:**
- Check you're on Sepolia network
- Verify contract address is correct
- Ensure wallet has enough gas + ticket cost

### **Issue: "Tickets not showing on frontend"**
**Solution:**
- Hard refresh: Ctrl + Shift + R
- Check you're connected to the right wallet
- Verify you're on Sepolia network
- Wait a few seconds for blockchain confirmation

---

## 🎉 **Success Criteria**

Demo is successful when:
- ✅ Scripts run without errors
- ✅ Transaction confirms on Sepolia
- ✅ Etherscan shows the transaction
- ✅ Tickets appear on frontend
- ✅ QR codes display correctly
- ✅ Balance updates accurately
- ✅ Contract stats increment

---

## 📝 **Next Steps After Demo**

1. **Implement Signature Verification** for QR codes
2. **Upload Real Metadata** to IPFS
3. **Professional Security Audit** before mainnet
4. **Write Comprehensive Tests**
5. **Deploy to Production** (Mainnet or Base)

---

## 🔗 **Important Links**

- **Contract:** https://sepolia.etherscan.io/address/0x971745b3d6f5774705574e635272c2ef26305bcf
- **Demo Wallet:** https://sepolia.etherscan.io/address/0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae
- **Frontend:** http://localhost:3000
- **Sepolia Faucet:** https://sepoliafaucet.com/
- **Audit Report:** See `AUDIT_REPORT.md`

---

**Demo Created:** October 9, 2025  
**Ready to Run!** 🚀
