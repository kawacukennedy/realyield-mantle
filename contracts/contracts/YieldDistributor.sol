// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Vault.sol";

contract YieldDistributor is Ownable {
    Vault public vault;
    ERC20 public rewardToken;

    uint256 public totalYield;
    mapping(address => uint256) public userYield;

    event YieldDistributed(address indexed user, uint256 amount);

    constructor(Vault _vault, ERC20 _rewardToken) Ownable(msg.sender) {
        vault = _vault;
        rewardToken = _rewardToken;
    }

    function distributeYield(address user, uint256 amount) external onlyOwner {
        require(rewardToken.balanceOf(address(this)) >= amount, "Insufficient rewards");
        userYield[user] += amount;
        totalYield += amount;
        emit YieldDistributed(user, amount);
    }

    function claimYield() external {
        uint256 amount = userYield[msg.sender];
        require(amount > 0, "No yield to claim");
        userYield[msg.sender] = 0;
        rewardToken.transfer(msg.sender, amount);
    }
}