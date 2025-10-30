// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AssetTokenizer.sol";
import "./ComplianceModule.sol";
import "./ZKModule.sol";

contract Vault is ERC4626, Ownable {
    AssetTokenizer public assetTokenizer;
    ComplianceModule public compliance;
    ZKModule public zkModule;

    mapping(uint256 => uint256) public assetDeposits; // tokenId => amount

    event AssetDeposited(uint256 indexed tokenId, uint256 amount, address indexed depositor);

    constructor(
        ERC20 _asset,
        AssetTokenizer _assetTokenizer,
        ComplianceModule _compliance,
        ZKModule _zkModule
    ) ERC4626(_asset) ERC20("Vault Share", "VSHARE") Ownable(msg.sender) {
        assetTokenizer = _assetTokenizer;
        compliance = _compliance;
        zkModule = _zkModule;
    }

    function depositAsset(uint256 tokenId, uint256 amount) external {
        require(compliance.isCompliant(msg.sender), "Not compliant");
        require(assetTokenizer.balanceOf(msg.sender, tokenId) >= amount, "Insufficient balance");

        assetTokenizer.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        assetDeposits[tokenId] += amount;

        emit AssetDeposited(tokenId, amount, msg.sender);
    }

    function withdrawAsset(uint256 tokenId, uint256 amount, bytes memory proof) external {
        require(zkModule.verifyWithdrawalProof(msg.sender, proof), "Invalid proof");
        require(assetDeposits[tokenId] >= amount, "Insufficient vault balance");

        assetDeposits[tokenId] -= amount;
        assetTokenizer.safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
    }

    // Override deposit to include compliance
    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(compliance.isCompliant(receiver), "Not compliant");
        return super.deposit(assets, receiver);
    }

    function mint(uint256 shares, address receiver) public override returns (uint256) {
        require(compliance.isCompliant(receiver), "Not compliant");
        return super.mint(shares, receiver);
    }
}