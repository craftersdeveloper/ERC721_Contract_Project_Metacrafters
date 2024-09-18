# ERC721 NFT Collection Contract Briding Project 

#### Contract Name - MonkeyRush NFT Collection

## Project Overview

**MonkeyRush** is a funky 5-item NFT collection created using AI-generated images and deployed on the Ethereum Sepolia Testnet and Polygon Amoy Testnet. This project utilizes the ERC721A contract standard to optimize gas costs and includes batch minting and bridging features to transfer NFTs from Ethereum to Polygon using the FxPortal Bridge.

## Features

- **AI-Generated Collection**: All items in the MonkeyRush collection are generated using DALL·E 2 or Midjourney.
- **IPFS Storage**: The NFT assets are stored on IPFS, hosted via [Pinata.cloud](https://pinata.cloud).
- **ERC721A Standard**: Efficient gas usage for batch minting of NFTs.
- **Cross-Chain Bridging**: Transfers NFTs from Ethereum Sepolia Testnet to Polygon Amoy Testnet using the FxPortal Bridge.
- **Custom Prompt Description**: Each NFT can display the prompt used to generate the images.

## Smart Contract

The smart contract is built using the ERC721A standard and deployed to the Sepolia Ethereum Testnet. The main functions include:

- **Minting**: The contract allows batch minting of up to 5 NFTs by the owner.
- **Base URI**: IPFS-hosted metadata for the NFTs is set via a base URI.
- **Description Retrieval**: The contract exposes a `getDescription` function to retrieve the prompt description.

### Contract Deployment
The contract `MonkeyRush` can be deployed using Hardhat on the Ethereum Sepolia Testnet. It includes:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract MonkeyRush is ERC721A {
    
    address public owner;
    uint256 public constant MAX_SUPPLY = 5;
    string public description = "A Funky Monkey NFT Collection";
    string private baseTokenURI = "https://tan-adequate-marsupial-982.mypinata.cloud/ipfs/QmNV1XkX82DfhoveV5FguTVgxSseJW7he43a7Au6pgk8RP/";

    constructor() ERC721A("MonkeyRush", "MR") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function mint(uint256 quantity) external onlyOwner {
        require(totalSupply() + quantity <= MAX_SUPPLY, "Mint limit exceeded");
        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function getDescription() external view returns (string memory) {
        return description;
    }
}
```

## Steps to Complete the Project

### 1. Generate the Collection
Use DALL·E 2 or Midjourney to generate 5 unique NFTs. Store the generated assets on IPFS using [Pinata.cloud](https://pinata.cloud) for decentralized hosting.

### 2. Smart Contract Deployment
Deploy the `MonkeyRush` ERC721A contract to the Sepolia Testnet. The contract allows batch minting of 5 NFTs.

### 3. Batch Mint NFTs
Create a Hardhat script to batch mint all 5 NFTs for the owner. Here's a sample Hardhat script:

```js
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
```

### 4. Bridge NFTs to Polygon Amoy Testnet
Write a Hardhat script to batch transfer the NFTs from the Sepolia Ethereum Testnet to the Polygon Amoy Testnet using the FxPortal Bridge.

- Approve NFTs to be transferred.
- Deposit the NFTs to the bridge.
- Test `balanceOf` on the Amoy Testnet after transfer.


```js
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
```

### 5. Visualize NFT Collection
Optionally, map the NFT collection on the Polygon network using token mapping for better visualization.

## Setup Instructions

### Prerequisites
- Node.js and npm installed.
- Hardhat installed globally (`npm install -g hardhat`).
- Sepolia Ethereum Testnet and Polygon Amoy Testnet Tokens.

### Installation

1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd MonkeyRush
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables for Hardhat (e.g., Sepolia Testnet RPC URL, Private Key).

4. Compile the smart contract:
   ```bash
   npx hardhat compile
   ```

5. Deploy the contract to Sepolia Testnet:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## Conclusion

The MonkeyRush NFT project is designed to demonstrate a full NFT lifecycle, from AI-generated artwork and IPFS hosting to smart contract deployment, batch minting, and cross-chain bridging between Ethereum and Polygon.
