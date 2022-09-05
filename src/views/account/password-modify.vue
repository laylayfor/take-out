<template>
    <div>
        <el-card>
            <div class="heder" slot="header">
                <span>密码修改</span>
            </div>
            <el-form ref="formRef" :model="formData" :rules="rules" status-icon label-width="100px" size="mini">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="formData.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="formData.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="comfirmPassword">
                    <el-input v-model="formData.comfirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">确定</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        const checkOldPassword = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入密码!'));
            } else if (!/^[a-zA-Z0-9_]{6,16}$/.test(value)) {
                callback(new Error('请输入6到16位（字母，数字，下划线）'));
            } else {
                callback();
            }
        };
        const checkNewPassword = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入密码!'));
            } else if (!/^[a-zA-Z0-9_]{6,16}$/.test(value)) {
                callback(new Error('请输入6到16位（字母，数字，下划线）'));
            } else if (value == this.formData.oldPassword) {
                callback(new Error('不要使用原密码!'));
            } else {
                callback();
            }
        };
        const comfirmPassword = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入密码!'));
            }
            else if (!value == this.formData.newPassword) {
                callback(new Error('密码不一致!'));
            } else {
                // 重新验证一下密码,如果不为空，重新校验
                if (this.formData.comfirmPassword) {
                    this.$refs.formRef.validateField('comfirmPassword');
                }
                callback();
            }
        }
        return {
            formData: {
                oldPassword: '',
                newPassword: '',
                comfirmPassword: '',
            },
            rules: {
                oldPassword: [
                    {
                        validator: checkOldPassword,
                        trigger: 'blur',
                    }
                ],
                newPassword: [
                    {
                        validator: checkNewPassword,
                        trigger: 'blur',
                    }
                ],
                comfirmPassword: [
                    {
                        validator: comfirmPassword,
                        trigger: 'blur',
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input {
    width: 250px;
}
</style>