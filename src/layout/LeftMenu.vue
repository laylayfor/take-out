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
      <!-- 有子盒子 -->

      <!-- 后台首页 -->
      <el-menu-item index="/home">
        <i class="iconfont icon-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 订单管理 -->
      <el-menu-item index="/order">
        <i class="iconfont icon-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <!-- 商品管理 -->
      <el-submenu index="/goods">
        <template slot="title">
          <i class="iconfont icon-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
        <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
        <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
      </el-submenu>
      <!-- 店铺管理 -->
      <el-menu-item index="/shop">
        <i class="iconfont icon-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <!-- 账号管理 -->
      <el-submenu index="/account">
        <template slot="title">
          <i class="iconfont icon-account"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/account/account-list">账号列表</el-menu-item>
        <el-menu-item index="/account/account-add">添加账号</el-menu-item>
        <el-menu-item index="/account/password-modify">修改密码</el-menu-item>
        <el-menu-item index="/account/person">个人中心</el-menu-item>
      </el-submenu>

      <!-- 销售统计 -->
      <el-submenu index="/total">
        <template slot="title">
          <i class="iconfont icon-total"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/total/total-goods">商品统计</el-menu-item>
        <el-menu-item index="/total/total-order">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {};
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
