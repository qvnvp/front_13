<template>
  <view class="container">
    <view class="navigate-title">
      <view></view> <!-- 哨兵 -->
      <view :class="active ? 'select_title' : 'no_select_title'" @click="submitted">未提交</view>
      <view :class="!active ? 'select_title' : 'no_select_title'" @click="unsubmitted">已提交</view>
      <view></view> <!-- 哨兵 -->
    </view>
    <view class="father">
      <view :class="active ? 'view_center' : 'view_left'">
        <view class="item1">
          <image class="icon1" src="/static/services/images/wenjuan.png"></image>
          <view class="detail1">
            重庆大学沙坪坝校区校门名称征求意见
          </view>
        </view>
        <view class="item2">
          <image class="icon2" src="/static/services/images/wenjuan.png"></image>
          <view class="detail2">
            第二个问卷
          </view>
        </view>
        <view class="no-more">没有更多啦~</view> <!-- 底部提示 -->
      </view>
      <view :class="!active ? 'view_center' : 'view_right'">
        <image class="icon3" src="/static/services/images/unfinish.png"></image>
	    <view class="no-more">您还没有填写过问卷</view> 
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      active: true // 控制显示已提交问卷
    };
  },
  methods: {
    unsubmitted() {
      this.active = false;
    },
    submitted() {
      this.active = true;
    }
  }
};
</script>

<style scoped lang="scss">
.navigate-title {
  background-color: #ffffff;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
}

.no_select_title {
  color: #6b6b6b;
  font-size: 14px;
}

.select_title {
  color: #000;
  font-size: 17px;
  font-weight: bold;
}

.father {
  position: relative;
}

.item1,
.item2 {
  display: flex;
  align-items: center;
  background-color: #e0ebf5;
  font-size: 15px;
  border: 1px solid #cbd5ff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.detail1,
.detail2 {
  flex: 3;
  margin-top: 0;
  padding: 10px;
}

.icon1,
.icon2 {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
.icon3{
	margin-top: 20px;
	margin-left: 160px;
	width: 48px;
	height: 48px;
	
}

.view_center {
  width: 100%;
  transition: transform 0.5s ease;
  transform: translateX(0%);
}

.view_right {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
  transform: translateX(100%);
}

.view_left {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
  transform: translateX(-100%);
}

.no-more {
  color: #999;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
}
</style>
