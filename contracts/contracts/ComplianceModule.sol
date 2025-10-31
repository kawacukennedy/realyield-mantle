// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ComplianceModule is Ownable {
    mapping(address => bytes) public attestations;

    event KYCAttested(address indexed wallet, bytes32 attestationHash);

    constructor() Ownable(msg.sender) {}

    function attestKYC(address wallet, bytes memory attestation) external onlyOwner {
        attestations[wallet] = attestation;
        emit KYCAttested(wallet, keccak256(attestation));
    }

    function verifyAttestation(address wallet, bytes memory attestation) external view returns (bool) {
        return keccak256(attestations[wallet]) == keccak256(attestation);
    }
}