<template>
  <div class="page-container">
    <div class="md-layout sections">
      <div class="md-layout-item"></div>
      <div class="md-layout-item">
        <div style="padding-top:75px" />
        <span class="SectionHeading">My active pools</span>
        <div style="padding-top:10px" />
        <span class="SectionDetails">
          As a liquidity provider you need to wait until contract maturity
          before you can withdraw.</span
        >
        <div style="padding-top:10px" />
        <PoolHistoryItem
          v-for="item in tableData"
          :historyItem="item"
          class="rowItem"
        />

        <div style="padding-top:50px" />
        <span class="SectionHeading">My Historical pool positions</span>
        <div style="padding-top:10px" />
        <span class="SectionDetails">
          Pool liquidity provision you've made in the past and closed off.</span
        >
        <div style="padding-top:10px" />
        <PoolHistoryItem
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
import PoolHistoryItem from "../../components/ItterableComponents/PoolHistoryItem.vue";

export default {
  name: "PoolHistory",
  components: { PoolHistoryItem },
  data() {
    return {
      tableData: [
        {
          amount: 2507,
          redemptionDate: "15.02.2019",
          disabled: false,
          profit: 5
        },
        {
          amount: 3507,
          redemptionDate: "15.03.2019",
          disabled: true,
          profit: 8
        },
        {
          amount: 420.69,
          redemptionDate: "15.03.2019",
          disabled: true,
          profit: 3
        }
      ],
      tableDataHistory: [
        {
          amount: 2507,
          redemptionDate: "15.01.2019",
          profit: 3,
          past: true
        },
        {
          amount: 3507,
          redemptionDate: "15.01.2019",
          profit: 3,
          past: true
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
