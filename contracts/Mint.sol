// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableToken is ERC20 {
    uint256 public mintPrice; // Price in wei for each token
    address public treasury; // Address where the funds are sent
    address public owner; //owner

    constructor(uint256 _mintPrice, address _treasury) ERC20("MintableToken", "MINT") {
        require(_treasury != address(0), "Invalid treasury address");
        mintPrice = _mintPrice;
        treasury = _treasury;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function mint(uint256 amount) external payable {
        uint256 requiredValue = mintPrice * amount;
        require(msg.value >= requiredValue, "Insufficient ETH sent");

        // Send ETH to the treasury
        (bool sent, ) = treasury.call{value: msg.value}("");
        require(sent, "Failed to send ETH");

        // Mint tokens to caller
        _mint(msg.sender, amount * 10 ** decimals());
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        owner = newOwner;
    }

}
