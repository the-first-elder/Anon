// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NonTransferableNFT is ERC721Enumerable, Ownable {
    uint256 private _tokenIdCounter;
    address[] private _recipients;
    string private _sharedTokenURI;
    mapping(address => bool) private _hasReceived;
    mapping(address => uint256) private _recipientIndex;

    constructor(string memory _name, string memory _symbol, string memory uri, address _owner)
        ERC721(_name, _symbol)
        Ownable(_owner)
    {
        _sharedTokenURI = uri;
    }

    /// @notice Mint NFTs to multiple addresses
    function batchMint(address[] calldata recipients) external onlyOwner {
        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];

            if (!_hasReceived[to]) {
                _tokenIdCounter++;
                _safeMint(to, _tokenIdCounter);
                _recipientIndex[to] = _recipients.length;
                _recipients.push(to);
                _hasReceived[to] = true;
            }
        }
    }

    /// @notice View all recipient addresses
    function getAllRecipients() external view returns (address[] memory) {
        return _recipients;
    }

    /// @notice Owner can remove a recipient and burn their NFT
    function removeRecipient(address recipient) external onlyOwner {
        require(_hasReceived[recipient], "Recipient not found");

        uint256 balance = balanceOf(recipient);
        require(balance > 0, "Recipient has no NFT");

        // Burn all NFTs owned by recipient
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(recipient, 0); // always index 0 as balance changes
            _burn(tokenId);
        }

        // Remove recipient from the list
        uint256 index = _recipientIndex[recipient];
        uint256 lastIndex = _recipients.length - 1;

        if (index != lastIndex) {
            address lastRecipient = _recipients[lastIndex];
            _recipients[index] = lastRecipient;
            _recipientIndex[lastRecipient] = index;
        }

        _recipients.pop();
        delete _hasReceived[recipient];
        delete _recipientIndex[recipient];
    }

    /// @dev Disable transfers
    function transferFrom(address, address, uint256) public pure override(ERC721, IERC721) {
        revert("Transfers disabled");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override(ERC721, IERC721) {
        revert("Transfers disabled");
    }
}
