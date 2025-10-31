const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VaultContract", function () {
  let vaultContract, assetTokenizer, shareToken, compliance, yieldDistributor, zkModule;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy dependencies
    const ComplianceModule = await ethers.getContractFactory("ComplianceModule");
    compliance = await ComplianceModule.deploy();
    await compliance.waitForDeployment();

    const ZKModule = await ethers.getContractFactory("ZKModule");
    zkModule = await ZKModule.deploy();
    await zkModule.waitForDeployment();

    const AssetTokenizer = await ethers.getContractFactory("AssetTokenizer");
    assetTokenizer = await AssetTokenizer.deploy();
    await assetTokenizer.waitForDeployment();

    const ShareToken = await ethers.getContractFactory("ShareToken");
    shareToken = await ShareToken.deploy("Share Token", "SHARE", await compliance.getAddress());
    await shareToken.waitForDeployment();

    const YieldDistributor = await ethers.getContractFactory("YieldDistributor");
    yieldDistributor = await YieldDistributor.deploy(await shareToken.getAddress());
    await yieldDistributor.waitForDeployment();

    const VaultContract = await ethers.getContractFactory("VaultContract");
    vaultContract = await VaultContract.deploy(
      await assetTokenizer.getAddress(),
      await shareToken.getAddress(),
      await compliance.getAddress(),
      await yieldDistributor.getAddress(),
      await zkModule.getAddress()
    );
    await vaultContract.waitForDeployment();

    // Attest user
    await compliance.attestKYC(user.address, "mock-attestation");
  });

  it("Should deposit asset and mint shares", async function () {
    // Mint asset
    const uri = "ipfs://test";
    const proofHash = ethers.keccak256(ethers.toUtf8Bytes("proof"));
    const valuation = 1000000;
    const maturity = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;
    await assetTokenizer.mintAsset(uri, user.address, proofHash, valuation, maturity);

    // Deposit
    await vaultContract.connect(user).depositAsset(0);
    expect(await shareToken.balanceOf(user.address)).to.equal(valuation);
  });

  it("Should request withdrawal", async function () {
    // Deposit first
    await assetTokenizer.mintAsset("ipfs://test", user.address, ethers.keccak256(ethers.toUtf8Bytes("proof")), 1000000, Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60);
    await vaultContract.connect(user).depositAsset(0);

    // Request withdrawal
    await vaultContract.connect(user).requestWithdrawal(500000);
    expect(await vaultContract.pendingWithdrawals(user.address)).to.equal(500000);
  });
});