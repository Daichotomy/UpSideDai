const CFD = artifacts.require("CFD.sol");

const config = require("./config.json");

module.exports = async function(callback) {
    try {
        if(config.cfd == '') {
        console.log("Specify a CFD contract address in the config file");
        return;
        }
        const cfd = await CFD.at(config.cfd);
        console.log("CFD: ", cfd.address);

        let tx = await cfd.makerMedianizer();
        console.log("Maker medianizer:");
        console.log(tx);

        tx = await cfd.uniswapFactory();
        console.log("Uniswap factory");
        console.log(tx);

        tx = await cfd.daiToken();
        console.log("DAI token");
        console.log(tx);

        tx = await cfd.upDai();
        console.log("UPDAI token");
        console.log(tx);

        tx = await cfd.downDai();
        console.log("DOWNDAI token");
        console.log(tx);

        tx = await cfd.uniswapUpDaiExchange();
        console.log("UPDAI Uniswap exchange");
        console.log(tx);

        tx = await cfd.uniswapDownDaiExchange();
        console.log("DOWNDAI uniswap exchange");
        console.log(tx);

        callback();
    }
    catch(err) {
        callback(err);
    }
}
  