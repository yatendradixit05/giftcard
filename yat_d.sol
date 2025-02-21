// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GiftCardToken {
    mapping(address => uint256) public balances;
    address public owner;

    event Issued(address indexed to, uint256 amount);
    event Redeemed(address indexed from, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function issue(address to, uint256 amount) external onlyOwner {
        balances[to] += amount;
        emit Issued(to, amount);
    }

    function redeem(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        emit Redeemed(msg.sender, amount);
    }
}
