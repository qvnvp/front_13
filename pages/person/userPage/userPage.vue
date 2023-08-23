<template>
	<!-- 我的/个人空间 -->
	<view class="user-space wrap-card">
		<!-- 头像栏 -->
		<view class="header flex items-center border-b pb-20" >
			<image class="header-img" :src="user.avatar" mode="aspectFit"></image>
			<view class="pl-30 flex-1" >
				<view class="flex items-center mb-20">
					<view class="flex-1 flex flex-row items-center ">
						<text class="font-bold text-32">昵称：</text>
						<text class="text-26">{{user.name}}</text>
					</view>
				</view>
				<view class="flex ">
					<view class="flex-1 flex flex-row items-center ">
						<text class="font-bold text-32">兴趣爱好：</text>
						<text class="text-26">{{user.hobbies}}</text>
					</view>
				</view>
				<!-- <view class="">
					<u-button :customStyle="btnStyle" :ripple="true">关注
					</u-button>
				</view> -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="handle-icon iconfont iconcaidan" @click="showPopup = true">
				</view>
				<!-- #endif -->
			</view>
		</view>
		<!-- 标签切换 -->
		<u-sticky bgColor="#fff">
			<view class="nav-center">
				<view :class="{'active':tabIndex === index}" @click="changeTab(index)" v-for="(item,index) in tabList"
					:key="index">
					<view class="nav-title">
						{{item.name}}
					</view>
				</view>
			</view>
		</u-sticky>
		<!-- 列表内容 -->
		<template v-if="tabIndex === 0">
			<!-- 帖子列表 -->
			<info-list :item="item" v-for="(item,index) in list" :key="item.id" :index="index" 
				>
			</info-list>
			<u-loadmore :status="loadStatus"></u-loadmore>
		</template>
		<template v-else>
			<!-- 动态列表 -->
			<info-list :item="item" v-for="(item,index) in list" :key="item.id" :index="index" 
				>
			</info-list>
			<u-loadmore :status="loadStatus"></u-loadmore>
		</template>
		<!-- 顶部弹窗 -->
		<u-popup :show="showPopup" @close="showPopup = false" mode="top" :safeAreaInsetTop="true">
			<view class="flex justify-center items-center text-30 py-20 border-b" hover-class="bg-gray"
				@click="popupHandle('friend')">
				<text class="iconfont iconpinglun mr-20"></text>拉黑用户
			</view>
			<view class="flex justify-center items-center text-30 py-20" hover-class="bg-gray"
				@click="popupHandle('clear')">
				<text class="iconfont iconliaotian mr-20"></text>马上聊天
			</view>
		</u-popup>
	</view>
</template>

<script>
	import axios from "@/js/axios.min.js"
	// import {
	// 	newsList
	// } from "@/utils/data/data1.js"
	import InfoList from "@/pages/person/userPage/cpns/info-list.vue"
	export default {
		components: {
			InfoList
		},
		data() {
			return {
				showPopup: false,
				newsList:[[],[]],
				author:{
					authorAvatar:'',
					authorName:'',
					collection:'',
					comment:'',
					content:'',
					images:'',
					likes:'',
					title:'',
					views:'',
				},
				user:{
				},
				// 按钮配置
				btnStyle: {
					width: "120rpx",
					height: "60rpx",
					borderRadius: '10rpx',
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
				// 导航标签
				tabIndex: 0,
				tabList: [
					
					{
						name: "帖子",
						//list: newsList[0].list,
						loadStatus: 'loadmore'
					},
					{
						name: "动态",
						//list: newsList[1].list,
						loadStatus: 'loadmore'
					}
				],
			}
		},
		mounted() {
			// uni.request({
			// 	url:'/api/article/own'
			// })
		//发送 AJAX 请求获取文章信息列表
		
			this.$u.get('/api/article/own').then(res=>{
				this.newsList[0]= res.data;
				console.log("this.newsList[0]:",this.newsList[0])
			}).catch(err=>{
				console.log(err)
			});
			this.$u.get('/api/behavior/collection').then(res=>{
				this.newsList[1]= res.data;
				console.log("this.newsList[1]:",this.newsList[1])
			}).catch(err=>{
				console.log(err)
			});
			// axios.get('/api/article/own').then(response => {
			// 	this.newsList[0]= response.data.data; // 将返回的数据保存到组件的数据属性中
			// 	console.log("newslist[0]:",this.newsList[0])
			// }).catch(error => {
			// 	console.error(error);
			// });
			// axios.get('/api/behavior/collection').then(response => {
			// 	this.newsList[1]= response.data.data; // 将返回的数据保存到组件的数据属性中
			// 	console.log("newslist[1]:",this.newsList[1])
			// }).catch(error => {
			// 	console.error(error);
			// });
		},
		onLoad() {
			this.$u.get('/api/user').then(res=>{
				console.log(res)
				this.user=res.data
			}).catch(err=>{
				console.log(err)
			})
			/* uni.request({
				url:'/api/user',
				method:'GET',
				timeout:5000,
				success: function(res) {
					console.log(res)
					this.user=res.data.data
					console.log("jjjjj:",this.user)
				},
				fail: function(err){
					console.log(err)
				}
			}) */
		},
		computed: {
			list() {
				return this.newsList[this.tabIndex]
			},
			loadStatus() {
				return this.tabList[this.tabIndex].loadStatus
			}
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					// 打开菜单功
					this.showPopup = true
					break
			}
		},
		methods: {
			// tabbar点击
			changeTab(index) {
				this.tabIndex = index
				this.swiperIndex = index
			},
			// 关注
			handleFollow(item) {
				this.tabList[this.tabIndex].list[item.index].isFollow = item.value
				const title = item.value ? '关注成功' : '取消成功'
				uni.showToast({
					title,
					icon: 'none',
				})
			},
			// 表情
			// handleMark(item) {
			// 	let infoNum = this.tabList[this.tabIndex].list[item.index].infoNum
			// 	switch (item.value) {
			// 		case 'smile':
			// 			if (infoNum.index == 1) return // 微笑
			// 			else if (infoNum.index == 2) infoNum.cryNum--
			// 			infoNum.index = 1
			// 			infoNum.smileNum++
			// 			break;
			// 		case 'cry':
			// 			if (infoNum.index == 2) return // 踩
			// 			else if (infoNum.index == 1) infoNum.smileNum--
			// 			infoNum.index = 2
			// 			infoNum.cryNum++
			// 			break
			// 	}
			// 	const title = item.value === 'smile' ? '谢谢表扬' : '继续加油'
			// 	uni.showToast({
			// 		title,
			// 		icon: 'none',
			// 	})
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.user-space {
		.header {
			position: relative;
			.header-img {
				width: 180rpx;
				height: 180rpx;
				border-radius: 100%;
			}
			.handle-icon {
				position: absolute;
				right: -10rpx;
				top: -20rpx;
				color: #fff;
				background: #4B5563;
				opacity: 0.8;
				padding: 12rpx;
				border-radius: 100%;
			}
		}

		.nav-center {
			height: 80rpx;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			background-color: #fff;

			.nav-title {
				height: 80rpx;
				line-height: 80rpx;
				width: 120rpx;
				font-size: 30rpx;
				padding: 0 15rpx;
				font-weight: bold;
				color: $uni-text-color-grey;
			}

			.active {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-title {
					color: $uni-color-green;
				}
			}

		}
	}
</style>
