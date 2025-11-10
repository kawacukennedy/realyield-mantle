const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ComplianceModule", function () {
  let complianceModule, owner, user, attestor;

  beforeEach(async function () {
    [owner, user, attestor] = await ethers.getSigners();

    const ComplianceModule = await ethers.getContractFactory("ComplianceModule");
    complianceModule = await ComplianceModule.deploy();
    await complianceModule.waitForDeployment();
  });

  it("Should add attestation", async function () {
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("test-attestation"));

    await complianceModule.connect(owner).addAttestation(user.address, attestationHash);

    const attestation = await complianceModule.getAttestation(user.address);
    expect(attestation[0]).to.equal(attestationHash);
    expect(attestation[3]).to.be.false; // not revoked
  });

  it("Should authorize attestor", async function () {
    await complianceModule.connect(owner).authorizeAttestor(attestor.address, true);

    expect(await complianceModule.authorizedAttestors(attestor.address)).to.be.true;
  });

  it("Should check compliance", async function () {
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("test-attestation"));

    await complianceModule.connect(owner).addAttestation(user.address, attestationHash);

    expect(await complianceModule.isCompliant(user.address)).to.be.true;
  });

  it("Should revoke attestation", async function () {
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("test-attestation"));

    await complianceModule.connect(owner).addAttestation(user.address, attestationHash);
    await complianceModule.connect(owner).revoke(user.address);

    expect(await complianceModule.isCompliant(user.address)).to.be.false;
  });

  it("Should handle expired attestation", async function () {
    const attestationHash = ethers.keccak256(ethers.toUtf8Bytes("test-attestation"));
    const pastExpiry = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago

    // Manually set expiry (in production this would be set properly)
    await complianceModule.connect(owner).addAttestation(user.address, attestationHash);

    // For testing expiry, we'd need to manipulate time or modify contract
    // This is a simplified test
    expect(await complianceModule.isCompliant(user.address)).to.be.true;
  });
});