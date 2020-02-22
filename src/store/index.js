import Web3 from "web3";
import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import moment from "moment";

import { getEtherscanAddress, getNetIdString } from "@/utils/lookupTools";

import * as actions from "./actions";
import * as mutations from "./mutation-types";

import truffleContract from "truffle-contract";

import CFDABI from "../../build/CFD.json";
import UniSwapABI from "../../build/IUniswapExchange.json";
import UniSwapFactoryABI from "../../build/IUniswapFactory.json";
import UpSideDaiABI from "../../build/UpSideDai.json";
import Erc20TokenABI from "../../build/ERC20.json";

const Cfd = truffleContract(CFDABI);
const UniSwap = truffleContract(UniSwapABI);
const UniSwapFactory = truffleContract(UniSwapFactoryABI);
const UpSideDai = truffleContract(UpSideDaiABI);
const Erc20Token = truffleContract(Erc20TokenABI);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
    currentNetwork: null,
    etherscanBase: null,
    cfd: null,
    uniswapUpDai: null,
    uniswapDownDai: null,
    uniswapDai: null,
    uniswapFactory: null,
    upSideDai: null,
    dai: null,
    upDai: null,
    downDai: null,
    miningTransactionObject: {
      status: null,
      txHash: ""
    },
    cfdState: {
      daiPrice: null,
      ethUsdPrice: null
    },
    userInfo: {
      daiBallance: null,
      ethBallance: null
    }
  },
  mutations: {
    //WEB3 Stuff
    [mutations.SET_ACCOUNT](state, account) {
      console.log("Account set");
      console.log(account);
      state.account = account;
    },
    [mutations.SET_CURRENT_NETWORK](state, currentNetwork) {
      state.currentNetwork = currentNetwork;
    },
    [mutations.SET_ETHERSCAN_NETWORK](state, etherscanBase) {
      state.etherscanBase = etherscanBase;
    },
    [mutations.SET_WEB3]: async function(state, web3) {
      state.web3 = web3;
    },
    [mutations.SET_UPSIDEDAI]: async function(state, upsideDai) {
      state.upsideDai = upsideDai;
    },
    [mutations.SET_CFD]: async function(state, cfd) {
      state.cfd = cfd;
    },
    [mutations.SET_UNISWAPUPDAI]: async function(state, uniswapUpDai) {
      state.uniswapUpDai = uniswapUpDai;
    },
    [mutations.SET_UNISWAPDOWNDAI]: async function(state, uniswapDownDai) {
      state.uniswapDownDai = uniswapDownDai;
    },
    [mutations.SET_UNISWAPFACTORY]: async function(state, uniswapFactory) {
      state.uniswapFactory = uniswapFactory;
    },
    [mutations.SET_UNISWAPDAI]: async function(state, uniswapDai) {
      state.uniswapDai = uniswapDai;
    },
    [mutations.SET_DAI]: async function(state, dai) {
      state.dai = dai;
    },
    [mutations.SET_UPDAI]: async function(state, upDai) {
      state.upDai = upDai;
    },
    [mutations.SET_DOWNDAI]: async function(state, downDai) {
      state.downDai = downDai;
    },
    [mutations.SET_MINING_TRANSACTION_OBJECT](state, miningTransactionObject) {
      state.miningTransactionObject = miningTransactionObject;
    }
  },
  actions: {
    [actions.GET_CURRENT_NETWORK]: function({ commit, dispatch, state }, web3) {
      getNetIdString(web3).then(currentNetwork => {
        commit(mutations.SET_CURRENT_NETWORK, currentNetwork);
      });
      getEtherscanAddress(web3).then(etherscanBase => {
        commit(mutations.SET_ETHERSCAN_NETWORK, etherscanBase);
      });
    },

    [actions.INIT_APP]: async function({ commit, dispatch, state }, web3) {
      // Set the web3 instance
      Cfd.setProvider(web3.currentProvider);
      UniSwap.setProvider(web3.currentProvider);
      UniSwapFactory.setProvider(web3.currentProvider);
      UpSideDai.setProvider(web3.currentProvider);
      Erc20Token.setProvider(web3.currentProvider);
      console.log("IN STORE");
      console.log(web3);
      commit(mutations.SET_WEB3, {
        web3
      });
      console.log("set");

      dispatch(actions.GET_CURRENT_NETWORK, web3);

      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      if (account) {
        commit(mutations.SET_ACCOUNT, account);
      }

      let upSideDai = await UpSideDai.deployed();
      console.log("contract upSaidDai");
      console.log(upSideDai);
      commit(mutations.SET_UPSIDEDAI, upSideDai);

      let cfdAddress = await upSideDai.deployedCFD(1);
      console.log("CFD address");
      console.log(cfdAddress);

      let cfd = await Cfd.at(cfdAddress);
      console.log("contract cfd");
      console.log(cfd);
      commit(mutations.SET_CFD, cfd);

      let daiAddress = await cfd.daiToken();
      let dai = await Erc20Token.at(daiAddress);
      console.log("contract dai");
      console.log(dai);
      commit(mutations.SET_DAI, dai);

      let upDaiAddress = await cfd.upDai();
      let upDai = await Erc20Token.at(upDaiAddress);
      console.log("contract upDai");
      console.log(upDai);
      commit(mutations.SET_UPDAI, upDai);

      let downDaiAddress = await cfd.downDai();
      let downDai = await Erc20Token.at(downDaiAddress);
      console.log("contract downDai");
      console.log(downDai);
      commit(mutations.SET_DOWNDAI, downDai);

      let uniSwapUpDaiAddress = await cfd.uniswapUpDaiExchange();
      let uniSwapUpDai = await UniSwap.at(uniSwapUpDaiAddress);
      console.log("contract upDaiUniswap");
      console.log(uniSwapUpDai);
      commit(mutations.SET_UNISWAPUPDAI, uniSwapUpDai);

      let uniSwapDownDaiAddress = await cfd.uniswapDownDaiExchange();
      let uniSwapDownDai = await UniSwap.at(uniSwapDownDaiAddress);
      console.log("contract DownDaiUniswap");
      console.log(uniSwapDownDai);
      commit(mutations.SET_UNISWAPDOWNDAI, uniSwapDownDai);

      let uniSwapFactoryAddress = await cfd.uniswapFactory();
      console.log("VAL");
      console.log(uniSwapFactoryAddress);
      let uniSwapFactory = await UniSwapFactory.at(uniSwapFactoryAddress);
      console.log("contract uniSwapFactory");
      console.log(uniSwapFactory);
      console.log("HERE1");
      commit(mutations.SET_UNISWAPFACTORY, uniSwapFactory);
      console.log("HERE");
      console.log("daiAddress", daiAddress);

      let uniSwapDaiAddress = await uniSwapFactory.getExchange(daiAddress);
      console.log("uniSwapDaiAddress");
      console.log(uniSwapDaiAddress);
      let uniSwapDai = await UniSwap.at(uniSwapDaiAddress);
      console.log("contract uniSwapDai");
      console.log(uniSwapDai);
      commit(mutations.SET_UNISWAPDAI, uniSwapDai);

      console.log("END CONTRACT CONNECT");

      let value = await uniSwapDai.factoryAddress();
      console.log("factory", value);

      let daiPrice = await cfd.GetDaiPriceUSD();
      console.log("daiPrice", daiPrice);
      state.cfdState.daiPrice = web3.utils.fromWei(daiPrice.toString());

      let userDaiBallance = await dai.balanceOf.call(account);
      console.log("userdaiBallance", userDaiBallance);
      state.userInfo.daiBallance = web3.utils.fromWei(userDaiBallance.toString());

      let userEthBallance = await web3.eth.getBalance(account);
      console.log("userEthBallance", userEthBallance);
      state.userInfo.ethBallance = web3.utils.fromWei(userEthBallance.toString());
    },
    [actions.CALCULATE_ETH_COLLATERAL]: async function({ commit, dispatch, state }, params) {
      console.log("CALCULATE NEEDED ETH COLLATERAL")
      console.log(params);

      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: "pending",
        txHash: ""
      });

      let latest = await state.web3.web3.eth.getBlockNumber();

      let txHash = await state.cfd.getETHCollateralRequirements(
        state.web3.web3.utils.toWei(params.daiDeposit.toString()),
        { from: state.account }
      );

      if(txHash) {
        state.cfd.contract.events.NeededEthCollateral(
          {
            filter: {
              depositor: state.account,
              cfd: state.cfd.address,
              amount: state.web3.web3.utils.toWei(params.daiDeposit)
            },
            fromBlock: latest
          },
          async function(error, event) {
            if(!error) {
              console.log(event.returnValues);
              console.log(event.returnValues[5]);

              dispatch(actions.POOL, {
                spender: state.cfd.address,
                daiDeposit: params.daiDeposit,
                ethCollateral: event.returnValues[5]
              });
            }
            else {
              console.log(error);
            }
          }
        );
      }
    },
    [actions.POOL]: async function({ commit, dispatch, state }, params) {
      console.log("APPROVE DAI TRANSFER ", params.daiDeposit, " To ",  params.spender);
      
      await state.dai.approve(
        params.spender,
        state.web3.web3.utils.toWei(params.daiDeposit.toString()),
        { from: state.account }
      );

      console.log("POOL");

      let txHash = await state.cfd.mint(
        state.web3.web3.utils.toWei(params.daiDeposit),
        {
          from: state.account,
          value: params.ethCollateral.toString()
        }
      );

      if(txHash) {
        commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
          status: "done",
          txHash: txHash.tx
        });
      }
    },
    [actions.APPROVE_DAI_TRANSFER]: async function({ commit, dispatch, state }, params) {
      console.log("APPROVE DAI TRANSFER ", params.daiDeposit, " To ",  params.spender);

      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: "pending",
        txHash: ""
      });

      let txHash = await state.dai.approve(
        params.spender,
        state.web3.web3.utils.toWei(params.daiDeposit.toString()),
        { from: state.account }
      );

      if(txHash) {
        commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
          status: "done",
          txHash: txHash.tx
        });
      }
    },
    [actions.ETH_USD_PRICE]: async function({ commit, dispatch, state }, params) {
      state.cfdState.ethUsdPrice = web3.utils.fromWei((await state.cfd.GetETHUSDPriceFromMedianizer()).toString());
    },
    [actions.TRADE]: async function({ commit, dispatch, state }, params) {
      console.log("TRADE");
      console.log(params);
      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: "pending",
        txHash: ""
      });

      let upOrDownDai = params.direction == "up" ? state.upDai : state.downDai;

      let walletApproval = await state.dai.allowance(
        state.account,
        state.uniswapDai.address
      );

      console.log("walletApproval", walletApproval.toString());
      const oneMonthInSeconds = 60 * 60 * 24 * 30;
      const now = new Date().getTime() / 1000;

      console.log("upOrDownDai", upOrDownDai);
      //   await upOrDownDai.approve(
      //     uniswapExchange.address,
      //     (100 * 10 ** 18).toString(),
      //     {
      //       from: state.account
      //     }
      //   );
      await state.dai.approve(
        state.uniswapDai.address,
        (100 * 10 ** 18).toString(),
        {
          from: state.account
        }
      );

      console.log("passedApprove");
      console.log("up/down address", upOrDownDai.address);
      let txHash = await state.uniswapDai.tokenToTokenSwapInput(
        (100 * 10 ** 18).toString(),
        (1 * 10 ** 18).toString(),
        (1 * 10 ** 14).toString(),
        parseInt(now + oneMonthInSeconds),
        upOrDownDai.address,
        { from: state.account }
      );

      if (txHash) {
        commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
          status: "done",
          txHash: txHash.tx
        });
      }
    },
    [actions.CLOSE_MINING_DIALOG]: async function({ commit, dispatch, state }) {
      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: null,
        txHash: ""
      });
    }
  }
});
