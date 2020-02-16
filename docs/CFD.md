# CFD - take a 20x leveraged position on the future price of DAI.. or provide
liquidity to the market and earn staking rewards. Liquidation prices at 20x are 0.95<>1.05 (CFD.sol)

View Source: [home/alex/projects/ethdenver/DaiHard/contracts/CFD.sol](../home/alex/projects/ethdenver/DaiHard/contracts/CFD.sol)

**CFD**

Check out all this sweet code!

## Structs
### Stake

```js
struct Stake {
 uint256 upLP,
 uint256 downLP,
 uint256 mintVolume,
 bool liquidated
}
```

## Contract Members
**Constants & Variables**

```js
address public makerMedianizer;
address public uniswapFactory;
address public daiToken;
contract UpDai public upDai;
contract DownDai public downDai;
contract IUniswapExchange public uniswapUpDaiExchange;
contract IUniswapExchange public uniswapDownDaiExchange;
uint256 public leverage;
uint256 public feeRate;
uint256 public settlementDate;
bool public inSettlementPeriod;
uint256 public daiPriceAtSettlement;
uint256 public upDaiRateAtSettlement;
uint256 public downDaiRateAtSettlement;
uint256 public totalMintVolumeInDai;
mapping(address => struct CFD.Stake) public stakes;

```

**Events**

```js
event NeededEthCollateral(address indexed depositor, address indexed cfd, uint256 indexed amount, uint256  upDaiPoolEth, uint256  downDaiPoolEth);
```

## Modifiers

- [notInSettlementPeriod](#notinsettlementperiod)
- [onlyInSettlementPeriod](#onlyinsettlementperiod)

### notInSettlementPeriod

```js
modifier notInSettlementPeriod() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyInSettlementPeriod

```js
modifier onlyInSettlementPeriod() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(address _makerMedianizer, address _uniswapFactory, address _daiToken, uint256 _leverage, uint256 _fee, uint256 _settlementDate, uint256 _version)](#)
- [mint(uint256 _daiDeposit)](#mint)
- [getETHCollateralRequirements(uint256 _daiDeposit)](#getethcollateralrequirements)
- [claimRewards()](#claimrewards)
- [redeem(uint256 _redeemAmount)](#redeem)
- [redeemFinal()](#redeemfinal)
- [_payout(address redeemer, uint256 upDaiUnits, uint256 downDaiUnits, uint256 upDaiRate, uint256 downDaiRate)](#_payout)
- [_getCurrentDaiRates(uint256 daiUsdPrice)](#_getcurrentdairates)
- [GetDaiPriceUSD()](#getdaipriceusd)
- [GetETHUSDPriceFromMedianizer()](#getethusdpricefrommedianizer)

### 

constructor

```js
function (address _makerMedianizer, address _uniswapFactory, address _daiToken, uint256 _leverage, uint256 _fee, uint256 _settlementDate, uint256 _version) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _makerMedianizer | address | maker medianizer address | 
| _uniswapFactory | address | uniswap factory address | 
| _daiToken | address | maker medianizer address | 
| _leverage | uint256 | leverage (1000000000000000x) (1x == 1e18) | 
| _fee | uint256 | payout fee (1% == 1e16) | 
| _settlementDate | uint256 | maker medianizer address | 
| _version | uint256 | which tranche are we on? | 

### mint

mint UP and DOWN DAI tokens

```js
function mint(uint256 _daiDeposit) external payable notInSettlementPeriod 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _daiDeposit | uint256 | amount of DAI to deposit | 

### getETHCollateralRequirements

get the amount of ETH required to create a uniswap exchange

```js
function getETHCollateralRequirements(uint256 _daiDeposit) public nonpayable
returns(uint256, uint256)
```

**Returns**

the amount of ETH needed for UPDAI pool and DOWNDAI pool

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _daiDeposit | uint256 | the total amount of underlying to deposit (UP/DOWN DAI = _daiDeposit/2) | 

### claimRewards

Claims all rewards that a staker is eligable for

```js
function claimRewards() external nonpayable onlyInSettlementPeriod 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### redeem

redeem a pair of UPDAI and DOWNDAI

```js
function redeem(uint256 _redeemAmount) public nonpayable notInSettlementPeriod 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _redeemAmount | uint256 | Pair count where 1 real token == 1e18 base units | 

### redeemFinal

redeem UPDAI or DOWNDAI token

```js
function redeemFinal() public nonpayable onlyInSettlementPeriod 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### _payout

$ payout function $

```js
function _payout(address redeemer, uint256 upDaiUnits, uint256 downDaiUnits, uint256 upDaiRate, uint256 downDaiRate) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| redeemer | address | redeemer address | 
| upDaiUnits | uint256 | units of UpDai | 
| downDaiUnits | uint256 | units of DownDai | 
| upDaiRate | uint256 | Rate of uDAI<>DAI | 
| downDaiRate | uint256 | units of downDAI<>DAI | 

### _getCurrentDaiRates

Based on the price of DAI, what are the current exchange rates for upDai and downDai?

```js
function _getCurrentDaiRates(uint256 daiUsdPrice) public nonpayable
returns(upDaiRate uint256, downDaiRate uint256)
```

**Returns**

upDaiRate where 1:1 == 1e18

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| daiUsdPrice | uint256 | Dai price in USD where $1 == 1e18 | 

### GetDaiPriceUSD

get DAI price in USD

```js
function GetDaiPriceUSD() public view
returns(relativePrice uint256)
```

**Returns**

relativePrice of DAI with regards to USD peg, where 1:1 == 1e18

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### GetETHUSDPriceFromMedianizer

Parses the bytes32 price from Makers Medianizer into uint

```js
function GetETHUSDPriceFromMedianizer() public view
returns(uint256)
```

**Returns**

uint256 Medianised price where $1 == 1e18

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Contracts

* [CFD](CFD.md)
* [Context](Context.md)
* [DAITokenMock](DAITokenMock.md)
* [DownDai](DownDai.md)
* [ERC20](ERC20.md)
* [ERC20Burnable](ERC20Burnable.md)
* [ERC20Detailed](ERC20Detailed.md)
* [ERC20Mintable](ERC20Mintable.md)
* [IERC20](IERC20.md)
* [IMakerMedianizer](IMakerMedianizer.md)
* [IUniswapExchange](IUniswapExchange.md)
* [IUniswapFactory](IUniswapFactory.md)
* [MakerMedianizerMock](MakerMedianizerMock.md)
* [Migrations](Migrations.md)
* [MinterRole](MinterRole.md)
* [Ownable](Ownable.md)
* [Roles](Roles.md)
* [SafeMath](SafeMath.md)
* [StableMath](StableMath.md)
* [UpDai](UpDai.md)
* [UpSideDai](UpSideDai.md)
