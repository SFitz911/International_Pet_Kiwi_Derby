const hre = require("hardhat");

async function main() {
    console.log("🔍 Checking Demo Wallet Status...\n");

    const demoWalletAddress = "0xc952b1071e063a3Bb601F670f6f1f04e2A4631Ae";
    const contractAddress = "0x971745b3d6f5774705574e635272c2ef26305bcf";

    try {
        // Get public client for reading (no wallet needed for read operations)
        const publicClient = await hre.viem.getPublicClient();

        // Check wallet ETH balance
        const balance = await publicClient.getBalance({ address: demoWalletAddress });
        const balanceInEth = Number(balance) / 1e18;

        console.log("💰 Demo Wallet Info:");
        console.log(`   Address: ${demoWalletAddress}`);
        console.log(`   Balance: ${balanceInEth.toFixed(6)} ETH`);
        console.log("");

        // Get contract instance
        const contract = await hre.viem.getContractAt("TicketNFT", contractAddress);

        // Check ticket balance
        const ticketBalance = await contract.read.balanceOf([demoWalletAddress, 1n]);
        console.log("🎟️  Ticket Info:");
        console.log(`   Current Tickets: ${ticketBalance.toString()}`);
        console.log("");

        // Check contract state
        const totalMinted = await contract.read.totalMinted();
        console.log("📊 Contract Info:");
        console.log(`   Total Minted: ${totalMinted.toString()} / 500`);
        console.log(`   Contract: ${contractAddress}`);
        console.log("");

        // Calculate minting cost
        const ticketPrice = 0.001; // ETH
        const numTickets = 3;
        const totalCost = ticketPrice * numTickets;

        console.log("💡 Minting Simulation:");
        console.log(`   Tickets to Mint: ${numTickets}`);
        console.log(`   Cost per Ticket: ${ticketPrice} ETH`);
        console.log(`   Total Cost: ${totalCost} ETH`);
        console.log(`   Remaining Balance After: ${(balanceInEth - totalCost).toFixed(6)} ETH`);
        console.log("");

        // Check if wallet has enough balance
        if (balanceInEth < totalCost) {
            console.log("❌ Insufficient balance to mint tickets!");
            console.log(`   Need: ${totalCost} ETH`);
            console.log(`   Have: ${balanceInEth} ETH`);
        } else {
            console.log("✅ Wallet has sufficient balance to mint!");
            console.log("");
            console.log("🎯 Ready to run: npm run demo:mint");
        }

    } catch (error) {
        console.error("❌ Error checking wallet:", error.message);
    }
}

main().catch(console.error);
