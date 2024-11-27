require("@nomicfoundation/hardhat-toolbox");
require('@nomicfoundation/hardhat-ignition-ethers');
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {},
    sepolia: {
      url: process.env.API_URL, // Alchemy or Infura URL
      accounts: [process.env.PRIVATE_KEY], // Private key of your wallet
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // First account in the wallet list
    },
  },
};
