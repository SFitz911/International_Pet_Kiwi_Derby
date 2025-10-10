const hre = require("hardhat");

async function main() {
    console.log("🚀 Starting deployment to Sepolia...");

    // Check if private key is configured
    if (!process.env.SEPOLIA_PRIVATE_KEY) {
        console.error("❌ SEPOLIA_PRIVATE_KEY environment variable not set!");
        console.log("Please set your private key:");
        console.log("$env:SEPOLIA_PRIVATE_KEY='your-private-key-here'");
        console.log("Then run the deployment again.");
        process.exit(1);
    }

    // Get wallet clients
    const walletClients = await hre.viem.getWalletClients();
    if (walletClients.length === 0) {
        console.error("❌ No wallet clients found! Check your private key configuration.");
        process.exit(1);
    }

    const deployer = walletClients[0];
    console.log("🔐 Deploying from account:", deployer.account.address);

    // Deploy the TicketNFT contract with required parameters
    const baseURI = "https://ipfs.io/ipfs/QmYourHashHere/";
    const devTeamWallet = "0x7626DB74b58Da433E91646AA61408E34737ca896";

    console.log("📦 Deploying TicketNFT with parameters:");
    console.log("- Base URI:", baseURI);
    console.log("- Initial Owner:", devTeamWallet);

    try {
        const contract = await hre.viem.deployContract("TicketNFT", [
            baseURI,
            devTeamWallet
        ], {
            walletClient: deployer
        });

        console.log("✅ TicketNFT deployed successfully!");
        console.log("📍 Contract address:", contract.address);

        console.log("\n🎯 COPY THIS ADDRESS:");
        console.log("Contract Address:", contract.address);

        console.log("\n📝 UPDATE YOUR CONFIG:");
        console.log("In app/contracts/config.ts, change:");
        console.log(`11155111: '${contract.address}',`);

        return contract.address;
    } catch (error) {
        console.error("❌ Deployment failed:", error.message);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });