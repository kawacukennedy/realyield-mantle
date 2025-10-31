// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetTokenizer is Ownable {
    uint256 private _nextAssetId;

    struct Asset {
        string uri;
        address issuer;
        bytes32 proofHash;
        uint256 valuation;
        uint256 maturity;
        bool locked;
    }

    mapping(uint256 => Asset) public assets;

    event AssetMinted(uint256 indexed assetId, address indexed issuer, string uri);

    constructor() Ownable(msg.sender) {}

    function mintAsset(
        string memory uri,
        address issuer,
        bytes32 proofHash,
        uint256 valuation,
        uint256 maturity
    ) external onlyOwner returns (uint256) {
        uint256 assetId = _nextAssetId++;
        assets[assetId] = Asset({
            uri: uri,
            issuer: issuer,
            proofHash: proofHash,
            valuation: valuation,
            maturity: maturity,
            locked: false
        });

        emit AssetMinted(assetId, issuer, uri);
        return assetId;
    }

    function lockAssetForVault(uint256 assetId, address vault) external {
        require(msg.sender == assets[assetId].issuer || msg.sender == owner(), "Not authorized");
        assets[assetId].locked = true;
    }
}