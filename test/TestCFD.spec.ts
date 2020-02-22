/// <reference path="../types/interfaces.d.ts" />
/// <reference path="../types/chai.d.ts" />
import {
  CFDContract,
  CFDInstance,
  UpSideDaiContract,
  MakerMedianizerMockContract,
  DAITokenMockContract,
  DAITokenMockInstance,
  IUniswapExchangeContract,
  MakerMedianizerMockInstance,
  IUniswapFactoryInstance,
  IUniswapFactoryContract,
  IUniswapExchangeInstance,
  UpSideDaiInstance,
  UpDaiInstance,
  UpDaiContract,
  DownDaiInstance,
  DownDaiContract
} from "./../types/generated/index.d";
import * as chai from "chai";
import chaiBN from "chai-bn";
import { ether, BN } from "openzeppelin-test-helpers";
import truffleAssert from "truffle-assertions";

chai.use(chaiBN(BN));
const { assert, expect } = chai;
// const BigNumber = require("bignumber.js");
// const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
// const increaseTime = require('./helpers/increaseTime');
// const increaseTimeTo = increaseTime.increaseTimeTo;

const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

const DAITokenMock: DAITokenMockContract = artifacts.require("DAITokenMock");
const MakerMedianizerMock: MakerMedianizerMockContract = artifacts.require(
  "MakerMedianizerMock"
);
const IUniswapExchange: IUniswapExchangeContract = artifacts.require(
  "IUniswapExchange"
);
const IUniswapFactory: IUniswapFactoryContract = artifacts.require(
  "IUniswapFactory"
);
const UpSideDai: UpSideDaiContract = artifacts.require("UpSideDai");
const CFD: CFDContract = artifacts.require("CFD");
const UpDaiContract: UpDaiContract = artifacts.require("UpDai");
const DownDaiContract: DownDaiContract = artifacts.require("DownDai");

contract("CFD", ([provider1, provider2, provider3, trader1, trader2, trader3, random]) => {
  const daiAmountMint = ether("100");
  const daiAmountDeposit = ether("50");
  let dai: DAITokenMockInstance;
  let upSideDai: UpSideDaiInstance;
  let cfd: CFDInstance;
  let makerMedianizer: MakerMedianizerMockInstance;
  let uniswapFactory: IUniswapFactoryInstance;
  let upDai: UpDaiInstance;
  let downDai: DownDaiInstance;

  before(async () => {
    dai = await DAITokenMock.deployed();
    upSideDai = await UpSideDai.deployed();
    cfd = await CFD.at(await upSideDai.deployedCFD(1));
    uniswapFactory = await IUniswapFactory.at(await cfd.uniswapFactory());
    makerMedianizer = await MakerMedianizerMock.at(await cfd.makerMedianizer());
    upDai = await UpDaiContract.at(await cfd.upDai());
    downDai = await DownDaiContract.at(await cfd.downDai());

    dai.mint(provider1, daiAmountMint);
    dai.mint(provider2, daiAmountMint);
    dai.mint(provider3, daiAmountMint);
    dai.mint(trader1, daiAmountMint);
    dai.mint(trader2, daiAmountMint);
    dai.mint(trader3, daiAmountMint);
    dai.mint(random, daiAmountMint);
  });

  describe("CFD deployment", async () => {
    it("check deployment params", async () => {
      expect(await upDai.totalSupply()).bignumber.eq(
        new BN((0).toString()),
        "upDai total supply mismatcsh"
      );
      expect(await downDai.totalSupply()).bignumber.eq(
        new BN((0).toString()),
        "downDai total supply mismatch"
      );
    });
  });

  describe("Liquidity provider", async () => {
    it("get required ETH for up&down pool", async () => {
      let _individualDeposits = daiAmountDeposit.div(new BN(2));
      let _ethUSDPrice = new BN(await cfd.GetETHUSDPriceFromMedianizer());
      let _daiPriceUsd = await cfd.GetDaiPriceUSD();
      let upDaiRate;
      let downDaiRate;
      let _totalUpDaiValue;
      let _totalDownDaiValue;   
      let _upDaiPoolEth;
      let _downDaiPoolEth;

      let tx1 = await cfd.getCurrentDaiRates(_daiPriceUsd);   // To improve test; mock this function math
      truffleAssert.eventEmitted(tx1, "UpDownDaiRates", ev => {
        upDaiRate = ev.upDaiRate;
        downDaiRate = ev.downDaiRate;
        return ev;
      });

      _totalUpDaiValue = upDaiRate.mul(_individualDeposits).div(new BN(10).pow(new BN(18)));
      _totalDownDaiValue = downDaiRate.mul(_individualDeposits).div(new BN(10).pow(new BN(18)));

      _upDaiPoolEth = _totalUpDaiValue.mul(new BN(10).pow(new BN(18))).div(_ethUSDPrice);
      _downDaiPoolEth = _totalDownDaiValue.mul(new BN(10).pow(new BN(18))).div(_ethUSDPrice);

      let tx2 = await cfd.getETHCollateralRequirements(daiAmountDeposit);
      truffleAssert.eventEmitted(tx2, "NeededEthCollateral", ev => {
        expect(_upDaiPoolEth).bignumber.eq(
          ev.upDaiPoolEth,
          "expected needed ETH collateral for UPDAI pool mismatch"
        );
        expect(_downDaiPoolEth).bignumber.eq(
          ev.downDaiPoolEth,
          "expected needed ETH collateral for DOWNDAI pool mismatch"
        );
        return ev;
      });
    });

    it("deposit liquidity into CFD", async () => {
      let cfdUpDaiBalanceBefore = await upDai.balanceOf(cfd.address);
      let cfdDownDaiBalanceBefore = await downDai.balanceOf(cfd.address);

      let upDaiExchange: IUniswapExchangeInstance = await IUniswapExchange.at(
        await uniswapFactory.getExchange(upDai.address)
      );
      let downDaiExchange: IUniswapExchangeInstance = await IUniswapExchange.at(
        await uniswapFactory.getExchange(downDai.address)
      );

      let neededEthCollateral;
      let tx2 = await cfd.getETHCollateralRequirements(daiAmountDeposit);
      truffleAssert.eventEmitted(tx2, "NeededEthCollateral", ev => {
        neededEthCollateral = ev.upDaiPoolEth.add(ev.downDaiPoolEth);
        return ev;
      });

      console.log("needed ETH: ", web3.utils.fromWei(neededEthCollateral, "ether"));

      await dai.approve(cfd.address, daiAmountDeposit, {from: provider1});
      await cfd.mint(daiAmountDeposit, {from: provider1, value: neededEthCollateral});

      let cfdUpDaiBalanceAfter = await upDai.balanceOf(cfd.address);      // for better test, calculate Uniswap exchange addLiquidity() 
      let cfdDownDaiBalanceAfter = await downDai.balanceOf(cfd.address);  // for better test, calculate Uniswap exchange addLiquidity()

      console.log("DOWNDAI exchange balance: ", (await downDaiExchange.balanceOf(cfd.address)).toString());
      console.log("UPDAi exchange balance: ", (await upDaiExchange.balanceOf(cfd.address)).toString());

      let provider1Stake = await cfd.stakes(provider1);

      expect(await cfd.totalMintVolumeInDai()).bignumber.eq(
        daiAmountDeposit,
        "expected minted UPDAI mismatch"
      );

      expect(provider1Stake[0]).bignumber.eq(
        await upDaiExchange.balanceOf(cfd.address),
        "expected UPDAI LP mismatch"
      );

      expect(provider1Stake[1]).bignumber.eq(
        await downDaiExchange.balanceOf(cfd.address),
        "expected DOWNDAI LP mismatch"
      );

      /*expect(cfdUpDaiBalanceAfter.sub(cfdUpDaiBalanceBefore)).bignumber.eq(
        daiAmountDeposit.div(new BN(2)),
        "expected minted UPDAI mismatch"
      );
      expect(cfdDownDaiBalanceAfter.sub(cfdDownDaiBalanceBefore)).bignumber.eq(
        daiAmountDeposit.div(new BN(2)),
        "expected minted DOWNDAI mismatch"
      );*/
    });


  });

  describe("GetDaiPriceUSD", async () => {
    it("should return relative price", async () => {
      let ethUSDPrice = new BN(await cfd.GetETHUSDPriceFromMedianizer());
      let daiExchange: IUniswapExchangeInstance = await IUniswapExchange.at(
        await uniswapFactory.getExchange(dai.address)
      );
      let ethDAIPriceSimple = await daiExchange.getEthToTokenInputPrice(
        (1000000).toString()
      );
      let ethDAPriceExact = ethDAIPriceSimple.mul(new BN(10 ** 12));
      let expectedPrice = ethUSDPrice
        .mul(new BN(10).pow(new BN(18)))
        .div(ethDAPriceExact);
      const onChainPrice = await cfd.GetDaiPriceUSD();
      expect(onChainPrice).bignumber.eq(
        expectedPrice,
        "expected DAI price mismatch"
      );
    });
  });

});
