// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IPriceFeed {
    function latestAnswer() external view returns (int256);
}

contract MintableToken is ERC20, Ownable {
    IPriceFeed public priceFeed;
    uint256 public tokenPriceUSD = 1e16;

    constructor(address _priceFeed) ERC20("RianToken", "MTK") {
        priceFeed = IPriceFeed(_priceFeed);
    }

    function mint(uint256 amount) external payable {
        uint256 ethPriceGBP = uint256(priceFeed.latestAnswer());
        uint256 cost = (tokenPriceUSD * amount * 1e18) / ethPriceUSD;

        require(msg.value >= cost, "Insufficent ETH Sent");

        _mint(msg.sender, amount);

        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
    }

    function setTokenPriceUSD(uint256 _newPrice) external onlyOwner() {
        tokenPriceUSD = _newPrice;
    }
}
