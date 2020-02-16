<template>
  <div class="page-container">
    <div class="md-layout sections">
      <div class="md-layout-item"></div>
      <div class="md-layout-item">
        <div style="padding-top:75px" />
        <span class="SectionHeading">My active trades</span>
        <div style="padding-top:10px" />
        <span class="SectionDetails">
          Remember when selling your Up/Down DAI before the withdrawal date, the
          selling price might vary.</span
        >
        <div style="padding-top:10px" />
        <TradeHistoryItem
          v-for="item in tableData"
          :historyItem="item"
          class="rowItem"
        />

        <div style="padding-top:50px" />
        <span class="SectionHeading">My Historical trades</span>
        <div style="padding-top:10px" />
        <span class="SectionDetails">
          Trades you've had in the past and closed off and redeemed.</span
        >
        <div style="padding-top:10px" />
        <TradeHistoryItem
          v-for="item in tableDataHistory"
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
        },
        {
          direction: "up",
          amount: 420.69,
          buyPrice: 0.98,
          RedemptionDate: "15.02.2019"
        }
      ],
      tableDataHistory: [
        {
          direction: "up",
          amount: 2507,
          buyPrice: 0.97,
          RedemptionDate: "15.02.2019",
          disabled: true,
          profit: 3
        },
        {
          direction: "down",
          amount: 3507,
          buyPrice: 1.01,
          RedemptionDate: "15.02.2019",
          disabled: true,
          profit: -1
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
.SectionHeading {
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  padding: 30px;
}
.SectionDetails {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
  padding: 30px;
  color: #000000;
}
</style>
