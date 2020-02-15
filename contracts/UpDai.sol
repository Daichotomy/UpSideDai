pragma solidity ^0.5.16;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

/**
 * @notice UpDai erc20 token
 */
contract UpDai is ERC20Detailed, ERC20Mintable {
    uint256 public version;

    constructor(uint256 _version)
        public
        ERC20Detailed("Down Dai", "DOWNDAI", 18)
    {
        version = _version;
    }
}
