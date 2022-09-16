<template>
  <div>
    {{ tableData }}
  </div>
</template>

<script>
import { getOrderDetailReq } from "@/api/order";
export default {
  data() {
    return {
      tableData: {},
      id: "",
    };
  },
  methods: {
    async getData() {
      let id = this.id;
      let res = await getOrderDetailReq({ id });
      this.tableData = res.data;
      console.log(res);
    },
  },
  created() {
    // 将路由传递的参数赋值给id，用于拉取数据
    this.id = this.$route.query.id;
    // console.log(this.id)
    this.getData();
  },
};
</script>

<style lang="scss" scoped></style>
