<template>
  <div class="page-container">
    <div class="md-layout sections">
      <div class="md-layout-item"></div>
      <div class="md-layout-item" style="padding-top:60px">
        <span class="infoText">Current Dai price</span>
        <br />
        <br />
        <div class="priceBlob">
          <span class="priceBlobText">
            {{ daiPrice }}
          </span>
        </div>
      </div>
      <div class="md-layout-item">
        <div class="tradeBox">
          <div class="md-layout">
            <div class="md-layout-item" style="padding-top:30px">
              <span class="infoText">Dai to pool</span>
              <br />
              <span>
                <md-field md-inline>
                  <label style="margin-left:80px">To Deposit...</label>
                  <md-input
                    v-model="inputDaiAmount"
                    class="inputDai"
                    type="number"
                  ></md-input>
                </md-field>
              </span>
              <div style="padding-top:10px" />
              <div class="md-layout">
                <div class="md-layout-item">
                  <span class="SoftFont"
                    ><img
                      class="text-center clock"
                      src="../../assets/dai.png"
                    />
                    Ballance:
                    {{ daiBallance }} Dai</span
                  >
                  <br />
                  <span class="SoftFont"
                    ><img
                      class="text-center ethLogo"
                      src="../../assets/eth.png"
                    />
                     Required Eth:
                    {{ ethBallance }} Eth</span
                  >
                </div>
                <div class="md-layout-item">
                  <span class="SoftFont">
                    <img
                      class="text-center clock"
                      src="../../assets/clock.png"
                    />
                    Withdrawal Date:
                    <br />
                    <span class="yellowText">{{ maturity }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item">
        <md-button class="Deposit" @click="deposit()">Pool</md-button>
      </div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from "vue-lottie";

export default {
  name: "pool",
  components: {},
  data() {
    return {
      daiPrice: 1.069,
      inputDaiAmount: 420.69,
      daiBallance: 101.69,
      ethBallance: 12.42,
      maturity: "16th March"
    };
  },
  methods: {
    changeDirection(direction) {
      this.directionLong = direction;
    },
    deposit() {
      console.log("deposit");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.sections {
  text-align: center;
  padding-top: 100px;
  padding-bottom: 100px;
  vertical-align: middle;
}
.sectionText {
  font-weight: 300;
  font-size: 24px;
  line-height: 21px;
}
.infoText {
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
}
.inputDai {
  font-weight: 300;
  font-size: 30px !important;
  line-height: 47px;
  display: flex;
  align-items: center;
  text-align: center;
  width: 230px;
  text-decoration: underline;
  padding-top: 0px !important;
  margin-top: 0px !important;
  padding-left: 20 !important;
}
.priceBlobText {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 45px;
  line-height: 53px;
  // display: flex;
  align-items: center;
  text-align: center;
  padding: 10px;

  color: rgba(0, 0, 0, 0.8);
  width: 216px;
  height: 80px;
  left: 238px;
  top: 313px;
  background: rgba(254, 206, 77, 0.3);
  border-radius: 10px;
}
.tradeBox {
  margin: 15px;
  width: 450px;
  height: 208px;
  left: 508px;
  top: 240px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  // box-sizing: border-box;
  // box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
}
.directionSelected {
  width: 85px;
  height: 85px;
  background: #ffffff;
  border: 2px solid #fece4d;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.directionNotSelected {
  width: 85px;
  height: 85px;
  background: #ffffff;
  // border: 2px solid #fece4d;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.finger {
  padding-top: 5px;
  position: relative;
  width: 75px;
  height: 75px;
}
.fingerFlip {
  padding-top: 5px;
  position: relative;
  width: 75px;
  height: 75px;
  transform: rotate(180deg);
}
.Deposit {
  background: #fece4d;
  margin-top: 85px;
  border-radius: 15px;
  border: none;
  color: #473144;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  height: 70px;
  font-weight: 500;
}
.Question {
  font-size: 18px;
  // line-height: 18px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #c4c4c4;
  border-radius: 50%;
  width: 64px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
}
.toolTip {
  background-color: #c4c4c4;
  // padding-
}
.buyPrice {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 30px;
  line-height: 47px;
  // display: flex;
  align-items: center;
  text-align: center;
  color: #ffba01;
}
.SoftFont {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(12, 1, 1, 0.5);
}
.clock {
  width: 16px;
}
.ethLogo {
  width: 12px;
}
.yellowText {
  font-size: 14px;
  line-height: 16px;
  color: #ffba01;
}
</style>
