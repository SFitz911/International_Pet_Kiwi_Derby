const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TicketNFTModule = buildModule("TicketNFTModule", (m) => {
    // IPFS base URI for metadata - using a placeholder for now
    const baseURI = m.getParameter("baseURI", "https://ipfs.io/ipfs/QmYourHashHere/");

    // Initial owner parameter
    const initialOwner = m.getParameter("initialOwner", "0x7626DB74b58Da433E91646AA61408E34737ca896");

    // Deploy contract with both required parameters
    const ticketNFT = m.contract("TicketNFT", [baseURI, initialOwner]);

    return { ticketNFT };
});

module.exports = TicketNFTModule;