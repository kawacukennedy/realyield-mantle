// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AssetTokenizer is ERC1155, Ownable {
    uint256 private _nextAssetId = 1;

    struct Asset {
        string metadataURI;
        address issuer;
        bytes attestationHash;
        uint256 valuation;
        uint256 maturity;
        bool locked;
        string assetType; // "invoice", "real-estate", "bond"
    }

    mapping(uint256 => Asset) public assets;
    mapping(address => bool) public complianceModules;

    event AssetMinted(uint256 indexed assetId, address indexed issuer, string metadataURI, bytes attestationHash);
    event ComplianceModuleSet(address indexed complianceModule, bool enabled);

    constructor() ERC1155("") Ownable(msg.sender) {}

    function setCompliance(address complianceModule) external onlyOwner {
        complianceModules[complianceModule] = true;
        emit ComplianceModuleSet(complianceModule, true);
    }

    function mintAsset(
        address owner,
        string memory metadataURI,
        bytes memory attestationHash
    ) external returns (uint256) {
        require(complianceModules[msg.sender] || msg.sender == owner(), "Not authorized");
        uint256 assetId = _nextAssetId++;

        // Parse metadataURI for asset details (simplified)
        // In production, this would parse JSON metadata
        assets[assetId] = Asset({
            metadataURI: metadataURI,
            issuer: owner,
            attestationHash: attestationHash,
            valuation: 0, // Would be parsed from metadata
            maturity: 0,  // Would be parsed from metadata
            locked: false,
            assetType: "invoice" // Default, would be parsed
        });

        _mint(owner, assetId, 1, "");
        emit AssetMinted(assetId, owner, metadataURI, attestationHash);
        return assetId;
    }

    function batchMintAsset(
        address[] memory owners,
        string[] memory metadataURIs
    ) external onlyOwner {
        require(owners.length == metadataURIs.length, "Mismatched arrays");
        for (uint256 i = 0; i < owners.length; i++) {
            mintAsset(owners[i], metadataURIs[i], "");
        }
    }

    function lockAssetForVault(uint256 assetId, address vault) external {
        require(msg.sender == assets[assetId].issuer || msg.sender == owner(), "Not authorized");
        assets[assetId].locked = true;
    }

    function getAsset(uint256 assetId) external view returns (Asset memory) {
        return assets[assetId];
    }

    function uri(uint256 assetId) public view override returns (string memory) {
        return assets[assetId].metadataURI;
    }
}