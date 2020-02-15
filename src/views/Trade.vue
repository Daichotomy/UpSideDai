<template>
  <div class="page-container">
    <div class="md-layout sections">
      <div class="md-layout-item">blank</div>
      <div class="md-layout-item md-size-15">
        <span class="currentPrice">Current Dai Price</span>
        <br />
        <br />
        <div class="priceBlob">
          <span class="priceBlobText">
            {{ daiPrice }}
          </span>
        </div>
      </div>
      <div class="md-layout-item">section</div>
      <div class="md-layout-item">blank</div>
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
      daiPrice: 420.6969
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
.currentPrice {
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
}
// .priceBlob {
//   // position: absolute;
//   width: 216px;
//   height: 80px;
//   left: 238px;
//   top: 313px;
//   background: rgba(254, 206, 77, 0.3);
//   border-radius: 10px;
// }

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
</style>
