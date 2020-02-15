pragma solidity ^0.5.16;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./CFD.sol";

/**
 * @notice DaiHard contract
 * @dev Just a CFD factory
 */
contract DaiHard is Ownable {
    address deployedCFD;

    event CFDeployed(
        address indexed CFD,
        uint256 indexed creationDate,
        uint256 indexed settlementDate
    );

    constructor() public {
        deployedCFD = address(0);
    }

    function newCFD(
        address _makerMedianizer,
        address _uniswapFactory,
        address _uniswapExchange,
        address _dai,
        uint256 _settlementDate
    ) public onlyOwner {
        require(_settlementDate > now, "DaiHard::invalid settlement timestamp");

        deployedCFD = address(
            new CFD(
                _makerMedianizer,
                _uniswapFactory,
                _uniswapExchange,
                _dai,
                _settlementDate
            )
        );

        emit CFDeployed(deployedCFD, now, _settlementDate);
    }

}
