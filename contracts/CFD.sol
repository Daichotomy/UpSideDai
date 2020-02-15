pragma solidity ^0.5.5;

import "@openzeppelin/contracts/math/SafeMath.sol";
//import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/IERC20.sol";
import "./IUniswapFactory.sol";
import "./interfaces/IUniswapExchange.sol";
import "./interfaces/IMakerMedianizer.sol";
import "./UpDai.sol";
import "./DownDai.sol";

contract CFD {
    using SafeMath for uint256;

    /**************** PROTOCOL CONFIGURATION ****************/
    // mainnet:
    // rinkeby:
    address makerMedianizer = "";
    // mainnet:
    // rinkeby:
    address uniswapExchange = "";
    // mainnet: 0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95
    // rinkeby: 0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36
    address uniswapFactory = "";
    // mainnet:
    // rinkeby:
    address daiToken = "";
    /********************************************************/

    address upDai;
    address downDai;
    uint256 public settlementDate;

    constructor(
        uint256 _settlementDate
    ) public {
        settlementDate = _settlementDate;

        upDai = address(new UpDai());
        downDai = address(new DownDai());
    }

    /**
     * @notice mint UP and DOWN DAI tokens
     */
    function mint(_underlyingAmount, _ethAmount) public payable {
        require(_ethAmount == msg.data, "CFD::error transfering ETH");
    }

    /**
     * @notice redeem a pair of UPDAI and DOWNDAI
     * @dev this function can be called before the settlement date, an equal amount of UPDAI and DOWNDAI should be deposited
     */
    function redeem(uint256 _redeemAmount) public {
        // collect UPDAI & DOWNDAI from redeemer
        require(
            IERC20(upDai).transferFrom(msg.sender, address(this), _redeemAmount),
            "CFD::failed UPDAI transfer"
        );
        require(
            IERC20(downDai).transferFrom(msg.sender, address(this), _redeemAmount),
            "CFD::failed DOWNDAI transfer"
        );

    }

    /**
     * @notice redeem UPDAI or DOWNDAI token
     * @dev this function can only be called after contract settlement
     */
    function redeemFinal(
        address _tokenToRedeem,
        uint256 _redeemAmount
    ) public {
        require(
            now >= settlementDate,
            "CFD::contract did not settle yet"
        );
        require(
            (_tokenToRedeem == upDai) || (_tokenToRedeem == downDai),
            "CFD::invalid token to redeem"
        );

        if(tokenToRedeem == upDai) {
            // UPDAI redeeming process
        }
        else {
            // DOWNDAI redeeming process
        }
    }
    
    /**
     * @notice get DAI price in USD
     * @dev this function get the DAI/USD price by getting the price of ETH/USD from Maker medianizer and dividing it by the price of ETH/DAI from Uniswap.
     */
    function GetDaiPriceUSD() public returns (uint256) {
        address uniswapExchangeAddress = IUniswapFactory(uniswapFactory).getExchange(daiToken);

        uint256 ethUsdPrice = uint256(IMakerMedianizer(makerMedianizer).read());
        //!!!!!!!!not sure about the following!!!!!!!
        uint256 ethDaiPrice = (
            (IUniswapExchange(uniswapExchangeAddress).getEthToTokenInputPrice(1)).div(IUniswapExchange(uniswapExchangeAddress).getTokenToEthOutputPrice(1))
        );
        return ethUsdPrice.div(ethDaiPrice);
    }

}