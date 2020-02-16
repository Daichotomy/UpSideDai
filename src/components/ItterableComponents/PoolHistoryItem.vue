<template>
  <div class="page-container">
    <div class="rowObject">
      <div
        class="md-layout sections"
        style="padding-left:25px;padding-top:20px"
      >
        <div class="md-layout-item">
          <span class="rowDetails rowDetailsItem">DAI</span>
          <br />
          <span class="detailedItem"
            ><img
              style="margin-top:15px"
              :class="historyItem.direction == 'up' ? 'finger' : 'fingerFlip'"
              class="text-center finger"
              src="../../assets/point.png"
            />
            {{ historyItem.direction }}</span
          >
        </div>
        <div class="md-layout-item">
          <span class="rowDetails rowDetailsItem">Amount</span>
          <div style="margin-top:10px" />
          <span class="detailedItem" style="margin-top:15px">
            {{ historyItem.amount }}</span
          >
        </div>
        <div class="md-layout-item">
          <span class="rowDetails rowDetailsItem">Buy Price</span>
          <div style="margin-top:10px" />
          <span class="detailedItem" style="margin-top:15px">
            {{ historyItem.amount }}</span
          >
        </div>
        <div class="md-layout-item">
          <span class="rowDetails rowDetailsItem">WithDrawal Date</span>
          <div style="margin-top:10px" />
          <span class="detailedItem" style="margin-top:15px">
            {{ historyItem.amount }}</span
          >
        </div>
        <div class="md-layout-item">
          <md-button class="withdrawalButton" @click="deposit()"
            >withdraw</md-button
          >
        </div>
      </div>

      <!-- {{ historyItem }} -->
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from "vue-lottie";

export default {
  name: "TradeHistory",
  components: {},
  data() {
    return {};
  },
  methods: {},
  props: {
    historyItem: {
      type: Object
    }
  }
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

.rowObject {
  width: 851px;
  height: 102px;
  left: 331px;
  top: 433px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  //   box-sizing: border-box;
  border-radius: 30px;
}
.rowDetails {
  width: 80px;
  height: 33px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  text-align: center;
  color: #c4c4c4;
}
.rowDetailsItem {
  text-align: center;
  vertical-align: middle;
}

.detailedItem {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 25px;
  line-height: 29px;
  align-items: center;
  text-align: center;
}
.finger {
  padding: 0px;
  position: relative;
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
}
.fingerFlip {
  padding-top: 0px;
  position: relative;
  width: 25px;
  height: 25px;
  transform: rotate(180deg);
  margin-bottom: 10px;
}
.withdrawalButton {
  background: #fece4d;
  border-radius: 15px;
  border: none;
  color: #473144;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  height: 50px;
  font-weight: 500;
}
</style>
