const hre = require("hardhat");

async function main() {
    console.log("🎫 Starting Demo Mint Process...\n");

    // Configuration
    const demoWalletAddress = "0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae";
    const contractAddress = "0x971745b3d6f5774705574e635272c2ef26305bcf";
    const numTickets = 3; // Mint 3 tickets for demo
    const ticketPrice = 0.001; // ETH per ticket

    try {
        // Check if private key is set
        if (!process.env.DEMO_WALLET_PRIVATE_KEY) {
            console.error("❌ DEMO_WALLET_PRIVATE_KEY not found in .env.local");
            console.log("Please add your demo wallet private key to .env.local");
            process.exit(1);
        }

        // Get wallet client using demo wallet private key
        const [walletClient] = await hre.viem.getWalletClients();
        console.log("🔐 Using wallet:", walletClient.account.address);

        if (walletClient.account.address.toLowerCase() !== demoWalletAddress.toLowerCase()) {
            console.warn("⚠️  Warning: Wallet address doesn't match demo address");
            console.log("   Expected:", demoWalletAddress);
            console.log("   Got:", walletClient.account.address);
        }

        // Get public client for reading
        const publicClient = await hre.viem.getPublicClient();

        // Check balance before
        const balanceBefore = await publicClient.getBalance({ address: demoWalletAddress });
        console.log(`💰 Balance Before: ${(Number(balanceBefore) / 1e18).toFixed(6)} ETH\n`);

        // Get contract instance
        const contract = await hre.viem.getContractAt("TicketNFT", contractAddress);

        // Check current ticket balance
        const ticketsBefore = await contract.read.balanceOf([demoWalletAddress, 1n]);
        console.log(`🎟️  Tickets Before: ${ticketsBefore.toString()}`);

        // Calculate total cost
        const totalCost = BigInt(Math.floor(ticketPrice * numTickets * 1e18));
        console.log(`\n📦 Minting ${numTickets} tickets...`);
        console.log(`   Cost: ${ticketPrice * numTickets} ETH`);
        console.log(`   To: ${demoWalletAddress}`);

        // Execute mint transaction
        console.log("\n⏳ Sending transaction...");
        const hash = await contract.write.mint([demoWalletAddress, BigInt(numTickets)], {
            value: totalCost,
            account: walletClient.account,
        });

        console.log(`📝 Transaction Hash: ${hash}`);
        console.log("⏳ Waiting for confirmation...");

        // Wait for transaction receipt
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        if (receipt.status === 'success') {
            console.log("✅ Transaction Confirmed!");
            console.log(`   Block: ${receipt.blockNumber}`);
            console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
        } else {
            console.log("❌ Transaction Failed!");
            process.exit(1);
        }

        // Check balances after
        console.log("\n📊 Results:");
        const ticketsAfter = await contract.read.balanceOf([demoWalletAddress, 1n]);
        const balanceAfter = await publicClient.getBalance({ address: demoWalletAddress });

        console.log(`   Tickets After: ${ticketsAfter.toString()} (+${Number(ticketsAfter - ticketsBefore)})`);
        console.log(`   Balance After: ${(Number(balanceAfter) / 1e18).toFixed(6)} ETH`);
        console.log(`   ETH Spent: ${((Number(balanceBefore) - Number(balanceAfter)) / 1e18).toFixed(6)} ETH`);

        // Show contract stats
        const totalMinted = await contract.read.totalMinted();
        console.log(`\n🎉 Contract Stats:`);
        console.log(`   Total Minted: ${totalMinted.toString()} / 500`);

        // Show links
        console.log(`\n🔗 View Transaction:`);
        console.log(`   https://sepolia.etherscan.io/tx/${hash}`);
        console.log(`\n🔗 View Wallet:`);
        console.log(`   https://sepolia.etherscan.io/address/${demoWalletAddress}`);

        console.log("\n✨ Demo mint complete! Check the frontend at:");
        console.log("   http://localhost:3000/my-tickets");

    } catch (error) {
        console.error("\n❌ Minting failed:", error.message);
        if (error.details) {
            console.error("Details:", error.details);
        }
        throw error;
    }
}

main().catch(console.error);
