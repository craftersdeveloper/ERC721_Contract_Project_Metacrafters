const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const contractAddress = process.env.ContractAddress;

  const networkAddress =
    "https://eth-sepolia.g.alchemy.com/v2/xISVy20DszdNw5uakCDIhIsegXfROLT1";

  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const signer = new ethers.Wallet(privateKey, provider);


  const MonkeyRush = await ethers.getContractFactory("MonkeyRush", signer);
  const contract = await MonkeyRush.attach(contractAddress);

  await contract.mint(5);
  console.log("Successfully minted 5 tokens.");
  console.log(`Tokens minted through contract address: ${contractAddress}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
