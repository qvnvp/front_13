<template>
	<!-- 新鲜事页 -->
	<view class="news">
		<!-- 导航栏 -->
		<u-navbar placeholder>
			<view slot="left"></view>
			<view slot="center" class="nav-center">
				<view :class="{'active':tabIndex === index}" @click="changeTab(index)" v-for="(item,index) in tabList"
					:key="index">
					<view class="nav-title">{{item.name}}</view>
					<view class="active-line"></view>
				</view>
			</view> 
		</u-navbar>
		<!-- 信息列表 -->
		<swiper class="bg-white px-20" :style="{height:swiperHeight + 'px'}" :current="tabIndex" @change="changeSwiper">
			<!-- 关注 -->
			<swiper-item>
				<scroll-view scroll-y class="flow h-full">
					<info-list v-for="(item,index) in followList.list" :key="index" :item="item">
					</info-list>
				</scroll-view>
			</swiper-item>
			
			<!-- 话题 -->
			<swiper-item>
				<scroll-view scroll-y class="topic h-full">
					<!-- 轮播图 -->
					<u-swiper :list="topicList.swiper" keyName="image" indicator indicatorMode="line" circular showTitle
						height="400rpx" previousMargin="30" nextMargin="30" bgColor="#ffffff"></u-swiper>
					<!-- 最近更新 -->
					<view class="last-update">
						<topic-list :item="item" v-for="(item,index) in topicList.list" :key="index"></topic-list>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		newsList,
		topicList
	} from "@/utils/data/data.js"
	import InfoList from "@/pages/news/cpns/info-list.vue"
	import TopicList from "@/pages/news/cpns/topic-list.vue"
	export default {
		components: {
			InfoList,
			TopicList
		},
		data() {
			return {
				// 导航标签
				tabIndex: 1,
				tabList: [{
						name: "头条",
						id: 'follow'
					},
					{
						name: "社区",
						id: 'topic'
					}
				],
				swiperHeight: 0,
				// 关注列表
				followList: {
					// 加载更多
					loadStatus: 'loadmore',
					// 列表数据
					list: newsList[0].list
				},
				// 话题列表
				topicList: {
					swiper: [ // 轮播图
						{
							image: '/static/img/pic1.jpeg',
							title: '迷人的春天是令人欢欣鼓舞的。'
						},
						{
							image: '/static/img/pic2.jpeg',
							title: '一道残阳铺水中，半江瑟瑟半江红。'
						},
						{
							image: '/static/img/pic3.jpeg',
							title: '金秋的阳光温馨恬静，金秋的微风和煦轻柔。'
						}
					],
					list: topicList[1].list
				}
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
		},
		methods: {
			// tabbar点击
			changeTab(index) {
				this.tabIndex = index
			},
			// swiper滑动
			changeSwiper(e) {
				this.tabIndex = e.detail.current
			},

		}
	}
</script>

<style lang="scss" scoped>
	.news {

		// 导航栏
		/deep/ .u-navbar {

			.iconfont {
				font-size: 48rpx;
				color: $uni-color-green;
			}

			.nav-center {
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-title {
					width: 60rpx;
					font-size: 30rpx;
					padding: 0 15rpx;
					font-weight: bold;
					color: $uni-text-color-gray;
				}

				.active {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;

					.nav-title {
						color: $uni-color-green;
					}

					.active-line {
						border-bottom: 8rpx solid $uni-color-green;
						border-radius: 20rpx;
						width: 70rpx;
						position: absolute;
						bottom: -10rpx;
						left: 50%;
						margin-left: -35rpx;
					}
				}

			}
		}

		.topic {
			.search-input {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				height: 70rpx;
				background-color: #F4F4F4;
				border-radius: 10rpx;
				/deep/ .u-input {
					height: 100%;
				}
			}

			.last-update {
				padding: 20rpx;

				.last-update-name {
					font-size: 32rpx;
					padding-bottom: 5rpx;
				}
			}

		}
	}
</style>
