<template>
  <div class="page-container">
    <div class="md-layout sections md-gutter" style="padding-top:100px">
      <div class="md-layout-item md-size-10" />
      <div class="md-layout-item">
        <img class="meme" src="../assets/landingMeme.png" />
      </div>
      <div class="md-layout-item text-center" style="padding-top:100px">
        <span class="landingText"
          >Do you have highs and lows daily?<br />
          Everyone does.
          <span style="font-weight: bold;">Even </span>
          <span style="font-weight: bold; color:#FFC221">DAI.</span></span
        >
        <div style="padding-top:20px" />
        <span class="landingSecondary">
          We help you to profit your lows as much as your highs.<br />
          <span style="font-weight: bold;">UpsideDAI</span> helps you to trade
          on DAI volatility<br />
          to <span style="font-weight: bold;">leverage a 20x</span> price
          exposure.
        </span>
        <div />
        <md-button
          class="softCallToAction"
          style="margin-top:20px"
          @click="goToCreate"
          >Start your journey</md-button
        >
      </div>
      <div class="md-layout-item md-size-10" />
    </div>
    <div
      class="md-layout sectionSecond secondarySection"
      style="padding-top:50px"
    >
      <div class="md-layout-item">
        <span class="topMemeText">Killer components</span>
        <div class="md-layout-item"></div>
      </div>
    </div>
    <div class="md-layout sections secondarySection">
      <div class="md-layout-item">
        <img class="memeImage" src="../assets/meme1.png" />
        <br />
        <span class="memeTextMain">Up & Down DAI</span>
        <br />
        <br />
        <span class="memeTextSecondary">
          We help you to trade on DAI’s price <br />
          leveraging <b>20x</b> price exposure!</span
        >
      </div>
      <div class="md-layout-item">
        <img class="memeImage" src="../assets/meme2.png" />
        <br />
        <span class="memeTextMain">For traders & market makers</span>
        <br />
        <br />
        <span class="memeTextSecondary">
          Stake DAI to mint up/down DAI and auto supply it to<br />
          Uniswap to get juicy rewards<br />
          Traders -> take your position and profit on the volatility.</span
        >
      </div>
      <div class="md-layout-item">
        <img class="memeImage" src="../assets/meme3.png" />
        <br />
        <span class="memeTextMain">SETTLEMENT</span>
        <br />
        <br />
        <span class="memeTextSecondary">
          Settlement: When DAI price hits the roof/floor or after 30 days<br />
          <br />
          Redeem your up/down DAI and take that profit</span
        >
      </div>
    </div>
    <div class="md-layout sectionSecond" style="padding-top:0px">
      <div class="md-layout-item">
        <md-button
          class="callButton"
          style="margin-top:50px"
          @click="goToCreate"
          >Start your journey</md-button
        >
        <div class="md-layout-item"></div>
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
  padding-top: 25px;
  padding-bottom: 100px;
  vertical-align: middle;
}
.sectionSecond {
  text-align: center;
  vertical-align: middle;
}
.landingText {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 50px;
  align-items: center;
  text-align: center;
  color: #000000;
}
.landingSecondary {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;
  align-items: center;
  text-align: center;
}
.softCallToAction {
  background: #ffba00;
  border-radius: 15px;
  border: none;
  color: #473144;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: 60px;
  font-weight: 500;
}
.secondarySection {
  background: #ffba01;
}
.memeImage {
  height: 250px;
  width: 250px;
}
.memeTextMain {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  align-items: center;
  text-align: center;
  color: #ffffff;
}
.memeTextSecondary {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  line-height: 25px;
  align-items: center;
  text-align: center;
  color: #ffffff;
}
.topMemeText {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 35px;
  //   align-items: center;
  //   text-align: center;
  color: #ffffff;
}
.callButton {
  width: 310px;
  height: 67px;
  background: #4d4d4d;
  border-radius: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 25px;
  align-items: center;
  text-align: center;

  color: #ffffff;
}
</style>
