const contract = require("@truffle/contract");
const {
    ether,
    BN
} = require("openzeppelin-test-helpers");

const BigNumber = require('bignumber.js');
// const EVMRevert = require('./helpers/EVMRevert').EVMRevert;
// const increaseTime = require('./helpers/increaseTime');
// const increaseTimeTo = increaseTime.increaseTimeTo;

const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

const TokenMock = artifacts.require("TokenMock");
const MakerMedianizerMock = artifacts.require("MakerMedianizerMock");
const IUniswapExchange = artifacts.require("IUniswapExchange");
const DaiHard = artifacts.require("DaiHard");
const CFD = artifacts.require("CFD");

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract("DAI Hard", ([daiHardTeam, random]) => {
    const daiAmountDeposit = ether(50);
    let dai, makerMedianizer, uniswapFactory, daiHard, cfd, upDai, downDai;

    before(async() => {
        daiHard = await DaiHard.deployed();
        cfd = await CFD.at(await daiHard.deployedCFD(1));
        makerMedianizer = await MakerMedianizerMock.at(await cfd.makerMedianizer());
        upDai = await cfd.upDai();
        downDai = await cfd.downDai();
    });
    
    describe("CFD deployment", async() => {
        it("check deployment params", async() => {
            assert.equal(upDai.totalSupply(), 0, "upDai total supply mismatch");
            assert.equal(downDai.totalSupply(), 0, "upDai total supply mismatch");
        });
    });

    describe("Liquidity provider", async() => {
        it("get required ETH for up&down pool", async() => {
            let upDaiCollateral = cfd.getETHCollateralRequirements(daiAmountDeposit);
            console.log(upDaiCollateral);
        });
    });
});