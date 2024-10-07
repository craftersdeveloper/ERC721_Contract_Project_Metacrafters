const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/MonkeyMarket.sol/MonkeyMarket.json");

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

    const tokenIds = [0, 1, 2, 3, 4];

    const approveTx = await tokenContract.setApprovalForAll(
      FxERC721RootTunnel,
      true
    );
    await approveTx.wait();
    console.log("Approval confirmed successfully.");
    console.log("Tokens transfer Process Initiated.");
    

    for (let i = 0; i < tokenIds.length; i++) {
      const depositTx = await fxContract.deposit(
        tokenAddress,
        walletAddress,
        tokenIds[i],
        "0x6556"
      );
      await depositTx.wait();
      console.log(`Token with ID ${tokenIds[i]} deposited`);
    }

    // Test balanceOf
    const balance = await tokenContract.balanceOf(walletAddress);
    console.log("Fetching balances for confirmation...");
    console.log(`You now have: ${balance} NFTs in your wallet For Sepolia Chain.`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
