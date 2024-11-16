require("@nomicfoundation/hardhat-toolbox");
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const API_URL = process.env.API_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    volta: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    }
  },
};
