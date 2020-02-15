<template>
  <div class="page-container" style="padding-top:50px">
    <div class="md-layout sections">
      <div class="md-layout-item"></div>
      <div class="md-layout-item">
        <div class="SelectToggle">
          <div class="md-layout">
            <div
              class="md-layout-item"
              :class="
                mode == 'trade' ? 'selectedSection' : 'notSelectedSection'
              "
              @click="toggleMode('trade')"
            >
              My Trades
            </div>
            <div
              class="md-layout-item"
              :class="mode == 'pool' ? 'selectedSection' : 'notSelectedSection'"
              @click="toggleMode('pool')"
            >
              My Pool
            </div>
            <!-- <div class="md-layout-item">Pool</div> -->
          </div>
        </div>
      </div>
      <div class="md-layout-item"></div>
    </div>
    <div style="padding-top:20px">
      <TradeHistory v-if="mode == 'trade'" />
      <PoolHistory v-if="mode == 'pool'" />
    </div>
  </div>
</template>

<script>
import router from "@/router";
import TradeHistory from "./MarketTables/TradeHistory.vue";
import PoolHistory from "./MarketTables/PoolHistory.vue";

export default {
  name: "market",
  components: { TradeHistory, PoolHistory },
  data() {
    return {
      mode: "trade"
    };
  },
  methods: {
    toggleMode(mode) {
      this.mode = mode;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.SelectToggle {
  position: absolute;
  width: 600px;
  height: 60px;
  background: #e5e5e5;
  border-radius: 20px;
  //   text-align: center;
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
}

.selectedSection {
  // position: absolute;
  width: 265px;
  height: 60px;
  background: #ffba01;
  border-radius: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  line-height: 21px;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  padding-top: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.notSelectedSection {
  // position: absolute;
  width: 265px;
  height: 60px;
  // background: #ffba01;
  border-radius: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  line-height: 21px;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  // display: inline-block;
  padding-top: 20px;
  cursor: pointer;
  transition: 0.3s;
}
</style>
