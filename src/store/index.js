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
import UniSwapABI from "../../build/IUniswapFactory.json";
import UpSideDaiABI from "../../build/UpSideDai.json";

const Cfd = truffleContract(CFDABI);
const UniSwap = truffleContract(UniSwapABI);
const UpSideDai = truffleContract(UpSideDaiABI);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
    currentNetwork: null,
    etherscanBase: null,
    cfd: null,
    uniswap: null,
    miningTransactionObject: {
      status: null,
      txHash: ""
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
    [mutations.SET_UNISWAP]: async function(state, uniswap) {
      state.uniswap = uniswap;
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

      //   let uniswap = await UniSwap.deployed();
      //   console.log("contract uniswap");
      //   console.log(uniswap);
      //   commit(mutations.SET_UNISWAP, uniswap);
    },
    // [actions.COMMIT]: async function ({
    //   commit,
    //   dispatch,
    //   state
    // }, params) {

    //   console.log("commited")
    //   console.log(params)

    //   commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
    //     status: 'pending',
    //     txHash: ""
    //   })

    //   let txHash = await state.cherryswap.deposit(state.account, web3.utils.toWei(params.value + "", 'ether'), params.position, {
    //     from: state.account
    //   })

    //   if (txHash) {
    //     commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
    //       status: 'done',
    //       txHash: txHash.tx
    //     })
    //   }

    // },
    [actions.CLOSE_MINING_DIALOG]: async function({ commit, dispatch, state }) {
      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: null,
        txHash: ""
      });
    }
  }
});
