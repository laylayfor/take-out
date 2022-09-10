<template>
    <div>
        <el-card>
            <div class="header" slot="header">
                <span>管理员信息</span>
            </div>
            管理员ID: {{userMsg.id}}
            <el-divider></el-divider>
            账号: {{userMsg.account}}
            <el-divider></el-divider>
            用户组: {{userMsg.userGroup}}
            <el-divider></el-divider>
            创建时间: {{userMsg.ctime | formatDate(1)}}
            <el-divider></el-divider>
            <div class="img">
                管理员头像: <el-upload class="avatar-uploader" :action="API + 'users/avatar_upload'" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="userMsg.imgUrl" :src="userMsg.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-card>
    </div>
</template>

<script>
import { editAvatarReq } from '@/api/user';
export default {
    data() {
        return {
            userMsg: {
                id: '',
                ctime: '',
                account: '',
                userGroup: '',
                imgUrl: '',
            },
            API: 'http://localhost:5000/',
        }
    },
    methods: {

        // 头像上传
        async uploadImg() {
            // 截取图片字符串
            let imgUrl = this.userMsg.imgUrl.slice(this.userMsg.imgUrl.lastIndexOf('/') + 1);
            // console.log(imgUrl);
            // 上传头像
            let res = await editAvatarReq({ imgUrl });
            // console.log(res.data);
            let { code, msg } = res.data;
            console.log(code);
            if (code === 0) {
                this.$message.success(msg);
                // 中央事件总线，通知父组件更新头像
                this.$bus.$emit('upLoadAvatar');
            } else {
                this.$message.error(msg);
            }

        },
        // 图片成功上传回调
        handleAvatarSuccess(res) {
            // console.log(res);
            let { code, imgUrl, msg } = res;
            // console.log(res);
            // console.log(code, imgUrl, msg);
            if (code === 0) {
                this.userMsg.imgUrl = this.API + imgUrl;
                console.log(this.userMsg.imgUrl);
                this.uploadImg();
                // this.getData();
            } else {
                this.$message.error(msg);
            }

        },
        beforeAvatarUpload(file) {
            const isJPGOrPNG = /(jpeg|png|gif)/.test(file.type);
            const isLt3M = file.size / 1024 / 1024 < 3;

            if (!isJPGOrPNG) {
                this.$message.error('上传头像图片只能是 JPG、PNG、GIF 格式!');
            }
            if (!isLt3M) {
                this.$message.error('上传头像图片大小不能超过 3MB!');
            }
            return isJPGOrPNG && isLt3M;
        }

    },
    created() {
        this.userMsg = JSON.parse(localStorage.getItem('userMsg'));
    }
}
</script>

<style lang="scss" scoped>
.avatar-uploader ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 20px;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>