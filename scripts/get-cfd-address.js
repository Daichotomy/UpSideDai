const UpSideDai = artifacts.require("UpSideDai.sol");

const config = require("./config.json");

module.exports = async function(callback) {
    try {
        if(config.upSideDai == '') {
        console.log("Specify a UpSideDai contract address in the config file");
        return;
        }
        const upSideDai = await UpSideDai.at(config.upSideDai);

        console.log("UpSideDai: ", upSideDai.address);
        const tx = await upSideDai.deployedCFD(1);

        console.log("CFD address:");
        callback(tx);
    }
    catch(err) {
        callback(err);
    }
}
  