// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    uint public balance = 0;

    function deposit() public payable {
        balance += msg.value;
    }

    function withdraw(uint amount) public {
        require(balance >= amount, "Insufficient balance");
        payable(msg.sender).transfer(amount);
        balance -= amount;
    }
}
