# 🦆 International Pet Kiwi Derby - NFT Ticket System

A Web3 ticketing system for the most adorable racing event at Basin Reserve, Wellington - the world's largest roundabout! Built with NFT tickets, smart contracts, and a gorgeous frontend.

## 🏟️ Event Venue

**Basin Reserve, Wellington, New Zealand**
- Home to the world's largest traffic roundabout 🌍
- Historic cricket ground since 1868
- "If you miss it, just keep driving around!" 🚗💨
- The only cricket ground that's also a roundabout!

## ⚠️ Security Notice

**IMPORTANT**: This project uses publicly known development private keys for local testing. These are safe to see in terminal output as they're never used with real funds. For testnet/mainnet deployments:

- ✅ Use environment variables (see `.env.example`)
- ✅ Only use testnet wallets with test ETH
- ✅ Never commit actual private keys to git
- ✅ Always verify you're on testnet before deploying
- ✅ Consider hardware wallets for production

## 🚀 Project Features

- **ERC-1155 NFT Tickets**: 500 limited edition tickets at 0.001 ETH each
- **Smart Royalty System**: 10% automatic fee distribution (7% Dev Team, 3% Profits City)
- **QR Code Verification**: Time-limited QR codes for secure entry
- **Multi-Wallet Support**: MetaMask, Phantom, Coinbase Wallet, and more
- **Responsive UI**: Beautiful gradient design with Web3 integration
- **IPFS Metadata**: Decentralized ticket metadata storage

## 🛠️ Technical Stack

- **Blockchain**: Ethereum (Sepolia testnet)
- **Smart Contracts**: Solidity 0.8.28, Hardhat, OpenZeppelin
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Web3**: Wagmi, RainbowKit, Viem
- **Standards**: ERC-1155, EIP-2981 (royalties)

## Usage

### Running Tests

To run all the tests in the project, execute the following command:

```shell
npx hardhat test
```

You can also selectively run the Solidity or `node:test` tests:

```shell
npx hardhat test solidity
npx hardhat test nodejs
```

### Make a deployment to Sepolia

This project includes an example Ignition module to deploy the contract. You can deploy this module to a locally simulated chain or to Sepolia.

To run the deployment to a local chain:

```shell
npx hardhat ignition deploy ignition/modules/Counter.ts
```

To run the deployment to Sepolia, you need an account with funds to send the transaction. The provided Hardhat configuration includes a Configuration Variable called `SEPOLIA_PRIVATE_KEY`, which you can use to set the private key of the account you want to use.

You can set the `SEPOLIA_PRIVATE_KEY` variable using the `hardhat-keystore` plugin or by setting it as an environment variable.

To set the `SEPOLIA_PRIVATE_KEY` config variable using `hardhat-keystore`:

```shell
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

After setting the variable, you can run the deployment with the Sepolia network:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts
```
