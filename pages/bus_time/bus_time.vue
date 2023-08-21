<template>
  <view class="wrap">
    <!-- 顶部容器 -->
    <view class="top-buttons">
      <view class="ellipse-container">
        <u-button class="custom-button" @click="transfer1">我要去新校区</u-button>
      </view>
      <view class="ellipse-container">
        <u-button class="custom-button" @click="transfer2">我要去老校区</u-button>
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
  margin-bottom: 50px;
}

.ellipse-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  background-color: #7da6ff;
  border-radius: 70%;
}

.custom-button {
  /* 按钮的自定义样式 */
}

.image-container img {
  width: 100%;
   height: 100%;
   object-fit: cover;
}

</style>
