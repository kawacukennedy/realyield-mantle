const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AssetTokenizer", function () {
  let assetTokenizer;
  let owner, issuer;

  beforeEach(async function () {
    [owner, issuer] = await ethers.getSigners();
    const AssetTokenizer = await ethers.getContractFactory("AssetTokenizer");
    assetTokenizer = await AssetTokenizer.deploy();
    await assetTokenizer.waitForDeployment();
  });

  it("Should mint an asset", async function () {
    const uri = "ipfs://test";
    const proofHash = ethers.keccak256(ethers.toUtf8Bytes("proof"));
    const valuation = 1000000;
    const maturity = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

    await assetTokenizer.mintAsset(uri, issuer.address, proofHash, valuation, maturity);
    const asset = await assetTokenizer.assets(0);
    expect(asset.uri).to.equal(uri);
    expect(asset.issuer).to.equal(issuer.address);
  });

  it("Should lock asset for vault", async function () {
    // Mint first
    await assetTokenizer.mintAsset("ipfs://test", issuer.address, ethers.keccak256(ethers.toUtf8Bytes("proof")), 1000000, Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60);
    // Lock
    await assetTokenizer.connect(issuer).lockAssetForVault(0, "0x123");
    const asset = await assetTokenizer.assets(0);
    expect(asset.locked).to.be.true;
  });
});