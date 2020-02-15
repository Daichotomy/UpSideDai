<template>
  <div class="page-container">
    <div class="rowObject">
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
</style>
