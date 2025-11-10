// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MantleDA
 * @dev Integration with Mantle Data Availability layer for storing metadata and proofs
 */
contract MantleDA {
    event DataStored(bytes32 indexed dataHash, string dataType, uint256 timestamp);
    event ProofVerified(bytes32 indexed proofHash, bool valid);

    // Mock DA storage - in production, this would interface with Mantle DA SDK
    mapping(bytes32 => bool) public storedData;
    mapping(bytes32 => string) public dataTypes;

    /**
     * @dev Store data hash on Mantle DA
     * @param dataHash Hash of the data to store
     * @param dataType Type of data (metadata, proof, etc.)
     */
    function storeData(bytes32 dataHash, string memory dataType) external {
        require(!storedData[dataHash], "Data already stored");

        storedData[dataHash] = true;
        dataTypes[dataHash] = dataType;

        // In production: call Mantle DA SDK to store data
        // mantleDA.store(dataHash, dataType);

        emit DataStored(dataHash, dataType, block.timestamp);
    }

    /**
     * @dev Verify data exists on Mantle DA
     * @param dataHash Hash to verify
     * @return bool True if data exists
     */
    function verifyData(bytes32 dataHash) external view returns (bool) {
        return storedData[dataHash];
    }

    /**
     * @dev Store ZK proof on Mantle DA
     * @param proofHash Hash of the ZK proof
     */
    function storeProof(bytes32 proofHash) external {
        require(!storedData[proofHash], "Proof already stored");

        storedData[proofHash] = true;
        dataTypes[proofHash] = "zk-proof";

        // In production: call Mantle DA SDK
        // mantleDA.storeProof(proofHash);

        emit ProofVerified(proofHash, true);
    }

    /**
     * @dev Get data type for a hash
     * @param dataHash Hash to query
     * @return string Data type
     */
    function getDataType(bytes32 dataHash) external view returns (string memory) {
        return dataTypes[dataHash];
    }
}