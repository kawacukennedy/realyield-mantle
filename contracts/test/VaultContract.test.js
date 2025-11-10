const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VaultContract", function () {
  let vaultContract, mockAsset, compliance, yieldDistributor, zkModule;
  let owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy mock ERC20 asset
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    mockAsset = await MockERC20.deploy("Mock Asset", "MOCK");
    await mockAsset.waitForDeployment();

    // Deploy dependencies
    const ComplianceModule = await ethers.getContractFactory("ComplianceModule");
    compliance = await ComplianceModule.deploy();
    await compliance.waitForDeployment();

    const ZKModule = await ethers.getContractFactory("ZKModule");
    zkModule = await ZKModule.deploy();
    await zkModule.waitForDeployment();

    const YieldDistributor = await ethers.getContractFactory("YieldDistributor");
    yieldDistributor = await YieldDistributor.deploy(await mockAsset.getAddress());
    await yieldDistributor.waitForDeployment();

    const VaultContract = await ethers.getContractFactory("VaultContract");
    vaultContract = await VaultContract.deploy(
      await mockAsset.getAddress(),
      await compliance.getAddress(),
      await yieldDistributor.getAddress(),
      await zkModule.getAddress(),
      "Real Estate", // strategy
      3, // risk score
      "Test Custodian" // custodian
    );
    await vaultContract.waitForDeployment();

    // Attest user for compliance
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("attestation"));
    await compliance.addAttestation(user.address, attestationHash);

    // Mint some tokens to user
    await mockAsset.mint(user.address, ethers.parseEther("1000"));
    await mockAsset.connect(user).approve(await vaultContract.getAddress(), ethers.parseEther("1000"));
  });

  it("Should deposit assets and mint shares", async function () {
    const depositAmount = ethers.parseEther("100");

    // Deposit
    await vaultContract.connect(user).deposit(depositAmount, user.address);

    // Check shares were minted
    const shares = await vaultContract.balanceOf(user.address);
    expect(shares).to.be.gt(0);

    // Check TVL increased
    const tvl = await vaultContract.totalValueLocked();
    expect(tvl).to.equal(depositAmount);
  });

  it("Should request withdrawal", async function () {
    const depositAmount = ethers.parseEther("100");

    // Deposit first
    await vaultContract.connect(user).deposit(depositAmount, user.address);

    const shares = await vaultContract.balanceOf(user.address);

    // Request withdrawal
    await vaultContract.connect(user).requestWithdrawal(shares);
    expect(await vaultContract.pendingWithdrawals(user.address)).to.equal(shares);
  });
});