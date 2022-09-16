<template>
  <div>
    <el-card>
      <div class="header" slot="header">
        <span>订单管理</span>
      </div>
      <!-- 查询表单 -->
      <el-form inline size="mini" :model="formData">
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input placeholder="订单号" v-model="formData.orderNo"></el-input>
        </el-form-item>
        <!-- 收件人 -->
        <el-form-item label="收件人">
          <el-input
            placeholder="收件人"
            v-model="formData.consignee"
          ></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="formData.phone"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态">
          <el-select v-model="formData.orderState">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择时间 -->
        <el-form-item label="选择时间">
          <template>
            <el-date-picker
              v-model="formData.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd hh:mm:ss"
            >
            </el-date-picker>
          </template>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <el-button @click="search()" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table size="small " :data="tableData">
        <!-- 订单号 -->
        <el-table-column prop="orderNo" label="订单号"></el-table-column>
        <!-- 下单时间 -->
        <el-table-column prop="orderTime" label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.orderTime | formatDate(2) }}
          </template>
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column
          width="120px"
          prop="phone"
          label="手机号"
        ></el-table-column>
        <!-- 收货人 -->
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <!-- 配送地址 -->
        <el-table-column
          width="120px"
          prop="deliverAddress"
          label="配送地址"
        ></el-table-column>
        <!-- 配送时间 -->
        <el-table-column prop="deliveryTime" label="送达时间">
          <template slot-scope="scope">
            {{ scope.row.deliveryTime | formatDate(2) }}
          </template>
        </el-table-column>
        <!-- 用户备注 -->
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <!-- 订单号 -->
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <!-- 订单状态 -->
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <!-- 操作 -->
        <el-table-column width="100px" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)"
              >查看</el-button
            >
            <el-button type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,  prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getOrderListReq } from "@/api/order";
import { formatDate } from "@/filters/index";
export default {
  data() {
    return {
      formData: {
        orderNo: "", // 订单号
        consignee: "", // 收货人
        phone: "", // 电话
        orderState: "", // 订单状态
        date: "", // 日期范围
      },
      currentPage: 1, // 当前页
      pageSize: 6, // 每页条数
      total: 0, // 总条数
      tableData: [],
    };
  },
  methods: {
    // 获取数据
    async getData(form) {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      let res = await getOrderListReq({ currentPage, pageSize, ...form });
      // console.log(res);
      // 解构数据
      let { data, total } = res.data;
      this.tableData = data;
      this.total = total;
      // console.log(this.tableData);
    },
    // 查询功能
    search() {
      this.currentPage = 1;
      // 修改日期格式
      let date = JSON.stringify(this.formData.date);
      this.getData({ ...this.formData, date });
      console.log(this.formData.date);
    },
    // 查看
    handleClick(row) {},
    // 编辑
    handleEdit(row) {
      // console.log(row.id);
      let { id } = row;
      this.$router.push({ path: "/order/order-detail", query: { id } });
    },
    // 改变页面
    handleCurrentChange(val) {
      // console.log('改变页面');
      // 将页码重新赋值
      this.currentPage = val;
      // 重新拉取数据
      this.getData(this.formData);
    },
  },
  created() {
    // 发送请求
    this.getData();
  },
};
</script>

<style lang="scss" scoped></style>
