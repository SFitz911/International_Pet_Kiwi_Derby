<!-- Web3 Tickets NFT Project Instructions -->

## Project Overview
- [x] **Clarify Project Requirements**: Web3 ticket system with ERC-1155 NFTs, IPFS metadata, Next.js frontend, QR code verification
- [ ] Scaffold the Project
- [ ] Customize the Project  
- [ ] Install Required Extensions
- [ ] Compile the Project
- [ ] Create and Run Task
- [ ] Launch the Project
- [ ] Ensure Documentation is Complete

## Project Details
- **Type**: Next.js Web3 application
- **Blockchain**: Base Sepolia testnet
- **Smart Contract**: ERC-1155 (100 ticket supply)
- **Metadata**: IPFS via nft.storage
- **Frontend**: Next.js with wagmi, RainbowKit, QR generation/scanning
- **Authentication**: Zero-backend wallet signatures with expiry
- **Deployment**: Vercel

## Features
1. Mint page: Connect wallet and mint tickets
2. My Ticket page: Show owned tickets with QR generation
3. Scanner page: Camera-based QR scanning with on-chain verification
4. Metadata stored on IPFS
5. Time-limited QR codes with replay protection