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
const DaiHard = artifacts.require("DaiHard");
const CFD = artifacts.require("CFD");

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract("DAI Hard", ([daiHardTeam, random]) => {
    let dai, makerMedianizer, uniswapFactory, daiHard, cfd;

    before(async() => {
        // ERC20 token mock for testing
        dai = await TokenMock.new(
            "DAI",
            "DAI",
            18,
            { from: daiHardTeam }
        );

        daiHard = await DaiHard.new({ from: daiHardTeam });
    });
    
    describe("CFD deployment", async() => {
        it("create new CFD", async() => {
            //
        });
    });
});