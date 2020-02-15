pragma solidity ^0.5.5;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

/**
 * @notice DownDai erc20 mock
 */
contract DownDai is ERC20Detailed, ERC20Mintable {

    uint256 public version;

    constructor(uint256 _version)
    public
    ERC20Detailed("Down Dai", "DOWNDAI", 18)
    {
        version = _version;
    }
}