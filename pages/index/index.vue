<template>
	<view class="wrap" style="background-color: rgb(248, 248, 248);">
		<view class="swiper-box" style="margin: 20rpx;">
			<u-swiper :list="list" height="350" :title="title" :effect3d="effect3d" :indicator-pos="indicatorPos"
				:mode="mode" :interval="3000" @click="toVideo()"></u-swiper>
		</view>
		<view class="content" style="">
			<!-- <view class="title">欢迎2023新生报到！</view> -->
			<u-notice-bar mode="horizontal" :list="noticelist" :speed="100" type="primary"></u-notice-bar>
			<view class="content_1" style="">
				<view class="img_box">
					<u-image width="100%" border-radius="5" height="100rpx" src="@/static/index_icons/check.png"
						mode="aspectFit"></u-image>
				</view>
				<view class="btn_box">
					<button class="checkbtn" @click="toCheck()">报到须知</button>
				</view>
			</view>
			<view class="content_1" style="">
				<view class="img_box">
					<u-image width="100%" border-radius="5" height="100rpx" src="@/static/index_icons/info2.png"
						mode="aspectFit"></u-image>
				</view>
				<view class="btn_box">
					<button class="checkbtn" @click="toInfo()">采集个人信息</button>
				</view>
			</view>
			<view class="content_1" style="">
				<view class="img_box">
					<u-image width="100%" border-radius="5" height="100rpx" src="@/static/index_icons/room1.png"
						mode="aspectFit"></u-image>
				</view>
				<view class="btn_box">
					<button class="checkbtn" @click="toRoom()">宿舍组队</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				/*轮播图*/
				list: [{
					image: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.wdj2GTE78z7oNNBCwDjn5gHaEK?w=302&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
					title: '《逐光而上》——2023年重庆大学招生宣传片'
				},
				{
					image: 'http://minio.autumnclouds.cn:9000/nsrs/2023/08/25/c4bc5afe17f84454801781d3fed48e38.jpg',
					title: '《逐光而上》——2023年重庆大学招生宣传片'
				},
				{
					image: 'http://minio.autumnclouds.cn:9000/nsrs/2023/08/25/167daa1382a341cfb9aae15dfd862e96.jpg',
					title: '《逐光而上》——2023年重庆大学招生宣传片'
				}],
				title: true, //是否显示标题
				mode: 'round', //循环的模式
				indicatorPos: 'bottomCenter',
				effect3d: true, //是否开启3d渲染
				/*轮播图结束*/
				noticelist: [
					'热烈欢迎2023新生报到',
					'奋进之路，从这里开始',
					'你好！让我们一起成长',
					'重大学子，逐光而上'
				]
			}
		},
		computed: {

		},
		onReady() {

		},
		onShow() {

		},
		methods: {
			toCheck: function() { //跳转到报道流程的页面
				uni.navigateTo({
					url: '/pages/check/check'
				})
			},
			toInfo: function() { //跳转到采集个人信息的页面
				uni.navigateTo({
					url: '/pages/info/info'
				})
			},
			toRoom: function() { //跳转到宿舍需求的页面
				uni.navigateTo({
					url: '/pages/room/room'
				})
			},
			toVideo: function() { //跳转到宣传视频的页面
				uni.navigateTo({
					url: '/pages/video/video'
				})
			}
		}
	};
</script>

<style lang="scss">
	.wrap {
		font-size: 28rpx;
		background-color: #ffffff;
		margin-bottom: 100rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: center;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 30rpx;
			}

			.content_1 {
				display: flex;
				flex-direction: row;
				flex: 4;

				.btn_box {
					flex: 3;

					.checkbtn,
					.infobtn,
					.roombtn {
						margin-top: 60rpx;
						background-color: #90b4d1;
						color: #ffffff;
						//$u-tips-color;
						border: none;
						border-radius: 20rpx;
						font-size: 30rpx;
						padding: 12rpx 0;

						&::after {
							border: none;
						}
					}
				}

				.img_box {
					margin-top: 60rpx;
					flex: 1;
				}
			}
		}
	}
</style>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		/* border:1rpx solid red; */
		background-color: rgb(248, 248, 248);
	}
</style>