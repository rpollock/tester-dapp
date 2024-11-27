// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const ethers = require('ethers');

module.exports = buildModule('MintableTokenModule', (m) => {
  // Get the deployer account (first account in the list)
  const deployer = m.getAccount(0); // Assumes deployer is the first account

  // Set the mint price (in wei) and treasury (deployer's address in this case)
  const mintPrice = ethers.parseEther('0.0001'); // Price of 1 token in ETH
  const treasury = deployer.address; // Deployer's address as treasury

  // Deploy the MintableToken contract
  const mintableToken = m.contract('MintableToken', {
    args: [mintPrice, treasury], // Arguments passed to the constructor
  });

  // Return the contract instance for further interaction
  return { mintableToken };
});


/*const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});*/
