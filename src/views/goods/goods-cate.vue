<template>
  <div>
    <el-card>
      <!-- 标题 -->
      <div class="header" slot="header">
        <span>商品分类</span>
        <!-- 添加商品分类 -->
        <el-button
          type="primary"
          size="small"
          @click="centerDialogVisible = true"
          >添加分类
        </el-button>
        <el-dialog
          title="添加分类"
          :visible.sync="centerDialogVisible"
          width="50%"
          center
        >
          <el-form :model="formData" label-width="90px">
            <el-form-item label="分类名称">
              <el-input v-model="formData.cateName"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch v-model="formData.state"></el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="centerDialogVisible = false"
              >取 消</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="
                handleAddCate();
                centerDialogVisible = false;
              "
              >确 定
            </el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 表格内容 -->
      <el-table :data="tableData">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{ scope.row.cateName }}</span>

            <el-input
              v-if="scope.row.isEdit"
              size="mini"
              v-model="scope.row.cateName"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否应用">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.isEdit"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              :type="scope.row.isEdit ? 'success' : ''"
            >
              {{ scope.row.isEdit ? "完成" : "编辑" }}
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
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
import {
  getCateListReq,
  editCateReq,
  delCateReq,
  addCateReq,
} from "@/api/goods";
// import tableWidth from '@/mixins/tableWidth';
export default {
  // mixins: [tableWidth],
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0, // 总条数
      centerDialogVisible: false,
      formData: {
        cateName: "",
        state: true,
      },
    };
  },
  methods: {
    // 获取数据
    async getData() {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      // 获取数据
      let res = await getCateListReq({ currentPage, pageSize });
      // console.log(res);
      // 解构数据
      let { data, total } = res.data;
      // 修改数据格式
      data.forEach((v) => {
        v.state = v.state ? true : false;
        // 增加一个是否可编辑字段
        v.isEdit = false;
      });
      // 数据赋值
      this.tableData = data;
      this.total = total;
      if (data.length === 0 && this.currentPage !== 1) {
        this.currentPage--;
        this.getData();
      }
    },

    // 添加分类
    async handleAddCate() {
      // console.log("添加分类");
      // 修改数据格式： state,true为1，false为0
      let temp = { ...this.formData, state: this.formData.state ? 1 : 0 };
      // 向后端提交数据
      let res = await addCateReq(temp);
      let { code } = res;
      if (code === 0) {
        this.getData();
      }
    },
    // 编辑
    async handleEdit(row) {
      row.isEdit = !row.isEdit;
      // 判断，当按钮为 完成 时，发送请求
      if (!row.isEdit) {
        // 修改状态码
        row.state = row.state ? 1 : 0;
        // console.log(temp);
        // 发送请求
        let res = editCateReq(row); // { ...row, state: row.state ? 1 : 0 }
        // console.log(res);
      }
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(async () => {
          let id = row.id;
          // 向后端提交数据
          let res = await delCateReq({ id });
          let { code } = res;
          // 判断是否提交成功，提交成功则重新拉取数据
          if (code === 0) {
            this.getData();
          }
          // console.log(res);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 改变页面
    handleCurrentChange(val) {
      // console.log('改变页面');
      // 将页码重新赋值
      this.currentPage = val;
      // 重新拉取数据
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-dialog) {
  min-width: 450px;
}
</style>
