# ERC20Burnable.sol

View Source: [openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol](../openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol)

**↗ Extends: [Context](Context.md), [ERC20](ERC20.md)**
**↘ Derived Contracts: [DownDai](DownDai.md), [UpDai](UpDai.md)**

**ERC20Burnable**

Extension of {ERC20} that allows token holders to destroy both their own
tokens and those that they have an allowance for, in a way that can be
recognized off-chain (via event analysis).

## Functions

- [burn(uint256 amount)](#burn)
- [burnFrom(address account, uint256 amount)](#burnfrom)

### burn

Destroys `amount` tokens from the caller.
     * See {ERC20-_burn}.

```js
function burn(uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| amount | uint256 |  | 

### burnFrom

See {ERC20-_burnFrom}.

```js
function burnFrom(address account, uint256 amount) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 
| amount | uint256 |  | 

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
