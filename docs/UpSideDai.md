# UpSideDai.sol

View Source: [contracts/UpSideDai.sol](../contracts/UpSideDai.sol)

**↗ Extends: [Ownable](Ownable.md)**

**UpSideDai**

UpSideDai contract

## Contract Members
**Constants & Variables**

```js
mapping(uint256 => address) public deployedCFD;

```

**Events**

```js
event CFDeployed(address indexed CFD, uint256  creationDate, uint256 indexed settlementDate, uint256 indexed version);
```

## Functions

- [newCFD(address _makerMedianizer, address _uniswapFactory, address _daiToken, uint256 _leverage, uint256 _fee, uint256 _settlementLength, uint256 _version)](#newcfd)

### newCFD

deploy a new CFD

```js
function newCFD(address _makerMedianizer, address _uniswapFactory, address _daiToken, uint256 _leverage, uint256 _fee, uint256 _settlementLength, uint256 _version) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _makerMedianizer | address | maker medianizer address | 
| _uniswapFactory | address | uniswap factory address | 
| _daiToken | address | dai token addr | 
| _leverage | uint256 | leverage where 1x == 1e18 | 
| _fee | uint256 | payout fee where 100% fee == 1e18 | 
| _settlementLength | uint256 | time in seconds for settlement | 
| _version | uint256 | tranche number, or version | 

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
