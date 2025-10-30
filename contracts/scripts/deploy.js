const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ComplianceModule
  const ComplianceModule = await ethers.getContractFactory("ComplianceModule");
  const compliance = await ComplianceModule.deploy();
  await compliance.waitForDeployment();
  console.log("ComplianceModule deployed to:", await compliance.getAddress());

  // Deploy ZKModule
  const ZKModule = await ethers.getContractFactory("ZKModule");
  const zkModule = await ZKModule.deploy();
  await zkModule.waitForDeployment();
  console.log("ZKModule deployed to:", await zkModule.getAddress());

  // Deploy AssetTokenizer
  const AssetTokenizer = await ethers.getContractFactory("AssetTokenizer");
  const assetTokenizer = await AssetTokenizer.deploy();
  await assetTokenizer.waitForDeployment();
  console.log("AssetTokenizer deployed to:", await assetTokenizer.getAddress());

  // Deploy a mock ERC20 for the vault asset
  const MockERC20 = await ethers.getContractFactory("ERC20Mock");
  const asset = await MockERC20.deploy("Mock Asset", "MOCK");
  await asset.waitForDeployment();
  console.log("MockERC20 deployed to:", await asset.getAddress());

  // Deploy Vault
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy(asset.getAddress(), assetTokenizer.getAddress(), compliance.getAddress(), zkModule.getAddress());
  await vault.waitForDeployment();
  console.log("Vault deployed to:", await vault.getAddress());

  // Deploy YieldDistributor
  const YieldDistributor = await ethers.getContractFactory("YieldDistributor");
  const yieldDistributor = await YieldDistributor.deploy(vault.getAddress(), asset.getAddress());
  await yieldDistributor.waitForDeployment();
  console.log("YieldDistributor deployed to:", await yieldDistributor.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });