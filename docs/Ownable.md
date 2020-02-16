# Ownable.sol

View Source: [openzeppelin-solidity/contracts/ownership/Ownable.sol](../openzeppelin-solidity/contracts/ownership/Ownable.sol)

**↗ Extends: [Context](Context.md)**
**↘ Derived Contracts: [UpSideDai](UpSideDai.md)**

**Ownable**

Contract module which provides a basic access control mechanism, where
there is an account (an owner) that can be granted exclusive access to
specific functions.
 * This module is used through inheritance. It will make available the modifier
`onlyOwner`, which can be applied to your functions to restrict their use to
the owner.

## Contract Members
**Constants & Variables**

```js
address private _owner;

```

**Events**

```js
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

## Modifiers

- [onlyOwner](#onlyowner)

### onlyOwner

Throws if called by any account other than the owner.

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [()](#)
- [owner()](#owner)
- [isOwner()](#isowner)
- [renounceOwnership()](#renounceownership)
- [transferOwnership(address newOwner)](#transferownership)
- [_transferOwnership(address newOwner)](#_transferownership)

### 

Initializes the contract setting the deployer as the initial owner.

```js
function () internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### owner

Returns the address of the current owner.

```js
function owner() public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isOwner

Returns true if the caller is the current owner.

```js
function isOwner() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### renounceOwnership

Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.
     * NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.

```js
function renounceOwnership() public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.

```js
function transferOwnership(address newOwner) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newOwner | address |  | 

### _transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).

```js
function _transferOwnership(address newOwner) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newOwner | address |  | 

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
