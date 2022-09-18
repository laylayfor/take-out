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
    </el-card>
  </div>
</template>

<script>
import { getTotalDataReq, getOrderTotalDataReq } from "@/api/home";
import CardList from "./CardList.vue";
import { formatNum } from "@/filters/index";
export default {
  components: {
    CardList,
  },
  data() {
    return {
      //   totalData: {},
      cardData: [],
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
      // 封装传入子组件的数据
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
      console.log(res);
    },
  },
  created() {
    this.getData();
  },
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
