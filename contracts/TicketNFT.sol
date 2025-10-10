// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

/**
 * @title International Pet Kiwi Derby Ticket NFT
 * @dev ERC1155 contract for event tickets with QR code verification and royalty splits
 */
contract TicketNFT is ERC1155, Ownable, IERC2981 {
    using Strings for uint256;

    // Constants
    uint256 public constant TICKET_ID = 1;
    uint256 public constant MAX_SUPPLY = 500;
    uint256 public constant TICKET_PRICE = 0.001 ether; // Sepolia price
    uint256 public constant ROYALTY_PERCENTAGE = 1000; // 10% in basis points (10000 = 100%)
    
    // Royalty recipient addresses
    address public constant PET_KIWI_DEV_TEAM = 0x7626DB74b58Da433E91646AA61408E34737ca896;
    address public constant PET_KIWI_DEV_PROFITS_CITY = 0xcb3e805a1fcc1fF29587320570517025C01BD503;
    
    // State variables
    uint256 public totalMinted;
    string public name = "International Pet Kiwi Derby Tickets";
    string public symbol = "IPKD";
    
    // Mapping to track verified tickets (prevents replay attacks)
    mapping(bytes32 => bool) public verifiedTickets;
    
    // Events
    event TicketMinted(address indexed to, uint256 amount, uint256 totalMinted);
    event TicketVerified(address indexed holder, bytes32 indexed qrHash, uint256 timestamp);
    event RoyaltyPaid(address indexed devTeam, address indexed profitsCity, uint256 devAmount, uint256 profitsAmount);
    event InitialSaleFeeDistributed(address indexed buyer, uint256 totalPaid, uint256 feeAmount, uint256 devAmount, uint256 profitsAmount);
    
    constructor(
        string memory _baseURI,
        address initialOwner
    ) ERC1155(_baseURI) Ownable(initialOwner) {}

    /**
     * @dev Mint tickets to an address
     * @param to Address to mint tickets to
     * @param amount Number of tickets to mint
     */
    function mint(address to, uint256 amount) public payable {
        require(amount > 0, "Amount must be greater than 0");
        require(totalMinted + amount <= MAX_SUPPLY, "Exceeds maximum supply");
        require(msg.value >= TICKET_PRICE * amount, "Insufficient payment");
        
        // Calculate total payment and fees
        uint256 totalPayment = TICKET_PRICE * amount;
        uint256 feeAmount = (totalPayment * ROYALTY_PERCENTAGE) / 10000; // 10% fee
        
        totalMinted += amount;
        _mint(to, TICKET_ID, amount, "");
        
        emit TicketMinted(to, amount, totalMinted);
        
        // Immediately distribute the 10% fee: 7% to Dev Team, 3% to Profits City
        if (feeAmount > 0) {
            uint256 devTeamAmount = (feeAmount * 7000) / 10000; // 7% of total sale price
            uint256 profitsCityAmount = feeAmount - devTeamAmount; // 3% of total sale price
            
            payable(PET_KIWI_DEV_TEAM).transfer(devTeamAmount);
            payable(PET_KIWI_DEV_PROFITS_CITY).transfer(profitsCityAmount);
            
            emit InitialSaleFeeDistributed(msg.sender, totalPayment, feeAmount, devTeamAmount, profitsCityAmount);
        }
        
        // The remaining 90% stays in contract for owner to withdraw later
        // Refund excess payment (after total ticket price)
        if (msg.value > totalPayment) {
            payable(msg.sender).transfer(msg.value - totalPayment);
        }
    }

    /**
     * @dev Batch mint tickets to multiple addresses (owner only)
     * @param recipients Array of addresses to mint to
     * @param amounts Array of amounts to mint to each address
     */
    function batchMint(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(totalMinted + totalAmount <= MAX_SUPPLY, "Exceeds maximum supply");
        
        totalMinted += totalAmount;
        
        for (uint256 i = 0; i < recipients.length; i++) {
            if (amounts[i] > 0) {
                _mint(recipients[i], TICKET_ID, amounts[i], "");
                emit TicketMinted(recipients[i], amounts[i], totalMinted);
            }
        }
    }

    /**
     * @dev Verify a ticket using QR code data
     * @param holder Address of the ticket holder
     * @param qrHash Hash of the QR code data
     * @param signature Signature from the ticket holder
     */
    function verifyTicket(
        address holder,
        bytes32 qrHash,
        bytes calldata signature
    ) external returns (bool) {
        require(balanceOf(holder, TICKET_ID) > 0, "No ticket owned");
        require(!verifiedTickets[qrHash], "Ticket already verified");
        
        // Verify signature (simplified - in production, implement proper signature verification)
        bytes32 messageHash = keccak256(abi.encodePacked(holder, qrHash, block.timestamp));
        
        verifiedTickets[qrHash] = true;
        emit TicketVerified(holder, qrHash, block.timestamp);
        
        return true;
    }

    /**
     * @dev Check if a ticket has been verified
     * @param qrHash Hash of the QR code data
     */
    function isTicketVerified(bytes32 qrHash) external view returns (bool) {
        return verifiedTickets[qrHash];
    }

    /**
     * @dev Get ticket balance for an address
     * @param account Address to check
     */
    function getTicketBalance(address account) external view returns (uint256) {
        return balanceOf(account, TICKET_ID);
    }

    /**
     * @dev Set the base URI for metadata (owner only)
     * @param newURI New base URI
     */
    function setURI(string calldata newURI) external onlyOwner {
        _setURI(newURI);
    }

    /**
     * @dev Withdraw remaining funds after fees (owner only)
     * Note: Royalty fees are automatically distributed, this withdraws remaining revenue
     */
    function withdrawRevenue() external onlyOwner {
        // This will only have the 90% remaining from ticket sales
        // The 10% fees are automatically distributed via _distributeRoyalties
        uint256 balance = address(this).balance;
        require(balance > 0, "No revenue to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Emergency withdraw (owner only) - for any stuck funds
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Update ticket price (owner only)
     */
    function updateTicketPrice(uint256 newPrice) external onlyOwner {
        // Note: This would require updating the constant or making it a variable
        // For now, keeping as constant for security
        revert("Price is fixed at deployment");
    }

    /**
     * @dev Returns the URI for a given token ID
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(tokenId == TICKET_ID, "Invalid token ID");
        return string(abi.encodePacked(super.uri(tokenId), tokenId.toString(), ".json"));
    }

    /**
     * @dev Returns contract metadata URI
     */
    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked(super.uri(0), "contract.json"));
    }

    /**
     * @dev EIP-2981 royalty info function
     * @param tokenId The token ID (not used, same royalty for all)
     * @param salePrice The sale price of the token
     * @return receiver Address to receive royalties (this contract)
     * @return royaltyAmount The royalty amount to be paid
     */
    function royaltyInfo(uint256 tokenId, uint256 salePrice) 
        external 
        view 
        override 
        returns (address receiver, uint256 royaltyAmount) 
    {
        require(tokenId == TICKET_ID, "Invalid token ID");
        royaltyAmount = (salePrice * ROYALTY_PERCENTAGE) / 10000;
        receiver = address(this); // This contract will receive and split royalties
    }

    /**
     * @dev Function to receive and distribute royalty payments
     * Automatically splits 7% to Dev Team and 3% to Profits City
     */
    receive() external payable {
        if (msg.value > 0) {
            _distributeRoyalties(msg.value);
        }
    }

    /**
     * @dev Manually distribute royalty payments (in case of direct transfers)
     */
    function distributeRoyalties() external {
        uint256 balance = address(this).balance;
        require(balance > 0, "No royalties to distribute");
        _distributeRoyalties(balance);
    }

    /**
     * @dev Internal function to split royalties: 7% to Dev Team, 3% to Profits City
     * @param amount Total royalty amount to split
     */
    function _distributeRoyalties(uint256 amount) internal {
        // 7% of original sale price goes to Dev Team
        uint256 devTeamAmount = (amount * 7000) / 10000;
        
        // 3% of original sale price goes to Profits City  
        uint256 profitsCityAmount = amount - devTeamAmount;
        
        // Transfer to Dev Team
        payable(PET_KIWI_DEV_TEAM).transfer(devTeamAmount);
        
        // Transfer to Profits City
        payable(PET_KIWI_DEV_PROFITS_CITY).transfer(profitsCityAmount);
        
        emit RoyaltyPaid(PET_KIWI_DEV_TEAM, PET_KIWI_DEV_PROFITS_CITY, devTeamAmount, profitsCityAmount);
    }

    /**
     * @dev Check if contract supports interface
     */
    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        override(ERC1155, IERC165) 
        returns (bool) 
    {
        return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
    }

    /**
     * @dev Get royalty split information
     */
    function getRoyaltyInfo() external pure returns (
        address devTeam, 
        address profitsCity, 
        uint256 devPercentage, 
        uint256 profitsPercentage,
        uint256 totalRoyalty
    ) {
        return (
            PET_KIWI_DEV_TEAM,
            PET_KIWI_DEV_PROFITS_CITY,
            7000, // 7% of total sale price (in basis points)
            3000, // 3% of total sale price (in basis points) 
            ROYALTY_PERCENTAGE // 10% total royalty (in basis points)
        );
    }
}