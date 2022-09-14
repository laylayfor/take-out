<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="header">
                <span>账号列表</span>
            </div>
            <!-- 表格 -->
            <el-table :data="tableData" :style="{width: '100%'}" ref="tableRef"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"> </el-table-column>

                <el-table-column prop="account" label="账号"> </el-table-column>

                <el-table-column prop="userGroup" label="用户组"> </el-table-column>

                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        <!-- {{scope.row.ctime}} -->
                        {{scope.row.ctime| formatDate(1)}}
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                        <!-- 气泡提示框 -->
                        <el-popconfirm @confirm="handleDelete(scope.row)" confirm-button-text='好的'
                            cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="确定要删除这个用户吗？">
                            <el-button slot="reference" size="mini" type="danger">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :page-sizes="[3, 5]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <!-- 按钮 -->
            <div class="btn">
                <el-button size="small" type="danger" @click="handleBranchDel">批量删除</el-button>
                <el-button size="small" type="primary" @click="handleClearSelect">取消选择</el-button>
            </div>
            <!-- 编辑弹窗 -->
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                <el-form :model="formData" label-width="80px" size="mini">
                    <el-form-item label="账号">
                        <el-input v-model="formData.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formData.passsword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组">
                        <el-select v-model="formData.userGroup" placeholder="请选择用户组">
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import { getUserListReq, delUserReq, batchDelUserReq } from "@/api/user";
import tableWidth from '@/mixins/tableWidth'

export default {
    data() {
        return {
            changeNumber1: 1,
            // 数据列表
            tableData: [],
            // 当前页
            currentPage: 1,
            // 每页条数
            pageSize: 5,
            // 总条数
            total: 0,
            // 编辑页面表单,
            formData: {
                account: '',
                passsword: '',
                userGroup: '',
            },
            dialogFormVisible: false, // 弹窗开关
            ids: '',
            tableWidth: '100%',
            tableRef: {},
        };
    },
    // 生命周期创建后，已经有数据，用于发送请求
    created() {
        // 初始化时发送ajax请求
        this.getData();
    },

    methods: {
        // 获取数据
        async getData() {
            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            // 发送请求
            let res = await getUserListReq({ currentPage, pageSize });
            // console.log('账户列表获取后台数据', res.data);
            // 解构数据
            let { data, total } = res.data;
            this.tableData = data;
            this.total = total;

            // 判断，如果数据data为空且不是第一页，则取上一页数据b
            if (data.length === 0 && this.currentPage !== 1) {
                this.currentPage--;
                this.getData();
            }
        },

        // 删除功能
        async delUser(id) {
            let res = await delUserReq({ id });
            let { code, msg } = res.data;
            if (code === 0) {
                // 删除完成后重新渲染页面
                this.getData();
            } else {
            }
        },
        // 编辑
        handleEdit(index, row) {
            // console.log(index, row);
            this.dialogFormVisible = true;
        },
        // 删除
        handleDelete(index, row) {
            // console.log(index, row);
            // 拿到id 
            let { id } = row;
            // console.log(id);

            // 发送请求
            this.delUser(id);

        },
        handleSizeChange(val) {
            // 把val 赋值给每页条数
            this.pageSize = val;
            // 把当前页切换为1，看起来好看QAQ
            this.currentPage = 1;
            // 重新获取数据
            this.getData();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            /**
             * 大体内容为：
             *       根据传入参数，将点击的当前页更新，然后重新发送请求，后端将对应页数的数据反馈到前端
             */
            // 把val当前页赋值给 currentPage
            this.currentPage = val;
            // 再次发送请求
            this.getData();
            console.log(`当前页: ${val}`);
        },
        // 取消选择

        handleClearSelect() {
            this.$refs.tableRef.clearSelection();
        },
        // 全部删除
        handleBranchDel() {
            // 判断是否选择数据，未选择发出提示
            if (!this.ids || this.ids === '[]') {
                this.$message.info('未选择');
                return;
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 发送请求
                let res = await batchDelUserReq({ ids: this.ids })
                let { code, msg } = res;



                this.getData();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        // 获取选择的数据的id
        handleSelectionChange(val) {
            this.ids = JSON.stringify(val.map(v => {
                return v.id;
            }))
        }
    },
    // mixins 抽离公共js逻辑
    mixins: [tableWidth],
}
</script>

<style lang="scss" scoped>
:deep(.el-pagination) {
    margin-top: 20px;
}

:deep(.el-table-column--selection .cell) {
    padding: 0 10px;
}

.btn {
    margin-top: 20px;
}

:deep(.el-button) {
    margin: 0 5px;
}
</style>