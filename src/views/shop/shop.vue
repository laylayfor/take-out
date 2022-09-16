<template>
  <div>
    <el-card>
      <!-- 头部标题 -->
      <div class="header" slot="header">
        <span>店铺管理</span>
        <el-button type="primary" size="mini" @click="handleSave()"
          >保存</el-button
        >
      </div>
      <!-- 内容 -->
      <el-form :model="formData" label-width="80px" size="mini">
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <!-- 店铺公告 -->
        <el-form-item label="店铺公告">
          <el-input
            type="textarea"
            :rows="5"
            v-model="formData.bulletin"
          ></el-input>
        </el-form-item>
        <!-- 店铺头像 -->
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="'/shop/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formData.avatar"
              :src="API + '/upload/shop/' + formData.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 店铺图片 -->
        <el-form-item label="店铺图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="formData.pics"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <!-- 配送费 -->
        <el-form-item label="配送费">
          <el-input v-model="formData.deliveryPrice"></el-input>
        </el-form-item>
        <!-- 配送时间 -->
        <el-form-item label="配送时间">
          <el-input v-model="formData.deliveryTime"></el-input>
        </el-form-item>
        <!-- 配送描述 -->
        <el-form-item label="配送描述">
          <el-input v-model="formData.description"></el-input>
        </el-form-item>
        <!-- 店铺评分 -->
        <el-form-item label="店铺评分">
          <el-rate
            v-model="formData.score"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </el-form-item>
        <!-- 销  量 -->
        <el-form-item label="销    量">
          <el-input v-model="formData.sellCount"></el-input>
        </el-form-item>
        <!-- 活动 -->
        <el-form-item label="活    动">
          <template>
            <el-checkbox-group v-model="formData.supports">
              <el-checkbox label="在线支付满28减5"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <!-- 营业时间 -->
        <el-form-item label="营业时间">
          <template>
            <el-date-picker
              v-model="formData.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="HH:mm:ss"
              value-format="HH:mm:ss"
            >
            </el-date-picker>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getShopDetailReq } from "@/api/shop";
export default {
  data() {
    return {
      formData: {
        id: "", // id
        name: "", // 店铺名称
        bulletin: "", // 公告
        avatar: "", // 店铺头像
        deliveryPrice: "", // 配送费
        deliveryTime: "", // 送达时间
        description: "", // 描述
        score: "", // 评分
        sellCount: "", // 销量
        supports: "", // 活动
        pics: "", // 店铺图片
        date: "", // 营业时间
        minPrice: "", // 起送价格
      },
      API: "http://localhost:5000/",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    // 顶部按钮
    handleSave() {
      console.log("保存");
    },
    // 获取数据
    async getData() {
      let res = await getShopDetailReq();
      //   console.log(res.data);
      // 修改图片列表格式，转为 {name: ..., url: ...}
      let { pics } = res.data.data;
      pics = pics.map((v) => {
        return {
          name: v,
          url: this.API + "/upload/shop/" + v,
        };
      });

      this.formData = { ...res.data.data, pics };
      //   console.log(this.formData);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片成功上传回调
    handleAvatarSuccess(res) {
      // console.log(res);
      //   let { code, avatar, msg } = res;
      //   // console.log(res);
      //   // console.log(code, imgUrl, msg);
      //   if (code === 0) {
      //     this.formData.avatar = this.API + avatar;
      //     console.log(this.formData.avatar);
      //     this.uploadImg();
      //     // this.getData();
      //   } else {
      //     this.$message.error(msg);
      //   }
    },
    beforeAvatarUpload(file) {
      const isJPGOrPNG = /(jpeg|png|gif)/.test(file.type);
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPGOrPNG) {
        this.$message.error("上传头像图片只能是 JPG、PNG、GIF 格式!");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPGOrPNG && isLt3M;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
  width: 50%;
  min-width: 250px;
}
:deep(.header) {
  display: flex;
  justify-content: space-between;
}
.avatar-uploader :deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
