<template>
  <view class="wrap">
    <!-- 顶部容器 -->
    <view class="top-buttons">
      <view class="ellipse-container">
        <u-button class="custom-button" @click="transfer1()">我要去新校区</u-button>
      </view>
      <view class="ellipse-container">
        <u-button class="custom-button" @click="transfer2()">我要去老校区</u-button>
      </view>
    </view>
    <!-- 图片展示区域 -->
    <view class="image-container">
      <image v-if="showImage" :src="currentImage"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showImage: false,
      currentImage: ''
    };
  },
  methods: {
    transfer1() {
      this.showImage = true;
      this.currentImage = '/static/services/images/bus_time1.jpg';
    },
    transfer2() {
      this.showImage = true;
      this.currentImage = '/static/services/images/bus_time2.jpg';
    }
  }
};
</script>

<style>
/* Add any custom styles here */
.wrap {
  padding: 20px;
}

.top-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 35px; /* 调整间距 */
}

.ellipse-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  /* background-color: #425887; */
  border-radius: 70%;
}

.custom-button {
  /* 按钮的自定义样式 */
  display: flex;
    justify-content: center;
    align-items: center;
    width: 120px; /* 调整按钮的宽度 */
    height: 25px; /* 调整按钮的高度 */
    border-radius: 5px; /* 使用5px的圆角 */
    cursor: pointer;
    color: skyblue;
    font-size: 14px; /* 调整字体大小 */
    border: none;
}

.image-container img {
  width: 100%;
 max-height: 80vh; /* 调整图片高度，不要超过屏幕高度的80% */
  object-fit: contain; /* 使用 contain 保持完整图片显示，可能会留有空白 */
}

</style>
