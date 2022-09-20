<template>
  <div class="right-header">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
        v-for="item in calcBreadList2"
        :key="item.path"
        :to="item.path"
        >{{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧下拉菜单和头像 -->
    <div class="header-avatar">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎您 {{ userMsg.account
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/account/person"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item command="/login">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头像 -->
      <el-avatar :size="40" :src="userMsg.imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import { getUserMsgReq } from "@/api/user";
import local from "@/utils/local";
export default {
  data() {
    return {
      userMsg: {
        id: "",
        ctime: "",
        account: "",
        userGroup: "",
        imgUrl: "",
      },
    };
  },
  // 方式2： 计算属性方法
  computed: {
    // 数据函数， return 的值赋值给数据函数上，这个值会挂载在this上
    calcBreadList2() {
      const temp = [{ path: "/", title: "首页" }];
      this.$route.matched.forEach((v) => {
        // 判断mate中有 path 的对象
        if (v.meta?.path) {
          temp.push(v.meta);
        }
      });
      return temp;
    },
  },
  created() {
    this.getData();
    this.$bus.$on("upLoadAvatar", () => {
      // 重新拉取用户信息
      this.getData();
    });
  },
  methods: {
    handleCommand(command) {
      //   console.log(command);
      this.$router.push(command);
      if (command === "/login") {
        local.clear();
        // 退出登录时刷新一次，重置路由
        location.reload();
      }
    },
    // 初始化页面获取数据
    async getData() {
      let res = await getUserMsgReq();
      // let { id, ctiem, account, userGroup, imgUrl } = res.data;
      this.userMsg = res.data;
      // 将数据存入本地，方便其他页面使用
      local.set("userMsg", res.data);
    },
    // 计算面包屑导航
    // 方式1： 侦听器方法
    // calcBreadList() {
    //     // console.log(this.$route.matched);
    //     this.breadList = [{ path: '/', title: '首页', }];
    //     this.$route.matched.forEach(v => {
    //         // 判断mate中有 path 的对象
    //         if (v.meta?.path) {
    //             this.breadList.push(v.meta);
    //         }
    //     })
    // }
  },
  // watch: {
  //     '$route.path': {
  //         handler() {
  //             this.calcBreadList();
  //         },
  //         deep: true, // 深度监听
  //         immediate: true, // 立即执行handler里面的代码
};
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
