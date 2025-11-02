// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YieldDistributor is Ownable {
    ERC20 public rewardToken;

    struct Distribution {
        uint256 totalAmount;
        uint256 perShareAmount;
        uint256 timestamp;
        bool active;
    }

    mapping(address => mapping(address => uint256)) public userShares; // vault => user => shares
    mapping(address => Distribution[]) public distributions; // vault => distributions
    mapping(address => mapping(uint256 => bool)) public claimed; // user => distributionId => claimed

    uint256 public constant DISTRIBUTION_INTERVAL = 24 hours;

    event DistributionCreated(address indexed vault, uint256 distributionId, uint256 totalAmount);
    event YieldClaimed(address indexed user, address indexed vault, uint256 distributionId, uint256 amount);

    constructor(ERC20 _rewardToken) Ownable(msg.sender) {
        rewardToken = _rewardToken;
    }

    function distribute(address vault, uint256 totalYield) external onlyOwner {
        require(totalYield > 0, "No yield to distribute");

        // Calculate total shares in vault (simplified - would need vault integration)
        uint256 totalShares = 1000000; // Placeholder - get from vault contract

        uint256 perShareAmount = totalYield / totalShares;
        uint256 distributionId = distributions[vault].length;

        distributions[vault].push(Distribution({
            totalAmount: totalYield,
            perShareAmount: perShareAmount,
            timestamp: block.timestamp,
            active: true
        }));

        emit DistributionCreated(vault, distributionId, totalYield);
    }

    function claim(address user) external {
        // Simplified claim - in production would iterate through all vaults user is in
        address vault = msg.sender; // Simplified

        uint256 totalClaimable = 0;
        for (uint256 i = 0; i < distributions[vault].length; i++) {
            if (!claimed[user][i] && distributions[vault][i].active) {
                uint256 userShares = userShares[vault][user];
                uint256 claimAmount = userShares * distributions[vault][i].perShareAmount;
                totalClaimable += claimAmount;
                claimed[user][i] = true;
                emit YieldClaimed(user, vault, i, claimAmount);
            }
        }

        if (totalClaimable > 0) {
            rewardToken.transfer(user, totalClaimable);
        }
    }

    function getPendingYield(address user, address vault) external view returns (uint256) {
        uint256 totalPending = 0;
        for (uint256 i = 0; i < distributions[vault].length; i++) {
            if (!claimed[user][i] && distributions[vault][i].active) {
                uint256 userShares = userShares[vault][user];
                totalPending += userShares * distributions[vault][i].perShareAmount;
            }
        }
        return totalPending;
    }
}