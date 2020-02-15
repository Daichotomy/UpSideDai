pragma solidity ^0.5.5;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./CFD.sol";

/**
 * @notice DaiHard contract
 * @dev Just a CFD factory
 */
contract DaiHard is Ownable {

    address deployedCFD;

    event CFDeployed(
        address indexed CFD,
        uint256 creationDate,
        uint256 indexed settlementDate,
        uint256 indexed version
    );

    constructor() public {
        deployedCFD = address(0);
    }

    /**
     * @notice deploy a new CFD
     * @param _makerMedianizer maker medianizer address
     * @param _uniswapFactory uniswap factory address
     * @param _daiToken maker medianizer address
     * @param _settlementDate maker medianizer address
     * @param _version maker medianizer address
     */
    function newCFD(
        address _makerMedianizer,
        address _uniswapFactory,
        address _daiToken,
        uint256 _settlementDate,
        uint256 _version
    ) public onlyOwner {
        require(_makerMedianizer != address(0), "CFD::invalid maker medianizer address");
        require(_uniswapFactory != address(0), "CFD::invalid uniswap factory address");
        require(_daiToken != address(0), "CFD::invalid DAI token address");
        require(_settlementDate > now, "DaiHard::invalid settlement timestamp");

        deployedCFD = address(new CFD(_makerMedianizer, _uniswapFactory, _daiToken, _version, _settlementDate));

        emit CFDeployed(deployedCFD, now, _settlementDate, _version);
    }

}