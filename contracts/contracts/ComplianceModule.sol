// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ComplianceModule is Ownable {
    struct Attestation {
        bytes attestationHash;
        uint256 expiry;
        string jurisdiction;
        bool revoked;
        uint256 createdAt;
    }

    mapping(address => Attestation) public attestations;
    mapping(address => bool) public authorizedAttestors;

    event AttestationAdded(address indexed user, bytes attestationHash, string jurisdiction);
    event AttestationRevoked(address indexed user);
    event AttestorAuthorized(address indexed attestor, bool authorized);

    constructor() Ownable(msg.sender) {}

    function authorizeAttestor(address attestor, bool authorized) external onlyOwner {
        authorizedAttestors[attestor] = authorized;
        emit AttestorAuthorized(attestor, authorized);
    }

    function addAttestation(address user, bytes memory attestationHash) external {
        require(authorizedAttestors[msg.sender] || msg.sender == owner(), "Not authorized");
        require(attestations[user].attestationHash.length == 0 || attestations[user].revoked, "Already attested");

        // Parse attestation for expiry and jurisdiction (simplified)
        uint256 expiry = block.timestamp + 365 days; // 1 year default
        string memory jurisdiction = "US"; // Default

        attestations[user] = Attestation({
            attestationHash: attestationHash,
            expiry: expiry,
            jurisdiction: jurisdiction,
            revoked: false,
            createdAt: block.timestamp
        });

        emit AttestationAdded(user, attestationHash, jurisdiction);
    }

    function isCompliant(address user) external view returns (bool) {
        Attestation memory att = attestations[user];
        return att.attestationHash.length > 0 &&
               !att.revoked &&
               att.expiry > block.timestamp;
    }

    function revoke(address user) external onlyOwner {
        require(attestations[user].attestationHash.length > 0, "No attestation");
        attestations[user].revoked = true;
        emit AttestationRevoked(user);
    }

    function getAttestation(address user) external view returns (
        bytes memory attestationHash,
        uint256 expiry,
        string memory jurisdiction,
        bool revoked,
        uint256 createdAt
    ) {
        Attestation memory att = attestations[user];
        return (att.attestationHash, att.expiry, att.jurisdiction, att.revoked, att.createdAt);
    }
}