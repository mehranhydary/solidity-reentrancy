pragma solidity ^0.6.10;

contract EtherStoreReentrancyProof {
    mapping(address => uint256) public balances;
    bool locked;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    modifier noReentrant() {
        // adding a modifier to lock contract
        // while functions are being run
        require(!locked, "No re-entrancy");
        locked = true;
        _;
        locked = false;
    }

    function withdraw(uint256 _amount) public noReentrant {
        require(balances[msg.sender] >= _amount);
        // Update balance before you actually move the ether around
        balances[msg.sender] -= _amount;
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
