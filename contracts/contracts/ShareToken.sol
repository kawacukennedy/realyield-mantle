// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ComplianceModule.sol";

contract ShareToken is ERC20Permit, Ownable {
    ComplianceModule public compliance;

    constructor(string memory name, string memory symbol, ComplianceModule _compliance)
        ERC20(name, symbol)
        ERC20Permit(name)
        Ownable(msg.sender)
    {
        compliance = _compliance;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        if (from != address(0) && to != address(0)) {
            require(compliance.verifyAttestation(from, ""), "From not compliant"); // Placeholder, need attestation
            require(compliance.verifyAttestation(to, ""), "To not compliant");
        }
    }
}