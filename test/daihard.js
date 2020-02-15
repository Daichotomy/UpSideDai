const BigNumber = require('bignumber.js');

const DaiHard = artifacts.require("DaiHard");

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract("DAI Hard", ([daiHardTeam, random]) => {
    let daiHard;

    before(async() => {
        daiHard = await DaiHard.new({ from: daiHardTeam });
    });
    
    describe("DaiHard deployment", async() => {
        it("check deployment", async() => {
            assert.equal(await daiHard.owner.call(), daiHardTeam, "Wrong DaiHard contract owner");
        });
    });
});