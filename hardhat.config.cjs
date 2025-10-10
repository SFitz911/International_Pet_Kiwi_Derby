require("@nomicfoundation/hardhat-toolbox-viem");

const config = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://1rpc.io/sepolia",
      accounts: process.env.DEMO_WALLET_PRIVATE_KEY
        ? [process.env.DEMO_WALLET_PRIVATE_KEY]
        : process.env.SEPOLIA_PRIVATE_KEY
          ? [process.env.SEPOLIA_PRIVATE_KEY]
          : [],
      chainId: 11155111,
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: process.env.BASE_SEPOLIA_PRIVATE_KEY ? [process.env.BASE_SEPOLIA_PRIVATE_KEY] : [],
      chainId: 84532,
    },
    polygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: process.env.POLYGON_MUMBAI_PRIVATE_KEY ? [process.env.POLYGON_MUMBAI_PRIVATE_KEY] : [],
      chainId: 80001,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

module.exports = config;
