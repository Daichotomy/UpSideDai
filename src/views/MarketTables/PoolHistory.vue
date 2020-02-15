<template>
  <div class="page-container">
    <br />
    <br />
    <br />
    OBJECT<br />
    {{ tabledata }}
    <PoolHistoryItem
      v-for="item in tableData"
      :historyItem="item"
      class="rowItem"
    />
  </div>
</template>

<script>
import router from "@/router";
import PoolHistoryItem from "../../components/ItterableComponents/PoolHistoryItem.vue";

export default {
  name: "PoolHistory",
  components: { PoolHistoryItem },
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
