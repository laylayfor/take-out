<template>
  <div class="el-cardList">
    <div class="left">
      <img :src="cardData.img" alt="" srcset="" />
    </div>
    <div class="right">
      <!-- <div class="title">{{ cardData.name }}</div>
      <div class="count">{{ cardData.count }}</div> -->
      <div class="title">
        <slot name="title" :title="cardData.name"></slot>
      </div>
      <div class="count">
        <slot name="count" :count="cardData.count"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
.el-cardList {
  display: flex;
  //   flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: $white;
  padding: 10px 0;
  width: 100%;
  height: 80px;
  min-width: 181px;
  .left {
    width: 40%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: space-around;
    .title {
      font-size: 14px;
      color: #ccc;
      font-weight: bolder;
    }
    .title,
    .count {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      text-align: center;
    }
  }
}
</style>
