const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TicketNFTModule = buildModule("TicketNFTModule", (m) => {
    // IPFS base URI for metadata - update this with your actual IPFS hash
    const baseURI = m.getParameter("baseURI", "https://nft.storage/api/v1/car/");

    // Initial owner - Dev Team wallet
    const initialOwner = m.getParameter("initialOwner", "0x7626DB74b58Da433E91646AA61408E34737ca896");

    const ticketNFT = m.contract("TicketNFT", [baseURI, initialOwner]);

    return { ticketNFT };
});

module.exports = TicketNFTModule;