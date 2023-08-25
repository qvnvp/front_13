<template>
	<view class="container">
		<!-- 导航栏 -->
		<view placeholder>
			<view class="nav-center" style="background-color: #f8f8f8; display: flex; padding-top: 5px;  flex-direction: row; justify-content: space-between; height: 50px; align-items: center;">
				<view></view>
				<view :class="tabIndex===0? 'active':'noactive' " @click="changeTab(0)"
					>校园头条</view>
				<view :class="tabIndex===1? 'active':'noactive' " @click="changeTab(1)"
					>校园社区</view>
				<view></view>
			</view>
			<img src="../../static/img/add.png"
				style="height: 40px; width: 40px; position: fixed; top: 80vh; right: 4vh; z-index: 999;"
				@click="gotofabu"></img>
		</view>
		<!-- 内容页 -->
		<swiper class="bg-white px-20" :style="{height:swiperHeight + 'px'}" :current="tabIndex" @change="changeSwiper" style="background-color: #fff;">
			<!-- 头条 -->
			<swiper-item style="margin-top: 5px;">
				<scroll-view scroll-y class="flow h-full">
					<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" :circular="true">
						<swiper-item>
							<view class="swiper-item" style="padding: 0px 5px;">
								<image src="../../static/article/pic1.jpeg" class="banner-img"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item" style="padding: 0px 5px;">
								<image src="../../static/article/pic2.jpeg" class="banner-img"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item" style="padding: 0px 5px;">
								<image src="../../static/article/pic3.jpeg" class="banner-img"></image>
							</view>
						</swiper-item>
					</swiper>
					<view v-for="(item, index) in tabbar" :key="'i1' + index" class="item">
						<view class="title">{{item.title}}</view>
						<view class="content">
							<image class="photo" :src="item.content.pic"></image>
							<view class="foot_father">
								<view class="foot_son">{{item.content.foot_son1}}</view>
								<view class="foot_son">{{item.content.foot_son2}}</view>
							</view>
						</view>
					</view>

				</scroll-view>
			</swiper-item>

			<!-- 社区 -->
			<swiper-item>
				<scroll-view scroll-y class="topic h-full">
					<u-search placeholder="搜索帖子" v-model="query" @custom="gotosearch" @search="gotosearch" style="margin: 5px 0px;"></u-search>
					<u-button type="primary" @click="changeshowToHot" v-if="show"
						style="height: 40rpx;width: 160rpx;margin-right: 5rpx;">按热度</u-button>
					<u-button type="primary" @click="changeshowToAll"
						style="height: 40rpx;width: 160rpx;margin-right: 5rpx; background-color: #6fd2ff;"
						v-else>按时间</u-button>	
					<view v-for="(item, index) in showDatas" :key="index" style="padding: 10px 15px;">
						<!--头像栏-->
						<view class="flex flex-row justify-between items-center">
							<!--头像、姓名盒子-->
							<view class="author" style="display: flex; flex-direction: row; align-items: center;">
								<image @click="gotoauthor(index, item.authorId)" :src="item.authorAvatar"
									style="height: 40px; width: 40px; border-radius: 5px;"></image>
								<view @click="gotoauthor(index, item.authorId)" style="margin-left: 10px;">{{item.authorName}}
								</view>
							</view>
							<!--标签盒子-->
							<view
								class="flex flex-row justify-center items-center bg-gray-100 rounded-10 px-10 py-5 text-28">
								{{item.labels}}
							</view>
						</view>
						<view class="article_content" @click="gotopage(item.id)">
							<view style="margin: 5px 0px;">{{item.title}}</view>
							<template v-if="item.images===null">
								<view class="w-100 line-3 text-26 my-20">{{item.content}}</view>
							</template>
							<template v-else>
								<view class="relative flex flex-row justify-center items-center">
									<!-- 图片 -->
									<image class="w-full rounded-20" :src="item.images" mode="widthFix" lazy-load>
									</image>
								</view>
							</template>
						</view>
						
						<!--底部数据 发布时间 评论点赞转发-->
						<view
							style="display: flex; flex-direction: row; margin-top: 5px; justify-content: flex-end;position: relative;">
							<!--发布时间-->
							<view class="my_label" style="position: absolute;left: 5rpx;">
								{{ new Date(item.createdTime).getMonth()+1 }}-{{ new Date(item.createdTime).getDate() }}
								{{ new Date(item.createdTime).getHours() }}:{{ new Date(item.createdTime).getMinutes() }}
							</view>
							<!--浏览量-->
							<image src="../../static/img/view_count.png" style="width: 20px; height: 20px;position: absolute;right: 255rpx;">
							</image>
							<view style="position: absolute;right: 220rpx;">
								{{item.views}}
							</view>
							
							<!--点赞-->
							<image :src="item.isLiked==1  ? '../../static/img/like.png' : '../../static/img/islike.png'"
								@click="like(item.id)" style="width: 20px; height: 20px;position: absolute;right: 170rpx;">
							</image>
							<view style="position: absolute;right: 145rpx;">
								{{item.likes}}
							</view>
							<!--收藏-->
							<image
								:src="item.isCollected ? '../../static/img/collection.png':'../../static/img/iscollection.png'"
								@click="collect(item.id)"
								style="width: 20px; height: 20px;position: absolute;right: 90rpx;">
							</image>
							<view style="position: absolute;right: 70rpx;">
								{{item.collection}}
							</view>
							<!--评论-->
							<image src="../../static/img/comment.png" style="width: 20px; height: 20px;">{{item.comment}}
							</image>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import articleData from '@/common/article.data.js';
	
	export default {
		data() {
			return {
				tabIndex: 0,
				swiperHeight: 0,
				tabbar: articleData,
				tabList: [{
						name: "头条",
					},
					{
						name: "社区",
					}
				],
				show: true,
				isShow: 2,
				showDatas: {},
				query: ''
			}
		},
		methods: {
			// tabbar点击
			changeTab(index) {
				this.tabIndex = index
			},
			// swiper滑动
			changeSwiper(e) {
				this.tabIndex = e.detail.current
				console.log(this.tabIndex)
			},
			
			
			// 调用函数
			flush(){
				if (this.isShow == 2) {
					this.showAll()
				} else if (this.isShow == 1) {
					this.showHot()
				} else {
					this.showQuery()
				}
			},
			gotosearch: function() {
				console.log("点击了查询")
				console.log("搜索字段:", this.query)
				this.showQuery()
				this.isShow = 0
			},
			collect(id) {
				console.log("success:点击了收藏")
				uni.request({
					url: `/api/behavior/collection/${id}`,
					data: '',
					method: 'PUT',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						if (res.data.code == 200) {
							this.flush();
						}
						console.log("打印code:", res.data.code)
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			refresh() {
				uni.request({
					url: '/api/article/hot',
					method: 'GET',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						console.log("hot:", res)
						this.data = res.data.data
					},
					fail: (err) => {
						console.log(err)
					}
				});
				uni.request({
					url: '/api/article',
					data: {
						'query': ''
					},
					method: 'GET',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						console.log("all:", res)
						this.dataAll = res.data.data
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
			showQuery() {
				uni.request({
					url: `/api/article?query=` + this.query,
					//data: query,
					method: 'GET',
					timeout: 5000,
					success: (res) => {
						if (res.data.code == 200) {
							this.showDatas = res.data.data
							console.log("模糊查询:", this.queryDatas)
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			showHot() {
				//获取热门文章数据
				uni.request({
					url: '/api/article/hot',
					method: 'GET',
					timeout: 5000,
					success: (res) => {
						this.showDatas = res.data.data
						// console.log("热门文章数据hot:", this.show)
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
			showAll() {
				//所有文章数据
				uni.request({
					url: '/api/article',
					data: {
						'query': ''
					},
					method: 'GET',
					timeout: 5000,
					success: (res) => {
						this.showDatas = res.data.data
						// console.log("按照时间顺序展示所有文章数据all:", this.showDatas)
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
			like(id) {
				uni.request({
					url: `/api/behavior/like/${id}`,
					data: '',
					method: 'PUT',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						if (res.data.code == 200) {
							this.flush()
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			click_title() {
				this.active = 1
			},
			click_community() {
				this.active = 0
			},
			gotoauthor(index, id) {
				console.log("index", index)
				console.log("id:", id)
				uni.navigateTo({
					url: `/pages/article/author?id=${id}&authorName=${this.showDatas[index].authorName}&authorAvatar=${this.showDatas[index].authorAvatar}`
				})
			},
			gotopage(id) {
				//浏览量+1
				uni.request({
					url: `/api/behavior/view/${id}`,
					method: 'PUT',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						if (res.data.code == 200) {
							this.flush()
							console.log("浏览量+1")
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
				//刷新页面()
				this.flush()
				
				uni.navigateTo({
					url: `/pages/article/article?id=${id}`
				})
			},
			gotofabu() {
				uni.navigateTo({
					url: "/pages/person/userPage/fabu"
				})
				// this.show = !this.show
			},
			previewImage(imageList, image_index) {
				var current = imageList[image_index];
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},
			changeshowToHot() {
				this.showHot()
				this.show = !this.show
				this.isShow = 1
			},
			changeshowToAll() {
				this.showAll()
				this.show = !this.show
				this.isShow = 2
			}
		},
		onLoad() {
			// 设置swiperHeight
			uni.getSystemInfo({
				success: (res) => {
					// 屏幕高度（screenHeight) = 手机状态栏的高度(statusBarHeight) + 导航栏高度(44px) + 可使用窗口高度(windowHeight)
					// 可使用窗口高度 = swiper高度 + 自定义导航栏高度
					this.swiperHeight = res.windowHeight - 44
				}
			})
			this.flush()
		},
	}
</script>

<style lang="scss" scoped>
	.no_select_title {
		color: #6b6b6b;
		font-size: 14px;
	}

	.select_title {
		color: #000;
		font-size: 17px;
		font-weight: bold;
	}

	.view_center {
		width: 100%;
		transition: transform 0.5s ease;
		transform: translateX(0%);
		margin-top: 5px;
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

	.father {
		position: relative;
	}

	.item {
		height: 180px;
		padding: 0px 15px;

		.title {
			font-weight: bold;
			margin-top: 8px;
			margin-bottom: 6px;
			font-size: 15px;
		}

		.content {
			.photo {
				width: 100%;
				height: 120px;
				border-radius: 5px;
			}

			.foot_father {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.foot_son {
					font-size: 10px;
					font-weight: 400;
					color: #6c6c6c;
				}
			}
		}
	}

	.swiper-item,
	.banner-img {
		width: 100%;
		height: 100%;
	}

	.active {
		// padding-top: 4px;
		font-size: 17px;
		font-weight: bold;
		color: #000;
	}

	.noactive {
		// padding-top: 8px;
		font-size: 14px;
		color: #6b6b6b;
	}
</style>