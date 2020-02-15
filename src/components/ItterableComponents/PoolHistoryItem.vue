<template>
  <div class="page-container">
    <div class="rowObject">
      <div class="md-layout" style="padding-left:40px;padding-top:15px">
        <div class="md-layout-item">
          <span class="rowDetails">DAI</span>
        </div>
        <div class="md-layout-item"></div>
        <div class="md-layout-item"></div>
        <div class="md-layout-item"></div>
        <div class="md-layout-item"></div>
      </div>

      {{ historyItem }}
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
.rowObject {
  width: 851px;
  height: 102px;
  left: 331px;
  top: 433px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
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
  display: flex;
  align-items: center;
  text-align: center;
  color: #c4c4c4;
}
</style>
