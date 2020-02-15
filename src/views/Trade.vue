<template>
  <div class="page-container">
    <div class="md-layout sections">
      <div class="md-layout-item"></div>
      <div class="md-layout-item md-size-15" style="padding-top:75px">
        <span class="infoText">Current Dai Price</span>
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
            <div class="md-layout-item" style="padding-top:70px">
              <span class="infoText">Dai</span>
              <br />
              <span class="inputDai">
                <md-field md-inline>
                  <label>To Deposit...</label>
                  <md-input
                    v-model="inputDaiAmount"
                    class="inputDai"
                    type="number"
                  ></md-input>
                </md-field>
              </span>
            </div>

            <div>
              <div class="md-layout">
                <div class="md-layout-item" @click="changeDirection(true)">
                  <div class="md-layout-item" style="padding-top:70px">
                    <div
                      :class="
                        directionLong
                          ? 'directionSelected'
                          : 'directionNotSelected'
                      "
                    >
                      <img
                        class="text-center finger"
                        src="../assets/point.png"
                      />
                    </div>
                  </div>
                </div>
                <div class="md-layout-item" @click="changeDirection(false)">
                  <div class="md-layout-item" style="padding-top:70px">
                    <div
                      :class="
                        !directionLong
                          ? 'directionSelected'
                          : 'directionNotSelected'
                      "
                    >
                      <img
                        class="text-center fingerFlip"
                        src="../assets/point.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <br />

                <span class="Question"
                  >?
                  <md-tooltip md-direction="bottom" class="toolTip"
                    >Bet on a direction that you think Dai will move.</md-tooltip
                  >
                </span>
                <!-- <md-tooltip md-direction="bottom">Bottom</md-tooltip> -->
              </div>
            </div>
            <div class="md-layout-item">
              <md-button class="Deposit" @click="deposit()">Buy</md-button>
            </div>
          </div>
        </div>
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
      daiPrice: 420.69,
      inputDaiAmount: 420.69,
      directionLong: true
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
@import "../styles/variables.scss";

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
  width: 250px;
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
  width: 694px;
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
}
.directionNotSelected {
  width: 85px;
  height: 85px;
  background: #ffffff;
  // border: 2px solid #fece4d;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
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
  margin-top: 75px;
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
  font-size: 20px;
  // line-height: 18px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  background: #c4c4c4;
  border-radius: 50%;
  width: 64px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 11px;
  padding-right: 11px;
}
.toolTip {
  background-color: #c4c4c4;
  // padding-
}
</style>
