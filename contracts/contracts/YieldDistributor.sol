// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract YieldDistributor is Ownable {
    ERC20 public rewardToken;
    bytes32 public merkleRoot;
    mapping(uint256 => mapping(address => bool)) public claimed;

    event YieldDistributed(uint256 indexed period, bytes32 merkleRoot);

    constructor(ERC20 _rewardToken) Ownable(msg.sender) {
        rewardToken = _rewardToken;
    }

    function distributeYield(uint256 period, bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
        emit YieldDistributed(period, _merkleRoot);
    }

    function claimYield(uint256 period, address account, uint256 amount, bytes32[] calldata proof) external {
        require(!claimed[period][account], "Already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(account, amount));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof");
        claimed[period][account] = true;
        rewardToken.transfer(account, amount);
    }
}