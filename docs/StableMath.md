# StableMath (StableMath.sol)

View Source: [contracts/StableMath.sol](../contracts/StableMath.sol)

**StableMath**

Accesses the Stable Math library using generic system wide variables for managing precision
Derives from OpenZeppelin's SafeMath lib

## Contract Members
**Constants & Variables**

```js
uint256 private constant fullScale;

```

## Functions

- [getScale()](#getscale)
- [scale(uint256 a)](#scale)
- [add(uint256 a, uint256 b)](#add)
- [sub(uint256 a, uint256 b)](#sub)
- [mul(uint256 a, uint256 b)](#mul)
- [mulTruncate(uint256 a, uint256 b, uint256 _scale)](#multruncate)
- [mulTruncate(uint256 a, uint256 b)](#multruncate)
- [div(uint256 a, uint256 b)](#div)
- [divPrecisely(uint256 a, uint256 b)](#divprecisely)

### getScale

Getters

```js
function getScale() internal pure
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### scale

Scaled a given integer to the power of the full scale.

```js
function scale(uint256 a) internal pure
returns(b uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 

### add

Returns the addition of two unsigned integers, reverting on overflow.

```js
function add(uint256 a, uint256 b) internal pure
returns(c uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### sub

Returns the subtraction of two unsigned integers, reverting on overflow.

```js
function sub(uint256 a, uint256 b) internal pure
returns(c uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### mul

Returns the multiplication of two unsigned integers, reverting on overflow.

```js
function mul(uint256 a, uint256 b) internal pure
returns(c uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### mulTruncate

Multiplies two numbers and truncates

```js
function mulTruncate(uint256 a, uint256 b, uint256 _scale) internal pure
returns(c uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 
| _scale | uint256 |  | 

### mulTruncate

Multiplies two numbers and truncates using standard full scale

```js
function mulTruncate(uint256 a, uint256 b) internal pure
returns(c uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### div

Returns the integer division of two unsigned integers

```js
function div(uint256 a, uint256 b) internal pure
returns(c uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

### divPrecisely

Precisely divides two numbers, first by expanding

```js
function divPrecisely(uint256 a, uint256 b) internal pure
returns(c uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| a | uint256 |  | 
| b | uint256 |  | 

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
