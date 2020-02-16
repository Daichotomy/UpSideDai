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
import UpSideDaiABI from "../../build/UpSideDai.json";
import Erc20TokenABI from "../../build/ERC20.json";

const Cfd = truffleContract(CFDABI);
const UniSwap = truffleContract(UniSwapABI);
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
    upSideDai: null,
    dai: null,
    upDai: null,
    downDai: null,
    miningTransactionObject: {
      status: null,
      txHash: ""
    },
    cfdState: {
      daiPrice: null
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
    [actions.GET_CURRENT_NETWORK]: function({ commit, dispatch, state }) {
      getNetIdString().then(currentNetwork => {
        commit(mutations.SET_CURRENT_NETWORK, currentNetwork);
      });
      getEtherscanAddress().then(etherscanBase => {
        commit(mutations.SET_ETHERSCAN_NETWORK, etherscanBase);
      });
    },

    [actions.INIT_APP]: async function({ commit, dispatch, state }, web3) {
      // Set the web3 instance
      Cfd.setProvider(web3.currentProvider);
      UniSwap.setProvider(web3.currentProvider);
      UpSideDai.setProvider(web3.currentProvider);
      Erc20Token.setProvider(web3.currentProvider);
      console.log("IN STORE");
      console.log(web3);
      commit(mutations.SET_WEB3, {
        web3
      });
      console.log("set");

      dispatch(actions.GET_CURRENT_NETWORK);

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

      let daiPrice = await cfd.GetDaiPriceUSD();
      console.log("daiPrice", web3.utils.fromWei(daiPrice).toString());
      state.cfdState.daiPrice = web3.utils.fromWei(daiPrice).toString();

      let userDaiBallance = await dai.balanceOf.call(account);
      console.log("userdaiBallance", userDaiBallance);
      state.userInfo.daiBallance = web3.utils
        .fromWei(userDaiBallance)
        .toString();

      let userEthBallance = await web3.eth.getBalance(account);
      console.log("userEthBallance", userEthBallance);
      state.userInfo.ethBallance = web3.utils
        .fromWei(userEthBallance)
        .toString();
    },
    [actions.POOL]: async function({ commit, dispatch, state }, params) {
      console.log("POOL");
      console.log(params);

      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: "pending",
        txHash: ""
      });

      let walletApproval = await state.dai.allowance(
        state.account,
        state.cfd.address
      );

      console.log(state.cfd.address);
      console.log("walletApproval", walletApproval.toString());
      if (walletApproval.toString() == "0") {
        await state.dai.approve(
          state.cfd.address,
          state.web3.web3.utils.toWei("100000"),
          { from: state.account }
        );

        let txHash = await state.cfd.mint(
          state.web3.web3.utils.toWei(params.daiDeposit),
          {
            from: state.account,
            value: state.web3.web3.utils.toWei("1")
          }
        );

        if (txHash) {
          commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
            status: "done",
            txHash: txHash.tx
          });
        }
      } else {
        let txHash = await state.cfd.mint(
          state.web3.web3.utils.toWei(params.daiDeposit),
          {
            from: state.account,
            value: state.web3.web3.utils.toWei("1")
          }
        );

        if (txHash) {
          commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
            status: "done",
            txHash: txHash.tx
          });
        }
      }
    },
    [actions.TRADE]: async function({ commit, dispatch, state }, params) {
      console.log("TRADE");
      console.log(params);
      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: "pending",
        txHash: ""
      });

      let uniswapExchange =
        params.direction == "up" ? state.uniswapUpDai : state.uniswapDownDai;

      let upOrDownDai = params.direction == "up" ? state.upDai : state.downDai;

      let walletApproval = await state.dai.allowance(
        state.account,
        uniswapExchange.address
      );

      console.log(uniswapExchange.address);
      console.log("walletApproval", walletApproval.toString());
      let timestamp = Math.floor(Date.now() / 1000) + 1000;

      if (walletApproval.toString() == "0") {
        console.log("upOrDownDai", upOrDownDai);
        await upOrDownDai.approve(
          uniswapExchange.address,
          state.web3.web3.utils.toWei("100000"),
          { from: state.account }
        );
        await state.dai.approve(
          uniswapExchange.address,
          state.web3.web3.utils.toWei("100000"),
          { from: state.account }
        );

        console.log("passedApprove");
        let txHash = await state.cfd.mint(
          state.web3.web3.utils.toWei("11"),
          {
            from: state.account,
            value: state.web3.web3.utils.toWei("1")
          }
        );

        if (txHash) {
          commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
            status: "done",
            txHash: txHash.tx
          });
        }
      } else {
        console.log("passedApprove");
        let txHash = await state.cfd.mint(
          state.web3.web3.utils.toWei("11"),
          {
            from: state.account,
            value: state.web3.web3.utils.toWei("1")
          }
        );

        if (txHash) {
          commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
            status: "done",
            txHash: txHash.tx
          });
        }
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
