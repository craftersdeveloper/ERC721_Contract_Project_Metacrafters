// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "erc721a/contracts/ERC721A.sol";

contract MonkeyMarket is ERC721A {
    
    address public owner;
    uint256 public constant MAX_SUPPLY = 5;
    string public description = "A Funky Monkey NFT Collection";
    string private baseTokenURI =
        "https://tan-adequate-marsupial-982.mypinata.cloud/ipfs/QmNV1XkX82DfhoveV5FguTVgxSseJW7he43a7Au6pgk8RP/";

    constructor() ERC721A("MonkeyMarket", "MM") {
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
