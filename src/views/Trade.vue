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
          <div class="md-layout tradeBoxItem">
            <div class="md-layout-item" style="padding-top:70px">
              <span class="infoText">Dai</span>
              <br />
              <span class="inputDai">
                <md-field md-inline>
                  <label>To Deposit...</label>
                  <md-input v-model="inputDaiAmount" class="inputDai" type="number"></md-input>
                </md-field>
              </span>
            </div>
            <div class="md-layout-item">b</div>
            <div class="md-layout-item">c</div>
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
      inputDaiAmount: 420.69
    };
  },
  methods: {},
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
.tradeBoxItem {
}
</style>
