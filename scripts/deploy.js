const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const PriceFeedMock = await hre.ethers.getContractFactory("MockV3Aggregator");
    const priceFeedMock = await PriceFeedMock.deploy(8, "300000000000"); // ETH price = $3000
    await priceFeedMock.deployed();

    const Token = await hre.ethers.getContractFactory("MintableToken");
    const token = await Token.deploy(priceFeedMock.address);
    await token.deployed();

    console.log("Token deployed to:", token.address);
    console.log("Mock Price Feed deployed to:", priceFeedMock.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
