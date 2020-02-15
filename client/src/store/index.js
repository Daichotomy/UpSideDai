import Web3 from "web3";
import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import moment from "moment";

import {
  getEtherscanAddress,
  getNetIdString,
}
from "@/utils/lookupTools";

import * as actions from "./actions";
import * as mutations from "./mutation-types";

// import truffleContract from "truffle-contract";

// import CherryswapABI from "@cherryswap/smart-contracts/build/contracts/Cherryswap.json"

// const Cherryswap = truffleContract(CherryswapABI);
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: null,
    account: null,
    currentNetwork: null,
    etherscanBase: null,
    // cherryswap: null,
    miningTransactionObject: {
      status: null,
      txHash: ''
    }
  },
  mutations: {
    //WEB3 Stuff
    [mutations.SET_ACCOUNT](state, account) {
      console.log("Account set")
      console.log(account)
      state.account = account;
    },
    [mutations.SET_CURRENT_NETWORK](state, currentNetwork) {
      state.currentNetwork = currentNetwork;
    },
    [mutations.SET_ETHERSCAN_NETWORK](state, etherscanBase) {
      state.etherscanBase = etherscanBase;
    },
    [mutations.SET_WEB3]: async function (state, web3) {
      state.web3 = web3;
    },
    [mutations.SET_CHERRYSWAPP]: async function (state, cherryswap) {
      state.cherryswap = cherryswap;
    },
    [mutations.SET_MINING_TRANSACTION_OBJECT](state, miningTransactionObject) {
      state.miningTransactionObject = miningTransactionObject;
    },
  },
  actions: {
    [actions.GET_CURRENT_NETWORK]: function ({
      commit,
      dispatch,
      state
    }) {
      getNetIdString().then(currentNetwork => {
        commit(mutations.SET_CURRENT_NETWORK, currentNetwork);
      });
      getEtherscanAddress().then(etherscanBase => {
        commit(mutations.SET_ETHERSCAN_NETWORK, etherscanBase);
      });
    },

    [actions.INIT_APP]: async function ({
      commit,
      dispatch,
      state
    }, web3) {
      // FundFactory.setProvider(web3.currentProvider)
      // Set the web3 instance
      // Cherryswap.setProvider(web3.currentProvider)
      console.log("IN STORE")
      console.log(web3)
      commit(mutations.SET_WEB3, {
        web3
      });
      console.log("set")

      dispatch(actions.GET_CURRENT_NETWORK);

      let accounts = await web3.eth.getAccounts();
      let account = accounts[0];
      if (account) {
        commit(mutations.SET_ACCOUNT, account);
      }

      // let cherryswap = await Cherryswap.deployed()
      // console.log("contract")
      // console.log(cherryswap)

      commit(mutations.SET_CHERRYSWAPP, cherryswap)

      // let fundFactory = await FundFactory.at(state.factoryAddress)
      console.log("logging vyper from UI")
      // let numberOfFunds = await fundFactory.getAllFundUids()

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
    [actions.CLOSE_MINING_DIALOG]: async function ({
      commit,
      dispatch,
      state
    }) {
      commit(mutations.SET_MINING_TRANSACTION_OBJECT, {
        status: null,
        txHash: ""
      })
    },

  }
})