<template>
  <div class="page-container">
    <div class="md-layout sections md-gutter">
      <div class="md-layout-item md-size-10" />
      <div class="md-layout-item">
        <img class="meme" src="../assets/landingMeme.png" />
      </div>
      <div class="md-layout-item text-center" style="padding-top:100px">
        <span class="landingText"
          >Do you have lows and highs daily?<br />
          Everyone does. Even DAI.</span
        >
      </div>
      <div class="md-layout-item md-size-10" />
    </div>
    <div class="md-layout sections">
      <div class="md-layout-item">
        <md-button
          class="call-Button"
          style="margin-top:50px"
          @click="goToCreate"
          >Leverage Dai</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from "vue-lottie";

export default {
  name: "home",
  components: {
    Lottie
  },
  data() {
    return {};
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
      // this.anim.stop();
    },
    goToCreate() {
      router.push({ name: "market" });
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowHeight = window.innerHeight;
      });
    });
  }
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
.meme {
  //   width: 600px;
}
.landingText {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  text-align: center;
  color: #000000;
}
</style>
