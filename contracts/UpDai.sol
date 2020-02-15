pragma solidity ^0.5.16;

<<<<<<< HEAD
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
=======
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
>>>>>>> 13400707dccb3ebc0148d5f8cf9c9b2eda98d8cf

/**
 * @notice UpDai erc20 token
 */
<<<<<<< HEAD
contract UpDai is ERC20Detailed, ERC20Mintable, ERC20Burnable {

=======
contract UpDai is ERC20Detailed, ERC20Mintable {
>>>>>>> 13400707dccb3ebc0148d5f8cf9c9b2eda98d8cf
    uint256 public version;

    constructor(uint256 _version)
        public
        ERC20Detailed("Down Dai", "DOWNDAI", 18)
    {
        version = _version;
    }
}
