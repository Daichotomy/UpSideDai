<template>
  <div class="page-container">
    <!-- v-bind:style="'height: '+windowHeight*2+' !important'" -->
    <div class="inner-container">
      <h1 style="text-align: center">
        Get Stable or Dai Trying
      </h1>
      <h3>
        We are fixing dai, one call at a time.
      </h3>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import Lottie from "vue-lottie";

export default {
  name: "home",
  components: {
    Lottie,
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

.page-container {
  background: rgba($vanilla, 1);
}
.page-container img {
  width: 75vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.inner-container {
  margin: 0px auto;
  padding: 0 5%;
  text-align: center;
}
.inner-container h1 {
  color: $cherry;
  line-height: 1.25em;
  font-size: 4em;
}
.inner-container h3 {
  line-height: 1.5em;
  font-size: 1.3em;
}
.landing-container {
}
.landing-back {
  background: #fff;
  width: 100%;
}
.middle-container {
  width: 100%;
  padding: 2vw 0;
  display: flex;
  justify-content: space-around;
}
.middle-container p.box {
  font-size: 16px;
  line-height: 1.5em;
  padding: 0 5%;
}
.footer-container {
  justify-content: center;
}
.call-to-action {
  height: 200px;
  background: $lightcherry;
  display: flex;
  justify-content: center;
}
.call-Button {
  background-color: #d81e5b; /* Green */
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
#logo {
  height: 24px;
  width: auto;
  display: inline;
}
#how-it-works {
  text-align: center;
  background: $lightcherry;
  padding: 2.5% 0;
}
#how-it-works h1 {
  color: $brown;
}
#md-toolbar {
  padding: 10px;
}
@media only screen and (min-width: 768px) {
  .inner-container {
    width: 60vw;
  }
  #lottie-svg {
    max-width: 900px;
  }
}
</style>
