# Migrations.sol

View Source: [home/alex/projects/ethdenver/DaiHard/contracts/z_Migrations.sol](../home/alex/projects/ethdenver/DaiHard/contracts/z_Migrations.sol)

**Migrations**

## Contract Members
**Constants & Variables**

```js
address public owner;
uint256 public last_completed_migration;

```

## Modifiers

- [restricted](#restricted)

### restricted

```js
modifier restricted() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [()](#)
- [setCompleted(uint256 completed)](#setcompleted)

### 

```js
function () public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setCompleted

```js
function setCompleted(uint256 completed) public nonpayable restricted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| completed | uint256 |  | 

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
