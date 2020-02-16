const DaiHard = artifacts.require("DaiHard.sol");

const config = require("./config.json");

module.exports = async function(callback) {
    try {
        if(config.daiHard == '') {
        console.log("Specify a DaiHard contract address in the config file");
        return;
        }
        const daiHard = await DaiHard.at(config.daiHard);

        console.log("DaiHard: ", daiHard.address);
        const tx = await daiHard.deployedCFD(1);

        console.log("CFD address:");
        callback(tx);
    }
    catch(err) {
        callback(err);
    }
}
  