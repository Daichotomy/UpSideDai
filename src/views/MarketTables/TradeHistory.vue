<template>
  <div class="page-container">
    <div class="md-layout sections">
      <div class="md-layout-item"></div>
      <div class="md-layout-item">
        <br />
        <br />
        <br />
        <TradeHistoryItem
          v-for="item in tableData"
          :historyItem="item"
          class="rowItem"
        />
      </div>
      <div class="md-layout-item"></div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import TradeHistoryItem from "../../components/ItterableComponents/TradeHistoryItem.vue";

export default {
  name: "Trade",
  components: { TradeHistoryItem },
  data() {
    return {
      tableData: [
        {
          direction: "up",
          amount: 2507,
          buyPrice: 0.97,
          RedemptionDate: "15.02.2019"
        },
        {
          direction: "down",
          amount: 3507,
          buyPrice: 1.01,
          RedemptionDate: "15.02.2019"
        }
      ]
    };
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
.rowItem {
  padding: 10px;
}
</style>
