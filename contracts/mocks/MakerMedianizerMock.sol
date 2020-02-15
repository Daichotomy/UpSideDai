pragma solidity ^0.5.5;

contract MakerMedianizerMock {
    uint256 val;

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
