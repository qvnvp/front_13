<template>
  <view class="wrap">
    <view class="img_box">
      <u-image width="100%" border-radius="5" height="450rpx" :src="src"></u-image>
    </view>
    <view class="miusic_detail">
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
    <u-button>更多</u-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: 'https://bpic.588ku.com/back_pic/05/99/04/675f2500db0994f.jpg',
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
  background-color: #ffffff;
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
	  margin-top: 20px;
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
}
 .person{
  font-size: 14px;
  margin-top: 20px;
  color: #333333;
  line-height: 1.6;
}

.type {
	 margin-top: 20px;
  font-size: 14px;
  color: #333333;
}

u-button {
  margin-top: 20px;
   width: 1rpx; /* 调整按钮宽度 */
    height: 5px; /* 调整按钮高度 */
    font-size: 18px; /* 调整按钮内文本字号 */
	 background-color: #ffcc00; 
}
</style>
