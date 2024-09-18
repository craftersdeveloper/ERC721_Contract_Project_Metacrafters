const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("MonkeyRush");
  console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
