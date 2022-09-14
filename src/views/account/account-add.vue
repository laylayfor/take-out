<template>
    <!-- <div class="register"> -->
    <div class="main">
        <el-card>
            <div class="header" slot="header">
                <span>添加账号</span>
            </div>
            <!-- 表单 -->
            <el-form ref="formRef" :model="formData" :rules="rules" status-icon size="mini" label-width="80px">
                <el-form-item prop="account" label="账号">
                    <el-input v-model="formData.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="userGroup" label="用户组">
                    <el-select v-model="formData.userGroup">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="register" type="primary">注册</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
    <!-- </div> -->
</template>

<script>
import { checkAccount, checkPassword } from "@/utils/utils";
import { userAddReq } from "@/api/user";
export default {
    data() {
        return {
            formData: {
                account: "",
                password: "",
                userGroup: "",
            },
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
                userGroup: [
                    { required: true, message: "请选择用户组", trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        register() {
            this.$refs.formRef.validate(async (valid) => {
                if (valid) {
                    // 发送请求
                    let res = await userAddReq(this.formData);
                    // console.log(res.data);
                    // 解构数据
                    let { code, msg, role, token } = res.data;
                    if (code === 0) {
                        this.$router.push('/account');
                    }
                } else {
                    console.log("注册失败");
                }
            });
        },
        reset() {
            this.$refs.formRef.resetFields();
        },
    },
};
</script>

<style lang="scss" scoped>
body,
html {
    width: 100%;
    height: 100%;
}

// .register {
//     width: 100%;
//     height: 100%;
// display: flex;
// justify-content: center;
// align-items: center;

.main {
    width: 100%;
    height: 100%;
}

:deep(.el-input__inner) {
    width: 250px;
}
</style>