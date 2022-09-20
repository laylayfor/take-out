<template>
  <div>
    <el-card>
      <div class="header" slot="header">
        <span>后台首页</span>
      </div>

      <div class="content">
        <!-- 封装插槽，作用域插槽 -->
        <card-list v-for="item in cardData" :key="item.name" :cardData="item">
          <template slot="title" slot-scope="scope">{{ scope.title }}</template>
          <template slot="count" slot-scope="scope">{{
            scope.count | formatNum
          }}</template>
        </card-list>
      </div>
      <!-- echarts -->
      <echarts-vue :echartsData="echartsData" v-if="flag"></echarts-vue>
    </el-card>
  </div>
</template>

<script>
import { getTotalDataReq, getOrderTotalDataReq } from "@/api/home";
import CardList from "./CardList.vue";
import { formatNum } from "@/filters/index";
import EchartsVue from "../../components/Echarts.vue";
export default {
  components: {
    CardList,
    EchartsVue,
  },
  data() {
    return {
      //   totalData: {},
      cardData: [],
      echartsData: {},
      flag: false,
    };
  },
  methods: {
    async getData() {
      let res = await getTotalDataReq({});
      let {
        xData,
        orderData,
        amountData,
        totalOrder,
        totalAmount,
        todayOrder,
        totayAmount,
      } = res.data;
      //   console.log("orderData", orderData, amountData);
      // 封装echarts的数据
      this.echartsData = {
        title: "数据统计",
        legend: ["订单", "销售额"],
        xdata: xData,
        series: [
          {
            name: "订单",
            type: "line",
            stack: "Total",
            data: orderData,
          },
          {
            name: "销售额",
            type: "line",
            stack: "Total",
            data: amountData,
          },
        ],
      };
      this.flag = true;
      //   console.log("echartsData1", this.echartsData);
      // 封装传入卡片子组件的数据
      this.cardData = [
        {
          name: "总订单",
          count: totalOrder,
          img: require("./../../assets/images/total-order.svg"),
        },
        {
          name: "总销售额",
          count: totalAmount,
          img: require("./../../assets/images/total-amount.svg"),
        },
        {
          name: "今日订单数",
          count: todayOrder,
          img: require("./../../assets/images/order.svg"),
        },
        {
          name: "今日销售额",
          count: totayAmount,
          img: require("./../../assets/images/amount.svg"),
        },
      ];
      //   console.log(res);
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  :deep(div) {
    flex: 1;
    margin: 5px;
  }
}
:deep(.el-card__body) {
  background-color: rgba(203, 201, 201, 0.7);
}
</style>
