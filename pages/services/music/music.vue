<template>
  <view class="wrap">
    <view class="img_box">
      <u-image width="100%" border-radius="5rpx" height="450rpx" :src="src"></u-image>
    </view>
    <view class="music_detail">
      <view class="title">
        社团介绍：我校哥乐相声社作为西南高校中首屈一指的校园相声团体，一直专注于用清新、幽默的风格给观众带来欢乐，以其专业的表演能力吸引着越来越多的年轻人关注我们优秀的传统文化，为广大观众送去欢乐。
      </view>
      <view class="person">
        活动宣传语：
        重大哥乐惹人爱，新生专场乐开怀
      </view>
      <view class="type">
        欢迎你的加入！
      </view>
    </view>
    <u-button class="more-button">更多</u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.hXV8GBspfaxW8Juik4G-vgHaDt?w=190&h=95&c=7&r=0&o=5&dpr=2&pid=1.7',
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  background-color: #f5f5f5;
}

.img_box {
  width: 100%;
  border-radius: 5rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.music_detail {
  background-color: #ffffff;
  margin-top: 20rpx;
  padding: 20rpx;
  border-radius: 5rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
}

.person {
  font-size: 14px;
  margin-top: 20px;
  color: #333333;
  line-height: 1.6;
}

.type {
  font-size: 14px;
  color: #333333;
  margin-top: 20px;
}

.more-button {
  margin-top: 20px;
  width: 366px;
  height: 20px;
  font-size: 14px;
  background-color: #ff755a;
  color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  line-height: 40px;
}
</style>
