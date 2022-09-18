<template>
  <div class="login">
    <div class="main">
      <div class="logo">
        <img class="logo-img" src="./../../assets/images/gear.png" alt="" />
        <h3>系统登录</h3>
      </div>
      <el-form
        :model="formData"
        status-icon
        :rules="rules"
        ref="formRef"
        size="small"
        label-width="0px"
        class="login-form"
      >
        <!-- prop 校验字段名 -->
        <el-form-item prop="account">
          <el-input
            type="text"
            prefix-icon="iconfont icon-user"
            v-model="formData.account"
            autocomplete="off"
            class="el-input__inner"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="isPassword"
            prefix-icon="iconfont icon-lock"
            v-model="formData.password"
            autocomplete="off"
            class="el-input__inner"
          >
            <i slot="suffix" :class="eye" @click="changEye"></i>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit('formRef')" class="btn-login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <div class="tips">
                没有账号？<span class="register" @click="toRegister">马上注册</span>
            </div> -->
    </div>
  </div>
</template>

<script>
import { checkAccount, checkPassword } from "@/utils/utils";
// 引入ajax函数
import { checkLoginReq } from "@/api/user";
import local from "@/utils/local";

// console.log(checkLoginReq);
export default {
  data() {
    return {
      formData: {
        account: "",
        password: "",
      },
      // 表单教验
      rules: {
        account: [
          // validator 属性值是校验函数
          {
            validator: checkAccount,
            trigger: "blur",
          },
        ],
        password: [
          // required:true 必填   message 提示信息   trigger 触发方式，失焦
          {
            validator: checkPassword,
            trigger: "blur",
          },
        ],
      },
      eye: "iconfont icon-eye-close",
      isPassword: "password",
    };
  },
  methods: {
    changEye() {
      if (this.eye == "iconfont icon-eye-close") {
        this.eye = "iconfont icon-eye-open";
        this.isPassword = "text";
      } else {
        this.eye = "iconfont icon-eye-close";
        this.isPassword = "password";
      }
    },
    submit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          // 发送请求
          let res = await checkLoginReq(this.formData);
          // code 状态码
          // msg 提示信息
          // role 当前用户角色
          // token  令牌，包含个人信息
          let { code, msg, role, token } = res.data;
          if (code === 0) {
            // 弹出提示信息
            // this.$message.success(msg);
            // 把 token存入本地
            local.set("t_k", token);
            let { redirect } = this.$route.query;
            // 跳转到首页 或重定向地址
            this.$router.push(redirect || "/home");
          }
        } else {
          return false;
        }
      });
    },
    // toRegister() {
    //     this.$router.push('/register');
    // }
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
  background-color: transparent !important;
  padding: 0 20px 0 12px !important;
  color: $white;
  font-size: 16px;
}

:deep(input.el-input__inner) {
  margin: 0 10px;
  border: 0;
}

// outline: none;
span {
  font-size: 16px;
  color: $white;
  padding: 0 5px;
}

input {
  border: 0;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url(./../../assets/images/login-bg.jpg) no-repeat center;
  // background-color: $bg;
  background: auto 100%;
  color: $white;

  .main {
    position: relative;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;

    .logo-img {
      width: 30px;
      height: 30px;
      animation: cycle 2s linear infinite;
    }

    h3 {
      margin-left: 15px;
      letter-spacing: 3px;
    }
  }

  .login-form {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-wrap: wrap;
    width: 300px;
    height: 200px;

    .btn-login {
      width: 100%;
    }
  }

  .tips {
    position: absolute;
    width: 100%;
    bottom: 20px;
    left: 50%;
    transform: translatex(-50%);

    .register {
      color: red;
      cursor: pointer;
    }
  }

  i {
    cursor: pointer;
  }
}

@keyframes cycle {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
