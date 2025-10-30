// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ComplianceModule is Ownable {
    enum Role { None, Investor, Depositor, Custodian }

    mapping(address => bool) public kycApproved;
    mapping(address => Role) public roles;

    event KYCApproved(address indexed user);
    event RoleAssigned(address indexed user, Role role);

    constructor() Ownable(msg.sender) {}

    function approveKYC(address user) external onlyOwner {
        kycApproved[user] = true;
        emit KYCApproved(user);
    }

    function assignRole(address user, Role role) external onlyOwner {
        roles[user] = role;
        emit RoleAssigned(user, role);
    }

    function isCompliant(address user) external view returns (bool) {
        return kycApproved[user] && roles[user] != Role.None;
    }
}