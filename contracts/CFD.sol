pragma solidity ^0.5.16;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IUniswapFactory.sol";
import "./interfaces/IUniswapExchange.sol";
import "./interfaces/IMakerMedianizer.sol";
import "./tokens/UpDai.sol";
import "./tokens/DownDai.sol";
import "./StableMath.sol";

contract CFD {
    using StableMath for uint256;

    /**************** PROTOCOL CONFIGURATION ****************/
    address public makerMedianizer;
    address public uniswapFactory;
    address public daiToken;
    /********************************************************/

    UpDai public upDai;
    DownDai public downDai;
    address public uniswapUpDaiExchange;
    address public uniswapDownDaiExchange;

    uint256 public leverage; // 1x leverage == 1e18
    uint256 public fee; // 100% fee == 1e18, 0.3% fee == 3e15
    uint256 public settlementDate; // In seconds

    bool public inSettlementPeriod = false;

    mapping(address => uint256) public providerLP; // Total LP for a given staker
    uint256 totalLP;

    /**
     * @notice constructor
     * @param _makerMedianizer maker medianizer address
     * @param _uniswapFactory uniswap factory address
     * @param _daiToken maker medianizer address
     * @param _leverage leverage (1000000000000000x) (1x == 1e18)
     * @param _fee payout fee (1% == 1e16)
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

        uniswapUpDaiExchange = IUniswapFactory(uniswapFactory).createExchange(
            address(upDai)
        );
        uniswapDownDaiExchange = IUniswapFactory(uniswapFactory).createExchange(
            address(downDai)
        );
    }

    /***************************************
                    MODIFIERS
    ****************************************/

    modifier notInSettlementPeriod() {
        require(!inSettlementPeriod, "Must not be in settlement period");
        if (settlementDate > now) {
            // settle
        }
        _;
    }

    modifier onlyInSettlementPeriod() {
        require(inSettlementPeriod, "Must be in settlement period");
        _;
    }

    /***************************************
              LIQUIDITY PROVIDERS
    ****************************************/

    /**
     * @notice mint UP and DOWN DAI tokens
     * @param _underlyingAmount amount of DAI to deposit
     * @param _ethAmount amount of ETH as collateral for UP&DOWN DAI Uniswap pools
     */
    function mint(uint256 _underlyingAmount, uint256 _ethAmount)
        external
        payable
        notInSettlementPeriod
    {
        (uint256 upDaiCollateral, uint256 downDaiCollateral) = getETHCollateralRequirements(
            _underlyingAmount
        );

        require(
            (_ethAmount == msg.value) &&
                (_ethAmount == upDaiCollateral + downDaiCollateral),
            "CFD::error transfering ETH"
        );
        require(
            IERC20(daiToken).transferFrom(
                msg.sender,
                address(this),
                _underlyingAmount
            ),
            "CFD::error transfering underlying asset"
        );

        // mint UP&DOWN tokens
        upDai.mint(msg.sender, _underlyingAmount.div(2));
        downDai.mint(msg.sender, _underlyingAmount.div(2));

        // send liquidity to both uniswap pools
        uint256 upLP = IUniswapExchange(uniswapUpDaiExchange)
            .addLiquidity
            .value(upDaiCollateral)(
            upDaiCollateral,
            _underlyingAmount.div(2),
            now + 3600
        );
        uint256 downLP = IUniswapExchange(uniswapDownDaiExchange)
            .addLiquidity
            .value(downDaiCollateral)(
            downDaiCollateral,
            _underlyingAmount.div(2),
            now + 3600
        );
        uint256 newLP = upLP.add(downLP);
        providerLP[msg.sender] = providerLP[msg.sender].add(newLP);
        totalLP = totalLP.add(newLP);
    }

    /**
     * @notice get the amount of ETH required to create a uniswap exchange
     * @param _underlyingAmount the total amount of underlying to deposit (UP/DOWN DAI = _underlyingAmount/2)
     * @return the amount of ETH needed for UPDAI pool and DOWNDAI pool
     */
    function getETHCollateralRequirements(uint256 _underlyingAmount)
        public
        view
        returns (uint256, uint256)
    {
        // TODO - validate that everything is denominated in the right decimal amounts
        // by running through an actual example with numbers on each step

        // get ETH price, where $200 == 200e18
        uint256 ethUsdPrice = GetETHUSDPriceFromMedianizer();
        // get DAI price, where $1 == 1e18
        uint256 daiUsdPrice = GetDaiPriceUSD();

        // // get the price of 1 UPDAI in DAI, where 1:1 == 1e18
        // uint256 upDaiDaiPrice = uint256(1e18).add(daiUsdPrice.sub(1)).mul(
        //     leverage
        // );
        // // get the price of 1 DOWNDAI in DAI
        // uint256 downDaiDaiPrice = uint256(1).sub(daiUsdPrice.sub(1)).mul(
        //     leverage
        // );
        // // ETH amount needed for the UPDAI pool
        // uint256 upDaiPoolEth = ((_underlyingAmount.div(2)).mul(upDaiDaiPrice))
        //     .div(ethUsdPrice);
        // // ETH amount needed for the DOWNDAI pool
        // uint256 downDaiPoolEth = (
        //     (_underlyingAmount.div(2)).mul(downDaiDaiPrice)
        // )
        //     .div(ethUsdPrice);
        return (1, 1);
    }

    function claimRewards() external onlyInSettlementPeriod {
        // 1. Claim Redemption Fees (proportionate to LP)
        // 2. Redeem or withdraw LP
        // 3. Claim rDAI interest?
    }

    /***************************************
                PUBLIC REDEPTION
    ****************************************/

    /**
     * @notice redeem a pair of UPDAI and DOWNDAI
     * @dev this function can be called before the settlement date, an equal amount of UPDAI and DOWNDAI should be deposited
     */
    function redeem(uint256 _redeemAmount) public notInSettlementPeriod {
        // get DAI price
        uint256 daiUsdPrice = GetDaiPriceUSD();

        // burn UPDAI & DOWNDAI from redeemer
        upDai.burnFrom(msg.sender, _redeemAmount);
        downDai.burnFrom(msg.sender, _redeemAmount);

        // spread MONEY bitches
        _payout(
            msg.sender,
            _redeemAmount,
            _redeemAmount,
            daiUsdPrice,
            leverage,
            fee
        );
    }

    /**
     * @notice redeem UPDAI or DOWNDAI token
     * @dev this function can only be called after contract settlement
     */
    function redeemFinal() public onlyInSettlementPeriod {
        require(now >= settlementDate, "CFD::contract did not settle yet");

        // get DAI price
        uint256 daiUsdPrice = GetDaiPriceUSD();

        // get upDai balance
        uint256 upDaiRedeemAmount = upDai.balanceOf(msg.sender);
        // get downDai balance
        uint256 downDaiRedeemAmount = downDai.balanceOf(msg.sender);

        // spread MONEY bitches
        _payout(
            msg.sender,
            upDaiRedeemAmount,
            downDaiRedeemAmount,
            daiUsdPrice,
            leverage,
            fee
        );

        // burn upDai
        upDai.burnFrom(msg.sender, upDaiRedeemAmount);
        // burn downDai
        downDai.burnFrom(msg.sender, downDaiRedeemAmount);
    }

    /***************************************
              INTERNAL - PAYOUT
    ****************************************/

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
    function _payout(
        address redeemer,
        uint256 upDai,
        uint256 downDai,
        uint256 p,
        uint256 l,
        uint256 f
    ) internal {
        // daiReturnedLong=upDaiToRedeem(1+(DaiPriceFeed-1)Leverage)(1-fee)
        // daiReturnedShort=downDaiToRedeem(1-(DaiPriceFeed-1)Leverage)(1-fee)

        // TODO - switch out small numbers for `exact` numbers (i.e. 1 == 1e18), to avoid rounding errors
        // occurring in things like `uint256(1).sub(f)`.. this is always going to be 0

        uint256 cash = upDai.mul(uint256(1).add(p.sub(1)).mul(l)).mul(
            uint256(1).sub(f)
        ) +
            downDai.mul(uint256(1).sub(p.sub(1)).mul(l)).mul(uint256(1).sub(f));

        IERC20(daiToken).transfer(redeemer, cash);
    }

    /***************************************
                  PRICE HELPERS
    ****************************************/

    /**
     * @notice Based on the price of DAI, what are the current exchange rates for upDai and downDai?
     */
    function _getCurrentDaiRates(uint256 daiUsdPrice)
        private
        view
        returns (uint256 upDaiRate, uint256 downDaiRate)
    {
        // (1 + ((DaiPriceFeed-1) *  Leverage))
        // Given that price is reflected absolutely on both sides.. then
        // (1 + (delta * leverage)), to find the up multiplier
        uint256 one = 1e18;
        bool priceIsPositive = daiUsdPrice > one;
        // Get price delta, e.g. if daiUsdPrice == 99e16, delta == 1e16
        uint256 delta = priceIsPositive
            ? daiUsdPrice.sub(one)
            : one.sub(daiUsdPrice);
        // Consider 20x leverage == 20e18 == 2e19, then
        // e.g. 1e16 * 2e19 == 2e35, then truncate to 2e17
        uint256 deltaWithLeverage = delta.mulTruncate(leverage);
        // e.g. 1e18 + 2e17 = 12e17
        uint256 winRate = one.add(deltaWithLeverage);
        if (winRate >= 2) {
            // TODO - the contract is now over.. this should be settlement time
        }
        // e.g. 1e18 - 2e17 = 8e17
        uint256 loseRate = one.sub(deltaWithLeverage);
        // If price is positive, upDaiRate should be better :)
        return priceIsPositive ? (winRate, loseRate) : (loseRate, winRate);
    }

    /**
     * @notice get DAI price in USD
     * @dev this function get the DAI/USD price by getting the price of ETH/USD from Maker medianizer and dividing it by the price of ETH/DAI from Uniswap.
     * @return relativePrice of DAI with regards to USD peg, where 1:1 == 1e18
     */
    function GetDaiPriceUSD() public view returns (uint256 relativePrice) {
        address uniswapExchangeAddress = IUniswapFactory(uniswapFactory)
            .getExchange(daiToken);

        // ethUsdPrice, where $1 == 1e18
        uint256 ethUsdPrice = GetETHUSDPriceFromMedianizer();
        // ethDaiPrice, where 1:1 == 1e8. Using a single wei here means 0 slippage and allows pricing from low liq pool
        // extrapolate to base 1e18 in order to do calcs
        uint256 ethDaiPriceSimple = IUniswapExchange(uniswapExchangeAddress)
            .getEthToTokenInputPrice(1 * 10**6);
        uint256 ethDaiPriceExact = ethDaiPriceSimple.mul(10**12);

        return ethUsdPrice.divPrecisely(ethDaiPriceExact);
    }

    /**
     * @notice Parses the bytes32 price from Makers Medianizer into uint
     */
    function GetETHUSDPriceFromMedianizer() public view returns (uint256) {
        return uint256(IMakerMedianizer(makerMedianizer).read());
    }
}
