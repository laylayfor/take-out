<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="header">
                <span>账号列表</span>
            </div>
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>

                <el-table-column prop="account" label="账号">
                </el-table-column>

                <el-table-column prop="userGroup" label="用户组">
                </el-table-column>

                <el-table-column prop="time" label="创建时间">
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
            </el-pagination>
            <!-- 按钮 -->
            <div class="btn">
                <el-button size='small' type="danger">批量删除</el-button>
                <el-button size='small' type="primary">取消选择</el-button>
            </div>
        </el-card>

    </div>
</template>

<script>
import { getUserListReq } from '@/api/user';
export default {

    data() {
        return {
            tableData: [],
            currentPage: 1,
        }
    },
    mounted() {
        // fetch('http://localhost:3000/accountList').then(res => res.json()).then(res => {
        //     this.tableData = res;
        // })
        this.tableData = getUserListReq().then(res => {
            // return res.data;
            console.log(res.data);
        })
    },
    methods: {
        // 编辑
        handleEdit(index, row) {
            console.log(index, row);
        },
        // 删除
        handleDelete(index, row) {
            console.log(index, row)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-pagination {
    margin-top: 20px;
}

::v-deep .el-table-column--selection .cell {
    padding: 0 10px;
}

.btn {
    margin-top: 20px;
}
</style>