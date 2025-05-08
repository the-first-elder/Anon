// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./anonNft.sol";
import "@openzeppelin-contracts/contracts/access/Ownable.sol";

contract AnonNftCreator is Ownable {
    uint256 public creationFee = 0.01 ether;
    address[] public allDeployedNFTs;

    event AnonNFTCreated(address nftAddress, string name, string symbol, string uri, address owner);

    constructor() Ownable(msg.sender) {}

    function createAnonNFT(string memory name, string memory symbol, string memory uri, address owner)
        external
        payable
        returns (address)
    {
        require(msg.value >= creationFee, "Insufficient fee"); // disabling for now..
        NonTransferableNFT nft = new NonTransferableNFT(name, symbol, uri, owner);
        allDeployedNFTs.push(address(nft));
        emit AnonNFTCreated(address(nft), name, symbol, uri, owner);
        return address(nft);
    }

    function getAllDeployedNFTs() external view returns (address[] memory) {
        return allDeployedNFTs;
    }

    function setCreationFee(uint256 newFee) external onlyOwner {
        creationFee = newFee;
    }

    function withdrawFees(address payable _to) public onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        (bool success,) = _to.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    receive() external payable {}
}
