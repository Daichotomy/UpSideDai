pragma solidity ^0.5.16;

contract MakerMedianizerMock {
    bytes32 val = 0x00000000000000000000000000000000000000000000000e60e0033988bb8000; // $1 == 1e8

    constructor() public {
        // val = _etherPrice;
    }

    function read() external view returns (bytes32) {
        return val;
    }

    function poke(uint256 _etherPrice) public {
        val = bytes32(_etherPrice);
    }
}
