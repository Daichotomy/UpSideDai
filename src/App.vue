<template>
  <md-app id="app" md-mode="reveal" style="min-height: 100vh;">
    <md-app-toolbar md-elevation="0" id="toolbar">
      <router-link class="logo" to="/">
        <img class="logo" src="./assets/Logo.png" />
      </router-link>

      <div class="md-toolbar-section-end">
        <ul class="nav-list-right" style="padding-right:20px">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name == 'market' ? 'selected' : 'notSelected'"
              to="market"
            >Market</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="$route.name == 'myAccount' ? 'selected' : 'notSelected'"
              to="/myAccount"
            >My account</router-link>
          </li>
        </ul>
        <span>
          <clickable-address style="margin-top:20px" :eth-address="account" />
          <p style="padding-top:5px; margin-top:4px; text-align: right">{{ currentNetwork }}</p>
        </span>
      </div>
    </md-app-toolbar>

    <md-app-content id="content">
      <mining-transaction />
      <router-view />
      <div id="foot">
        <span>
          <b>
            <a href="https://github.com/Daichotomy/DaiHard">UpSideDai</a> - made
            with ❤️ by Daichotomy ☯️
          </b>
        </span>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
import MiningTransaction from "@/components/widgets/MiningTransaction";

import Web3 from "web3";
import Web3Connect from "web3connect";
import Fortmatic from "fortmatic";
import * as actions from "@/store/actions";
import * as mutations from "@/store/mutation-types";
import ClickableAddress from "@/components/widgets/ClickableAddress";
import { mapActions, mapState } from "vuex";
import router from "@/router";

export default {
  name: "app",
  components: { ClickableAddress, MiningTransaction },
  data() {
    return {
      web3: null,
      web3Detected: true,
      menuVisible: false
    };
  },
  methods: {
    ...mapActions(["INIT_APP"]),
    redirect(_path) {
      router.push({ name: _path });
    },
    async connectWallet() {
      const provider = await this.web3Connect.connect();

      this.web3 = new Web3(provider);

      await this.INIT_APP(this.web3);
    }
  },
  async mounted() {
    const providerOptions = {
      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: process.env.VUE_APP_FORTMATIC_KEY // required
        }
      }
    };

    this.web3Connect = new Web3Connect.Core({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    this.connectWallet();
  },
  computed: {
    ...mapState(["currentNetwork", "account"])
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Space+Mono");
@import url("https://fonts.googleapis.com/css?family=Coiny|Rubik");
@import "/styles/variables.scss";
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@import "~vue-material/dist/theme/all"; // Apply the theme

html,
body {
  font-family: "Rubik", sans-serif;
  background-color: $white;
}
#app {
  color: #2c3e50;
}
#toolbar {
  background-color: $white;
  width: 100%;
  align-self: center;
}
#toolbar a {
  text-align: center;
}
#app {
  font-family: "Rubik", sans-serif;
}
nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
#foot {
  background-color: $white;
  padding: 25px;
  text-align: center;
}
#content {
  background-color: $white;
  padding: 0;
  height: auto;
}
.md-toolbar {
  min-height: 76px !important;
}
#foot span a {
  text-decoration: underline;
  color: #000;
}
@media only screen and (min-width: 768px) {
  #toolbar a {
    text-align: left;
  }
}
.nav {
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.nav-list-left {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-list-right {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-item {
  display: inline-block;
  // margin-right: 2.25rem;
}

.nav-link {
  color: black;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  padding: 15px;
}

.nav-link:hover {
  border-bottom: 1px solid #ffffff;
}
.logo {
  width: 300px;
  position: absolute;
  right: 36%;
  top: 30%;
}
.selected {
  text-decoration: underline !important;
  font-weight: bold;
}
.notSelected {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  align-items: center;
  text-align: center;

  color: #4d4d4d;
}
</style>
