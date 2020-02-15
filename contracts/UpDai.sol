pragma solidity ^0.5.5;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";

/**
 * @notice UpDai erc20 token
 */
contract UpDai is ERC20Detailed, ERC20Mintable, ERC20Burnable {

    uint256 public version;

    constructor(uint256 _version)
    public
    ERC20Detailed("Down Dai", "DOWNDAI", 18)
    {
        version = _version;
    }
}