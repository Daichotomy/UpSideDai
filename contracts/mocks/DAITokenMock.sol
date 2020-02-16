pragma solidity ^0.5.16;

import {
    ERC20Mintable
} from "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import {
    ERC20Detailed
} from "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @notice ERC20 token mock
 */
contract DAITokenMock is ERC20Detailed, ERC20Mintable {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _supplySimple
    ) public ERC20Detailed(_name, _symbol, 18) {
        mint(msg.sender, _supplySimple * (10**18));
    }
}
