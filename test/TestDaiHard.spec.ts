/// <reference path="../types/interfaces.d.ts" />
/// <reference path="../types/chai.d.ts" />

import { UpSideDaiContract } from "./../types/generated/index.d";
import { assert } from "chai";
import { ether, BN } from "openzeppelin-test-helpers";

const UpSideDai: UpSideDaiContract = artifacts.require("UpSideDai");

// require("chai")
//   .use(require("chai-as-promised"))
//   .use(require("chai-bignumber")(BN))
//   .should();

contract("DAI Hard", ([upSideDaiTeam, random]) => {
    let upSideDai;

    before(async () => {
        upSideDai = await UpSideDai.new({ from: upSideDaiTeam });
    });

    describe("DaiHard deployment", async () => {
        it("check deployment", async () => {
            assert.equal(
                await upSideDai.owner.call(),
                upSideDaiTeam,
                "Wrong UpSideDai contract owner"
            );
        });
    });
});
