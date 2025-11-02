const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AssetTokenizer", function () {
  let assetTokenizer, complianceModule;
  let owner, issuer, user;

  beforeEach(async function () {
    [owner, issuer, user] = await ethers.getSigners();

    // Deploy ComplianceModule first
    const ComplianceModule = await ethers.getContractFactory("ComplianceModule");
    complianceModule = await ComplianceModule.deploy();
    await complianceModule.waitForDeployment();

    const AssetTokenizer = await ethers.getContractFactory("AssetTokenizer");
    assetTokenizer = await AssetTokenizer.deploy();
    await assetTokenizer.waitForDeployment();

    // Set compliance module
    await assetTokenizer.setCompliance(complianceModule.target);
  });

  it("Should mint an ERC1155 asset", async function () {
    const metadataURI = "ipfs://test-metadata";
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("attestation"));

    // Add attestation for user
    await complianceModule.addAttestation(user.address, attestationHash);

    await assetTokenizer.connect(owner).mintAsset(user.address, metadataURI, attestationHash);

    const asset = await assetTokenizer.assets(1); // assetId starts at 1
    expect(asset.metadataURI).to.equal(metadataURI);
    expect(asset.issuer).to.equal(user.address);

    // Check ERC1155 balance
    const balance = await assetTokenizer.balanceOf(user.address, 1);
    expect(balance).to.equal(1);
  });

  it("Should batch mint assets", async function () {
    const metadataURIs = ["ipfs://test1", "ipfs://test2"];
    const owners = [user.address, issuer.address];

    await assetTokenizer.connect(owner).batchMintAsset(owners, metadataURIs);

    expect(await assetTokenizer.balanceOf(user.address, 1)).to.equal(1);
    expect(await assetTokenizer.balanceOf(issuer.address, 2)).to.equal(1);
  });

  it("Should lock asset for vault", async function () {
    // Mint first
    const metadataURI = "ipfs://test";
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("attestation"));
    await complianceModule.addAttestation(user.address, attestationHash);
    await assetTokenizer.connect(owner).mintAsset(user.address, metadataURI, attestationHash);

    // Lock
    await assetTokenizer.connect(user).lockAssetForVault(1, ethers.ZeroAddress);
    const asset = await assetTokenizer.assets(1);
    expect(asset.locked).to.be.true;
  });

  it("Should return correct URI", async function () {
    const metadataURI = "ipfs://test-uri";
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("attestation"));
    await complianceModule.addAttestation(user.address, attestationHash);
    await assetTokenizer.connect(owner).mintAsset(user.address, metadataURI, attestationHash);

    expect(await assetTokenizer.uri(1)).to.equal(metadataURI);
  });
});