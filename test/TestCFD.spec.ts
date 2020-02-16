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

contract("CFD", ([upSideDaiTeam, random]) => {
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
        // context("");
        it("get required ETH for up&down pool", async () => {
            let upDaiCollateral = await cfd.getETHCollateralRequirements(
                daiAmountDeposit
            );
            // console.log(upDaiCollateral);
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
            console.log(onChainPrice.toString());

            expect(onChainPrice).bignumber.eq(
                expectedPrice,
                "expected price mismatch"
            );
        });
    });
});
