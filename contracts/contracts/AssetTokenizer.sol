// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetTokenizer is ERC1155, Ownable {
    uint256 private _nextTokenId;

    struct Asset {
        string metadataURI;
        bytes32 commitmentHash;
        address custodian;
        bool settled;
    }

    mapping(uint256 => Asset) public assets;

    event AssetMinted(uint256 indexed tokenId, address indexed custodian, string metadataURI);

    constructor() ERC1155("") Ownable(msg.sender) {}

    function mintAsset(
        address to,
        uint256 amount,
        string memory metadataURI,
        bytes32 commitmentHash,
        address custodian
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId, amount, "");

        assets[tokenId] = Asset({
            metadataURI: metadataURI,
            commitmentHash: commitmentHash,
            custodian: custodian,
            settled: false
        });

        emit AssetMinted(tokenId, custodian, metadataURI);
        return tokenId;
    }

    function settleAsset(uint256 tokenId) external {
        require(msg.sender == assets[tokenId].custodian, "Only custodian can settle");
        assets[tokenId].settled = true;
    }

    function setURI(uint256 tokenId, string memory newURI) external onlyOwner {
        assets[tokenId].metadataURI = newURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return assets[tokenId].metadataURI;
    }
}