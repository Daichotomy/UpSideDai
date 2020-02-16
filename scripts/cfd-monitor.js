// 1- all static data and param sof the CFD
// 2- price of ETH to USD
// 3- price of DAI to ETH
// 4- price of DAI in USD
// 5- UPDAI Uniswap exchange info
// 6- DOWNDAI Uniswap exchange info
// 7- ETH needed as collateral

const IUniswapFactory = artifacts.require("IUniswapFactory.sol");
const IUniswapExchange = artifacts.require("IUniswapExchange");
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

        let medianizerAdd = await cfd.makerMedianizer();
        console.log("Medianizer: ", medianizerAdd);

        /*let ethUsdPrice = await cfd.GetETHUSDPriceFromMedianizer();
        console.log("ETH/USD price from Maker:");
        console.log(tx);*/

        let daiUsdPrice = await cfd.GetDaiPriceUSD();
        console.log("DAI/USD price:");
        console.log(daiUsdPrice.toString());

        /*let daiAdd = await cfd.daiToken();
        let uniFactAdd = await cfd.uniswapFactory();
        const uniswapFactory = await IUniswapFactory(uniFactAdd).getExchange(daiAdd);
        console.log(uniswapFactory);*/

        /*console.log("DAI token");
        console.log(tx);

        tx = await cfd.uniswapUpDaiExchange();
        console.log("UPDAI Uniswap exchange");
        console.log(tx);

        tx = await cfd.uniswapDownDaiExchange();
        console.log("DOWNDAI uniswap exchange");
        console.log(tx);*/

        callback();
    }
    catch(err) {
        callback(err);
    }
}