<template>
    <div class="right-header">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '$route.path' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 右侧下拉菜单和头像 -->
        <div class="header-avatar">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/account/person">个人中心</el-dropdown-item>
                    <el-dropdown-item command="/login">退出登录</el-dropdown-item>

                </el-dropdown-menu>

            </el-dropdown>
            <!-- 头像 -->
            <el-avatar :size="40" :src="avatar"></el-avatar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatar: require('./../assets/images/infor.jpg'),
        }
    },
    methods: {
        handleCommand(command) {
            console.log(command);
            this.$router.push(command);
        }
    }
}
</script>

<style lang="scss" scoped>
.right-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: greenyellow;
    padding: 0 15px;

    .el-dropdown-link {
        cursor: pointer;
        color: $bg;
    }

    .el-icon-arrow-down {
        font-size: 14px;
    }

    .header-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
            margin-left: 15px;
        }
    }
}
</style>