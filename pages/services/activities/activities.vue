<template>
  <view class="wrap">
    <view class="title_box" style="background-color:#ffffff;">
      近期最新
    </view>
    <view class="swiper_box">
      <u-swiper :list="list" :height="375" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos"
                :mode="mode" :interval="2000"></u-swiper>
    </view>
    <view class="title" style="background-color:#ffffff;">
      社团纳新
    </view>
    <view class="content">
      <view class="img_box1">
        <u-image width="100%" border-radius="5" height="300rpx" :src="src1"></u-image>
      </view>
      <view class="detail1">
        <view class="detail_name1">
         音乐协会
        </view>
        <view class="detail_publicize1">
        热爱音乐你就来
        </view>
        <view class="detail_introduction1">
          爱音乐，爱生活，爱自己，加QQ群：xxxxx了解更多
        </view>
      </view>
    </view>
    <view class="content">
      <view class="img_box2">
        <u-image width="100%" border-radius="5" height="300rpx" :src="src2"></u-image>
      </view>
      <view class="detail2">
        <view class="detail_name2">
         街舞社
        </view>
        <view class="detail_publicize2">
        kkkpop
        </view>
        <view class="detail_introduction2">
          嗨起来，加QQ群：xxxxx了解更多
        </view>
      </view>
    </view>
	<view class="content">
	  <view class="img_box3">
	    <u-image width="100%" border-radius="5" height="300rpx" :src="src3"></u-image>
	  </view>
	  <view class="detail3">
	    <view class="detail_name3">
	     武术协会
	    </view>
	    <view class="detail_publicize3">
	    chinesekungfu
	    </view>
	    <view class="detail_introduction3">
	      加QQ群：xxxxx了解更多
	    </view>
	  </view>
	</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
          {
               						image: 'http://youth.cqu.edu.cn/__local/D/99/0A/048CB1137BB01AF6A696FA5F3EE_4022CFB5_198AE.png',
               						title: '社团文化季开幕'
               					},
               					{
               						image: 'http://youth.cqu.edu.cn/__local/4/BB/70/C6176E659B2E23F98A71066DBB1_DE7B453B_21321.png',
               						title: '学生魔方社同学正在拼魔方“墙”'
               					},
               					{
               						image: 'http://youth.cqu.edu.cn/__local/8/1B/9C/9C56EB455639C787DF46CD7D139_555E9469_A8D65.png',
               						title: '武术协会风采展示'
               					},
               					{
               						image: 'http://youth.cqu.edu.cn/__local/4/DB/36/C3462CA501F5DA6885226AA9324_2ABA7B6D_130E3.png',
               						title: '学生吉他协会正在表演节目'
               					},
               					{
               						image: 'http://youth.cqu.edu.cn/__local/0/AA/34/1D2ED6800E534945882D389AC82_61B32479_D4F50.png',
               						title: '学生折纸社的社团活动作品展示区'
               }
      ],
      title: true,
      mode: 'round',
      indicatorPos: 'bottomCenter',
      effect3d: true,
      src1: 'https://ts2.cn.mm.bing.net/th?id=OIP-C.PSFUnIpsCJ5UyX_PV0ky1AHaLK&w=203&h=306&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2', // 图片的URL
   src2:'https://ts1.cn.mm.bing.net/th?id=OIP-C.wEFmwJ63OYL54eGe_r03agHaKu&w=207&h=300&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2',
	src3:'https://tse2-mm.cn.bing.net/th/id/OIP-C.oPkxXNSH-DGNAsLsqEWTHQHaLH?w=190&h=285&c=7&r=0&o=5&dpr=2&pid=1.7',
	};
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  methods: {
    // 其他方法
  }
};
</script>

<style scoped lang="scss">
.swiper_box {
  margin: 5rpx;
}

.title_box {
  padding: 5rpx 25rpx;
  line-height: 60rpx;
}
.title {
  padding: 5rpx 25rpx;
  line-height: 60rpx;
}

.content {
  display: flex;
  flex-direction: row;
  flex: 3;
  padding: 3rpx;
}

.img_box1,
.img_box2,
.img_box3{
  border: 1px solid grey;
  flex: 1;
  border-radius: 5rpx;
  padding: 10rpx;
}

.detail1,
.detail2,
.detail3{
  flex: 2;
  padding: 10rpx;

  .detail_name1,
  .detail_publicize1,
  .detail_introduction1,
  .detail_name2,
  .detail_publicize2,
  .detail_introduction2,
  .detail_name3,
  .detail_publicize3,
  .detail_introduction3 {
    line-height: 50rpx;
  }
}
</style>

