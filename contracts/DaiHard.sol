pragma solidity ^0.5.16;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./CFD.sol";

/**
 * @notice DaiHard contract
 * @dev Just a CFD factory
 */
contract DaiHard is Ownable {
    mapping(uint256 => address) public deployedCFD;

    event CFDeployed(
        address indexed CFD,
        uint256 creationDate,
        uint256 indexed settlementDate,
        uint256 indexed version
    );

    /**
     * @notice deploy a new CFD
     * @param _makerMedianizer maker medianizer address
     * @param _uniswapFactory uniswap factory address
     * @param _daiToken maker medianizer address
<<<<<<< HEAD
     * @param _leverage leverage (1000000000000000x)
     * @param _fee payout fee
     * @param _settlementDate maker medianizer address
=======
     * @param _settlementLength maker medianizer address
>>>>>>> 13400707dccb3ebc0148d5f8cf9c9b2eda98d8cf
     * @param _version maker medianizer address
     */
    function newCFD(
        address _makerMedianizer,
        address _uniswapFactory,
        address _daiToken,
<<<<<<< HEAD
        uint256 _leverage,
        uint256 _fee,
        uint256 _settlementDate,
=======
        uint256 _settlementLength,
>>>>>>> 13400707dccb3ebc0148d5f8cf9c9b2eda98d8cf
        uint256 _version
    ) public onlyOwner {
        require(
            _makerMedianizer != address(0),
            "CFD::invalid maker medianizer address"
        );
        require(
            _uniswapFactory != address(0),
            "CFD::invalid uniswap factory address"
        );
        require(_daiToken != address(0), "CFD::invalid DAI token address");
<<<<<<< HEAD
        require(_leverage > 0, "CFD::invalid leverage");
        require(_settlementDate > now, "DaiHard::invalid settlement timestamp");

        deployedCFD[_version] = address(new CFD(_makerMedianizer, _uniswapFactory, _daiToken, _leverage, _fee, _version, _settlementDate));
=======
        require(_settlementLength > 0, "DaiHard::invalid settlement timestamp");

        uint256 settlementDate = now + _settlementLength;

        deployedCFD[_version] = address(
            new CFD(
                _makerMedianizer,
                _uniswapFactory,
                _daiToken,
                _version,
                settlementDate
            )
        );
>>>>>>> 13400707dccb3ebc0148d5f8cf9c9b2eda98d8cf

        emit CFDeployed(deployedCFD[_version], now, settlementDate, _version);
    }

}
