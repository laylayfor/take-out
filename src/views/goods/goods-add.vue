<template>
    <div>
        <el-card>
            <div class="header" slot="header">
                <span>商品添加</span>
            </div>
            <el-form :model="formData" label-width="90px" size="small">
                <!-- 商品名称 -->
                <el-form-item label="商品名称">
                    <el-input class="input" v-model="formData.name" placeholder="商品名称"></el-input>
                </el-form-item>
                <!-- 商品分类 -->
                <el-form-item label="商品分类">
                    <el-select v-model="formData.category" placeholder="请选择商品分类">
                        <el-option v-for="item in cateList" :key="item.cateName" :label="item.cateName"
                            :value="item.cateName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 商品价格 -->
                <el-form-item label="商品价格">
                    <template>
                        <el-input-number v-model="formData.price" :min="0" :max="100000">
                        </el-input-number>
                    </template>
                </el-form-item>
                <!-- 商品图片 -->
                <el-form-item label="商品图片">
                    <el-upload class="avatar-uploader" :action="API + '/goods/goods_img_upload'" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <!-- 商品描述 -->
                <el-form-item label="商品描述">
                    <el-input type="textarea" :rows="3" v-model="formData.goodsDesc">
                    </el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" size="small" @click="handleSubmit">添加商品</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { allCateGoriesReq, addGoodsReq, uploadImgReq } from "@/api/goods";
export default {
    data() {
        return {
            formData: {
                name: '',
                category: '',
                price: '0',
                imgUrl: '',
                goodsDesc: '',
            },
            cateList: [],
            API: 'http://localhost:5000'
        }
    },
    methods: {
        async getCateList() {
            // 获取商品分类列表
            let res = await allCateGoriesReq();
            // console.log(res);
            this.cateList = res.data;
        },

        // 图片上传成功
        handleAvatarSuccess(res) {
            let { code, msg, imgUrl } = res;
            if (code === 0) {
                this.$message.success(msg);
                this.formData.imgUrl = this.API + imgUrl;
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
        },
        // 添加商品
        async handleSubmit() {
            // console.log(999);
            let res = await addGoodsReq(this.formData);
            let { code } = res.data;
            if (code === 0) {
                this.$router.push('/goods');
            }
        }
    },
    created() {
        this.getCateList();
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
    width: 50%;
    min-width: 350px;
}

:deep(.input) {
    width: 50%;
    min-width: 300px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    border: 1px dashed #ccc;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>