/// <reference path="../types/interfaces.d.ts" />
/// <reference path="../types/chai.d.ts" />
import {
  CFDContract,
  CFDInstance,
  DaiHardContract,
  MakerMedianizerMockContract,
  TokenMockContract,
  TokenMockInstance,
  IUniswapExchangeContract,
  MakerMedianizerMockInstance,
  IUniswapFactoryInstance,
  DaiHardInstance,
  UpDaiInstance,
  UpDaiContract,
  DownDaiInstance,
  DownDaiContract
} from "./../types/generated/index.d";
import * as chai from "chai";
import chaiBN from "chai-bn";
import { ether, BN } from "openzeppelin-test-helpers";

chai.use(chaiBN(BN));
const { assert, expect } = chai;
// const BigNumber = require("bignumber.js");
// const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
// const increaseTime = require('./helpers/increaseTime');
// const increaseTimeTo = increaseTime.increaseTimeTo;

const ZERO_ADDR = "0x0000000000000000000000000000000000000000";

const TokenMock: TokenMockContract = artifacts.require("TokenMock");
const MakerMedianizerMock: MakerMedianizerMockContract = artifacts.require(
  "MakerMedianizerMock"
);
const IUniswapExchange: IUniswapExchangeContract = artifacts.require(
  "IUniswapExchange"
);
const DaiHard: DaiHardContract = artifacts.require("DaiHard");
const CFD: CFDContract = artifacts.require("CFD");
const UpDaiContract: UpDaiContract = artifacts.require("UpDai");
const DownDaiContract: DownDaiContract = artifacts.require("DownDai");

contract("CFD", ([daiHardTeam, random]) => {
  const daiAmountDeposit = ether("50");
  let dai: TokenMockInstance;
  let makerMedianizer: MakerMedianizerMockInstance;
  let uniswapFactory: IUniswapFactoryInstance;
  let daiHard: DaiHardInstance;
  let cfd: CFDInstance;
  let upDai: UpDaiInstance;
  let downDai: DownDaiInstance;

  before(async () => {
    daiHard = await DaiHard.deployed();
    cfd = await CFD.at(await daiHard.deployedCFD(1));
    makerMedianizer = await MakerMedianizerMock.at(await cfd.makerMedianizer());
    upDai = await UpDaiContract.at(await cfd.upDai());
    downDai = await DownDaiContract.at(await cfd.downDai());
  });

  describe("CFD deployment", async () => {
    it("check deployment params", async () => {
      expect(await upDai.totalSupply()).bignumber.eq(
        new BN(0),
        "upDai total supply mismatch"
      );
      expect(await downDai.totalSupply()).bignumber.eq(
        new BN(0),
        "downDai total supply mismatch"
      );
    });
  });

  describe("Liquidity provider", async () => {
    it("get required ETH for up&down pool", async () => {
      let upDaiCollateral = await cfd.getETHCollateralRequirements(
        daiAmountDeposit
      );
      console.log(upDaiCollateral);
    });
  });
});
