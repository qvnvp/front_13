<template>
  <view class="wrap">
    <view class="top-buttons">
      <view class="ellipse-container">
        <u-button class="custom-button" @click="transfer1()">我要去新校区</u-button>
      </view>
      <view class="ellipse-container">
        <u-button class="custom-button" @click="transfer2()">我要去老校区</u-button>
      </view>
    </view>
    <view class="image-container">
       <u-image v-if="showImage1" width="100%" border-radius="5" height="800rpx" mode="aspectFill" :src="src1"></u-image>
       <u-image v-if="showImage2" width="100%" border-radius="5" height="800rpx" mode="aspectFit" :src="src2"></u-image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showImage1: true,
      showImage2: false,
      src1: '/static/services/images/bus_time1.jpg',
      src2: '/static/services/images/bus_time2.jpg'
    };
  },
  methods: {
    transfer1() {
      this.showImage1 = true;
      this.showImage2 = false;
    },
    transfer2() {
      this.showImage1 = false;
      this.showImage2 = true;
    }
  }
};
</script>

<style>
.wrap {
  padding: 25px;
}

.top-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 35px;
}

.ellipse-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  border-radius: 70%;
}

.custom-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
  color: skyblue;
  font-size: 14px;
  border: none;
}

.image-container {
  margin-top: 20px;
}
</style>
