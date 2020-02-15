pragma solidity ^0.5.16;

interface IMakerMedianizer {
    function read() external view returns (bytes32);
}
