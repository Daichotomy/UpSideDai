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
              <span class="infoText"
                >Input Dai<br />
                to send</span
              >
              <br />
              <span>
                <md-field
                  md-inline
                  style="
    padding-top: 5px;
    margin-bottom: 5px;"
                >
                  <label style="margin-left:80px">To Deposit...</label>
                  <md-input
                    v-model="inputDaiAmount"
                    class="inputDai"
                    type="number"
                  ></md-input>
                </md-field>
              </span>
              <span class="SoftFont">
                Ballance:
                <img class="text-center clock" src="../../assets/dai.png" />
                {{ daiBallance }}</span
              >
            </div>
            <div>
              <div style="padding-top:30px; padding-bottom:0px">
                <span class="infoText"
                  >Choose your<br />
                  position
                  <span class="Question"
                    >?
                    <md-tooltip md-direction="top" class="toolTip"
                      >Bet on a direction that you think Dai will
                      move.</md-tooltip
                    >
                  </span></span
                >
              </div>
              <div class="md-layout">
                <div class="md-layout-item" @click="changeDirection()">
                  <div
                    class="md-layout-item"
                    :class="
                      direction == null
                        ? ''
                        : direction == 'down'
                        ? 'spinClockwise'
                        : 'spinCounterClockwise'
                    "
                  >
                    <div>
                      <img
                        style="margin-top:15px"
                        class="text-center finger"
                        src="../../assets/point.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding-top:0px">
                <span class="yellowText">{{
                  direction == "up" || direction == null ? "UpDAI" : "DownDAI"
                }}</span>
              </div>
            </div>
            <div class="md-layout-item" style="padding-top:30px">
              <span class="infoText"
                >{{
                  direction == "up" || direction == null ? "UpDAI" : "DownDAI"
                }}<br />
                buy price</span
              >
              <br />
              <span class="buyPrice">{{ buyPrice }}</span>
              <div style="padding-top:7px" />
              <span class="SoftFont">
                <img class="text-center clock" src="../../assets/clock.png" />
                Withdrawal Date:
                <br />
                <span class="yellowText">{{ maturity }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="md-layout-item">
        <md-button class="Deposit" @click="deposit()">Buy</md-button>
      </div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from "vue-lottie";

export default {
  name: "trade",
  components: {},
  data() {
    return {
      daiPrice: 1.0101,
      inputDaiAmount: 420.69,
      buyPrice: 1.101,
      direction: null,
      daiBallance: 100.92,
      maturity: "16th March"
    };
  },
  methods: {
    changeDirection() {
      if (this.direction == null) {
        this.direction = "down";
        return;
      }
      if (this.direction == "up") {
        this.direction = "down";
        return;
      }
      if (this.direction == "down") {
        this.direction = "up";
        return;
      }
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
  font-weight: 200 !important;
  font-size: 30px !important;
  line-height: 40px;
  display: flex;
  width: 150px;
  padding-top: 0px !important;
  margin-top: 0px !important;
  margin-left: 80px !important;
}

.priceBlobText {
  font-family: Roboto;
  font-style: normal;
  font-weight: 200 !important;
  font-size: 35px;
  line-height: 60px;
  align-items: center;
  text-align: center;
  padding: 20px;
  color: #ffba01;
  width: 216px;
  height: 80px;
  left: 238px;
  top: 313px;
  background: rgba(254, 206, 77, 0.3);
  border-radius: 10px;
}
.tradeBox {
  margin: 15px;
  width: 600px;
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
  border: 2px solid #ffba00;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.directionNotSelected {
  width: 85px;
  height: 85px;
  background: #ffffff;
  // border: 2px solid #FFBA00;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
.finger {
  padding: 0px;
  position: relative;
  width: 80px;
  height: 80px;
}
.fingerFlip {
  padding-top: 0px;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(180deg);
}
.Deposit {
  background: #ffba00;
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
  font-size: 12px;
  // line-height: 18px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #c4c4c4;
  border-radius: 50%;
  width: 64px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
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
.yellowText {
  font-size: 14px;
  line-height: 16px;
  color: #ffba01;
}
.spinClockwise {
  animation-name: spinClockwise;
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes spinClockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
.spinCounterClockwise {
  animation-name: spinCounterClockwise;
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes spinCounterClockwise {
  from {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
