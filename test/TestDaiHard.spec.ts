/// <reference path="../types/interfaces.d.ts" />
/// <reference path="../types/chai.d.ts" />

import { DaiHardContract } from "./../types/generated/index.d";
import { assert } from "chai";

import { ether, BN } from "openzeppelin-test-helpers";

const DaiHard: DaiHardContract = artifacts.require("DaiHard");

// require("chai")
//   .use(require("chai-as-promised"))
//   .use(require("chai-bignumber")(BN))
//   .should();

contract("DAI Hard", ([daiHardTeam, random]) => {
  let daiHard;

  before(async () => {
    daiHard = await DaiHard.new({ from: daiHardTeam });
  });

  describe("DaiHard deployment", async () => {
    it("check deployment", async () => {
      assert.equal(
        await daiHard.owner.call(),
        daiHardTeam,
        "Wrong DaiHard contract owner"
      );
    });
  });
});
