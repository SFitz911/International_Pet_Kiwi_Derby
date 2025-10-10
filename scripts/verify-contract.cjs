const hre = require("hardhat");

async function main() {
    console.log("🔍 Verifying deployed TicketNFT contract...");

    const contractAddress = "0x971745b3d6f5774705574e635272c2ef26305bcf";

    try {
        // Get contract instance
        const contract = await hre.viem.getContractAt("TicketNFT", contractAddress);

        // Test basic reads
        const name = await contract.read.name();
        const symbol = await contract.read.symbol();
        const totalMinted = await contract.read.totalMinted();

        console.log("✅ Contract verification successful!");
        console.log("📋 Contract Details:");
        console.log(`   Name: ${name}`);
        console.log(`   Symbol: ${symbol}`);
        console.log(`   Total Minted: ${totalMinted}`);

        // Test balance read (should be 0 initially)
        const testAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
        const balance = await contract.read.balanceOf([testAddress, 1n]);
        console.log(`   Test Balance: ${balance} tickets`);

        // Test URI
        const uri = await contract.read.uri([1n]);
        console.log(`   Token URI: ${uri}`);

        console.log("\n🎯 Contract is live and functional!");
        console.log(`🔗 View on Etherscan: https://sepolia.etherscan.io/address/${contractAddress}`);

    } catch (error) {
        console.error("❌ Contract verification failed:", error.message);
        console.log("Possible issues:");
        console.log("- Contract not deployed at this address");
        console.log("- Wrong network (should be Sepolia)");
        console.log("- Contract code doesn't match ABI");
    }
}

main().catch(console.error);