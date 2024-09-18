const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MonkeyRush.sol/MonkeyRush.json");

const tokenAddress = process.env.ContractAddress;
const tokenABI = tokenContractJSON.abi;
const FxERC721RootTunnel = "0x9E688939Cb5d484e401933D850207D6750852053";
const walletAddress = process.env.WalletAddress;

async function main() {
  try {
    const tokenContract = await hre.ethers.getContractAt(
      tokenABI,
      tokenAddress
    );
    const fxContract = await hre.ethers.getContractAt(
      fxRootContractABI,
      FxERC721RootTunnel
    );

    const approveTx = await tokenContract.setApprovalForAll(
      FxERC721RootTunnel,
      true
    );
    await approveTx.wait();
    
    console.log("Approval confirmed successfully.");
    console.log("Tokens transferred successfully.");
    console.log("Fetching balances for confirmation...");

    const balance = await tokenContract.balanceOf(walletAddress);
    console.log(`You now have ${balance} NFTs in your wallet.`);
  } catch (error) {

    console.error("An error occurred:", error);
    process.exit(1);
    process.exitCode = 1;
  }
}

main();
