<template>
  <div class="page-container">Pool History</div>
</template>

<script>
import router from "@/router";

export default {
  name: "PoolHistory",
  components: {},
  data() {
    return {};
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
@import "../../styles/variables.scss";
</style>
