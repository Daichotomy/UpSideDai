# IUniswapFactory.sol

View Source: [contracts/interfaces/IUniswapFactory.sol](../contracts/interfaces/IUniswapFactory.sol)

**IUniswapFactory**

## Contract Members
**Constants & Variables**

```js
address public exchangeTemplate;
uint256 public tokenCount;

```

## Functions

- [createExchange(address token)](#createexchange)
- [getExchange(address token)](#getexchange)
- [getToken(address exchange)](#gettoken)
- [getTokenWithId(uint256 tokenId)](#gettokenwithid)
- [initializeFactory(address template)](#initializefactory)

### createExchange

```js
function createExchange(address token) external nonpayable
returns(exchange address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | address |  | 

### getExchange

```js
function getExchange(address token) external view
returns(exchange address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| token | address |  | 

### getToken

```js
function getToken(address exchange) external view
returns(token address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| exchange | address |  | 

### getTokenWithId

```js
function getTokenWithId(uint256 tokenId) external view
returns(token address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 |  | 

### initializeFactory

```js
function initializeFactory(address template) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| template | address |  | 

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
