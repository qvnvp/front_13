<template>
  <view class="wrap">
    <view class="img_box">
      <u-image width="100%" border-radius="5" height="1000rpx" :src="src"></u-image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: '/static/services/images/xiaolili.png'
  };
 }
};
</script>

<style lang="scss">
.img_box{
	margin-top: 66rpx;
}
</style>
