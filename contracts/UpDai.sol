pragma solidity ^0.5.16;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

/**
 * @notice UpDai erc20 token
 */
contract UpDai is ERC20Detailed, ERC20Mintable {
    constructor() public ERC20Detailed("UpDai", "UPDAI", 18) {}
}
