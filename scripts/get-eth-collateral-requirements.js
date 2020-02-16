const CFD = artifacts.require("CFD.sol");
const TokenMock = artifacts.require("TokenMock.sol");

const config = require("./config.json");

module.exports = async function(callback) {
    try {
        let daiAmountDeposit = 10;

        if(config.cfd == '') {
            console.log("Specify a CFD contract address in the config file");
            return;
        }
        if(config.dai == '') {
            console.log("Specify a DAI address in the config file");
            return;
        }
        const cfd = await CFD.at(config.cfd);
        console.log("CFD: ", cfd.address);

        const dai = await TokenMock.at(config.dai);
        console.log("DAI: ", dai.address);

        let tx = await cfd.getETHCollateralRequirements("10");

        console.log(JSON.stringify(tx));

        callback();
    }
    catch(err) {
        callback(err);
    }
}
  