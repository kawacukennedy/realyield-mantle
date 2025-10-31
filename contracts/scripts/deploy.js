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

  // Deploy ShareToken
  const ShareToken = await ethers.getContractFactory("ShareToken");
  const shareToken = await ShareToken.deploy("Share Token", "SHARE", await compliance.getAddress());
  await shareToken.waitForDeployment();
  console.log("ShareToken deployed to:", await shareToken.getAddress());

  // Deploy YieldDistributor
  const YieldDistributor = await ethers.getContractFactory("YieldDistributor");
  const yieldDistributor = await YieldDistributor.deploy(await shareToken.getAddress());
  await yieldDistributor.waitForDeployment();
  console.log("YieldDistributor deployed to:", await yieldDistributor.getAddress());

  // Deploy VaultContract
  const VaultContract = await ethers.getContractFactory("VaultContract");
  const vaultContract = await VaultContract.deploy(
    await assetTokenizer.getAddress(),
    await shareToken.getAddress(),
    await compliance.getAddress(),
    await yieldDistributor.getAddress(),
    await zkModule.getAddress()
  );
  await vaultContract.waitForDeployment();
  console.log("VaultContract deployed to:", await vaultContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });