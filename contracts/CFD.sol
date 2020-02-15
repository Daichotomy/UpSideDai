pragma solidity ^0.5.5;

import "@openzeppelin/contracts/math/SafeMath.sol";
//import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IUniswapFactory.sol";
import "./interfaces/IUniswapExchange.sol";
import "./interfaces/IMakerMedianizer.sol";
import "./UpDai.sol";
import "./DownDai.sol";

contract CFD {
    using SafeMath for uint256;

    /**************** PROTOCOL CONFIGURATION ****************/
    // mainnet:
    // rinkeby:
    address makerMedianizer;
    // mainnet: 0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95
    // rinkeby: 0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36
    address uniswapFactory;
    // mainnet:
    // rinkeby:
    address daiToken;
    /********************************************************/

    UpDai upDai;
    DownDai downDai;
    address uniswapUpDaiExchange;
    address uniswapDownDaiExchange;

    uint256 public leverage;
    uint256 public fee;
    uint256 public settlementDate;

    mapping(address => uint256) public providerLP;

    /**
     * @notice constructor
     * @param _makerMedianizer maker medianizer address
     * @param _uniswapFactory uniswap factory address
     * @param _daiToken maker medianizer address
     * @param _leverage leverage (1000000000000000x)
     * @param _fee payout fee
     * @param _settlementDate maker medianizer address
     * @param _version maker medianizer address
     */
    constructor(
        address _makerMedianizer,
        address _uniswapFactory,
        address _daiToken,
        uint256 _leverage,
        uint256 _fee,
        uint256 _settlementDate,
        uint256 _version
    ) public {
        makerMedianizer = _makerMedianizer;
        uniswapFactory = _uniswapFactory;
        daiToken = _daiToken;

        leverage = _leverage;
        fee = _fee;
        settlementDate = _settlementDate;

        upDai = new UpDai(_version);
        downDai = new DownDai(_version);

        uniswapUpDaiExchange = IUniswapFactory(uniswapFactory).createExchange(address(upDai));
        uniswapDownDaiExchange = IUniswapFactory(uniswapFactory).createExchange(address(downDai));
    }

    /**
     * @notice mint UP and DOWN DAI tokens
     * @param _underlyingAmount amount of DAI to deposit
     * @param _ethAmount amount of ETH as collateral for UP&DOWN DAI Uniswap pools
     */
    function mint(uint256 _underlyingAmount, uint256 _ethAmount) public payable {
        (uint256 upDaiCollateral, uint256 downDaiCollateral) = getETHCollateralRequirements(_underlyingAmount);

        require((_ethAmount == msg.value) && (_ethAmount == upDaiCollateral+downDaiCollateral), "CFD::error transfering ETH");
        require(
            IERC20(daiToken).transferFrom(msg.sender, address(this), _underlyingAmount),
            "CFD::error transfering underlying asset"
        );

        // mint UP&DOWN tokens
        upDai.mint(msg.sender, _underlyingAmount.div(2));
        downDai.mint(msg.sender, _underlyingAmount.div(2));

        // send liquidity to both uniswap pools
        uint256 upLP = IUniswapExchange(uniswapUpDaiExchange).addLiquidity.value(_ethAmount.div(2))(_ethAmount.div(2), _underlyingAmount.div(2), now+3600);
        uint256 downLP = IUniswapExchange(uniswapDownDaiExchange).addLiquidity.value(_ethAmount.div(2))(_ethAmount.div(2), _underlyingAmount.div(2), now+3600);
        providerLP[msg.sender] = providerLP[msg.sender].add(upLP.add(downLP));
    }

    /**
     * @notice redeem a pair of UPDAI and DOWNDAI
     * @dev this function can be called before the settlement date, an equal amount of UPDAI and DOWNDAI should be deposited
     */
    function redeem(uint256 _redeemAmount) public {
        // get DAI price
        uint256 daiUsdPrice = GetDaiPriceUSD();

        // burn UPDAI & DOWNDAI from redeemer
        upDai.burnFrom(msg.sender, _redeemAmount);
        downDai.burnFrom(msg.sender, _redeemAmount);

        // spread MONEY bitches
        _payout(msg.sender, _redeemAmount, _redeemAmount, daiUsdPrice, leverage, fee);
    }

    /**
     * @notice redeem UPDAI or DOWNDAI token
     * @dev this function can only be called after contract settlement
     */
    function redeemFinal() public {
        require(
            now >= settlementDate,
            "CFD::contract did not settle yet"
        );

        // get DAI price
        uint256 daiUsdPrice = GetDaiPriceUSD();

        // get upDai balance
        uint256 upDaiRedeemAmount = upDai.balanceOf(msg.sender);
        // get downDai balance
        uint256 downDaiRedeemAmount = downDai.balanceOf(msg.sender);

        // spread MONEY bitches
        _payout(msg.sender, upDaiRedeemAmount, downDaiRedeemAmount, daiUsdPrice, leverage, fee);

        // burn upDai
        upDai.burnFrom(msg.sender, upDaiRedeemAmount);
        // burn downDai
        downDai.burnFrom(msg.sender, downDaiRedeemAmount);
    }
    
    /**
     * @notice $ payout function $
     * @dev can only be called internally
     * @param redeemer redeemer address
     * @param upDai amount of UpDai
     * @param downDai amount of DownDai
     * @param p price of DAI in USD $$$
     * @param l leverage
     * @param f payout fee
     */
    function _payout(address redeemer, uint256 upDai, uint256 downDai, uint256 p, uint256 l, uint256 f) internal {
        uint256 cash = upDai.mul(uint256(1).add(p.sub(1)).mul(l)).mul(uint256(1).sub(f))
        + downDai.mul(uint256(1).sub(p.sub(1)).mul(l)).mul(uint256(1).sub(f));

        IERC20(daiToken).transfer(redeemer, cash);
    }

    /**
     * @notice get the amount of ETH required to create a uniswap exchange
     * @param _underlyingAmount the total amount of underlying to deposit (UP/DOWN DAI = _underlyingAmount/2)
     */
    function getETHCollateralRequirements(uint256 _underlyingAmount) public returns (uint256, uint256) {
        uint256 ethUsdPrice = uint256(IMakerMedianizer(makerMedianizer).read());
        uint256 daiUsdPrice = GetDaiPriceUSD();

        return (1,1);
    }
    
    /**
     * @notice get DAI price in USD
     * @dev this function get the DAI/USD price by getting the price of ETH/USD from Maker medianizer and dividing it by the price of ETH/DAI from Uniswap.
     */
    function GetDaiPriceUSD() public returns (uint256) {
        address uniswapExchangeAddress = IUniswapFactory(uniswapFactory).getExchange(daiToken);

        uint256 ethUsdPrice = uint256(IMakerMedianizer(makerMedianizer).read());
        uint256 ethDaiPrice = IUniswapExchange(uniswapExchangeAddress).getEthToTokenInputPrice(1 ether);
        
        return ethUsdPrice.div(ethDaiPrice);
    }

}