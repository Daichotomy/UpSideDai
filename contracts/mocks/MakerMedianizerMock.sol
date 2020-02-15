pragma solidity ^0.5.16;

contract MakerMedianizerMock {
    uint256 val; // $1 == 1e8

    constructor(uint256 _etherPrice) public {
        val = _etherPrice;
    }

    function read() external view returns (bytes32) {
        return bytes32(val);
    }

    function poke(uint256 _etherPrice) public {
        val = _etherPrice;
    }
}
