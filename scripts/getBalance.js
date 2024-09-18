const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/MonkeyRush.sol/MonkeyRush.json");

const tokenAddress = process.env.ContractAddress;
const tokenABI = tokenContractJSON.abi;
const walletAddress = process.env.WalletAddress;

async function main() {
  try {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const balance = await token.balanceOf(walletAddress);
    console.log(`Polygon Amoy NFT Balance: ${balance} NFT`);
  } catch (error) {
    console.log("Deposited NFT Proccessing Delayed");
    process.exitCode = 1;
  }
}

main();
