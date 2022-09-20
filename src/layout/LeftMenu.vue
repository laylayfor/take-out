<template>
  <div class="left-menu">
    <div class="logo">
      <span class="logo-take-out">
        <i class="iconfont icon-take-out"></i>
      </span>
      外卖商品中心
    </div>
    <!-- default-active: 激活当前菜单的index   
            $route.path: 获取当前路由地址
            router: 启用vue-router，激活导航时以index作为path跳转
            unique-opened: 
        -->
    <el-menu
      :default-active="$route.path"
      background-color="#304156"
      text-color="#fff"
      :unique-opened="false"
      router
    >
      <template v-for="item in menu">
        <el-menu-item
          :index="item.path"
          :key="item.meta.path"
          v-if="item.children.length === 1"
        >
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>

        <el-submenu :index="item.meta.path" :key="item.meta.path" v-else>
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.meta.path"
            :index="subItem.path"
            >{{ subItem.meta.title }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  data() {
    return {
      menu: [],
    };
  },
  created() {
    this.menu = local.get("menu");
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;

  .el-menu--inline {
    .el-menu-item {
      background: darken($bg, 5%) !important;

      &:hover {
        background: darken($bg, 10%) !important;
      }
    }
  }
}
:deep(.el-submenu__title i) {
  font-size: 20px !important;
  color: $white;
}
.left-menu {
  flex: none;
  width: 210px;
  background-color: $bg;
  overflow-y: scroll;

  .iconfont {
    margin-right: 8px;
  }

  .logo {
    position: relative;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    padding-left: 90px;
    background-color: $bg;
    color: $white;

    .logo-take-out {
      position: absolute;
      left: 15px;
      top: 5px;
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: $blue;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $grayDarker;

      .icon-take-out {
        font-size: 30px;
        margin: 0;
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
