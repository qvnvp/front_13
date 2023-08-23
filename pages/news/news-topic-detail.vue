<template>
	<!-- 新鲜事页/话题详情 -->
	<view class="news-topic-detail bg-white">
		<!-- 模糊背景 -->
		<view class="topic-bg">
			<image :src="info.img" mode="aspectFill"></image>
		</view>
		<!-- 话题信息 -->
		<view class="topic-info px-20">
			<view class="">
				<image class="topic-info-image border" :src="info.img" mode="aspectFill"></image>
				<view class="topic-info-title text-36">#{{info.title}}#</view>
			</view>
			<view class="flex items-center text-gray-500 pt-50">
			</view>
			<view class="text-gray-500 text-30 my-20">{{info.desc}}</view>
			<u-gap :customStyle="{margin:'0 -20rpx'}" height="10" bgColor="#F3F4F6"></u-gap>
		</view>
		
		<view style="height: 400px; border: 1px solid red;"></view>
	</view>
</template>

<script>
	import {
		newsList
	} from '@/utils/data/data.js'
	import InfoList from "@/pages/news/cpns/info-list.vue"
	export default {
		components: {
			InfoList
		},
		data() {
			return {
				hotList: [{
						title: '夕阳下的倒影',
						desc: '你的倒影是我带不走的风景，就像居无定所的云还在旅行'
					},
					{
						title: '浓浓的稻香',
						desc: '童年的纸飞机，现在终于飞回我手里'
					},
				],
				info: {},
				// 导航标签
				tabIndex: 0,
				tabList: [{
						name: "默认",
						id: 'default'
					},
					{
						name: "最新",
						id: 'latest'
					}
				],
				list1: [],
				list2: [],
				// 上拉加载
				loadStatus1: 'loadmore', // loadmore/ loading / nomore
				loadStatus2: 'loadmore', // loadmore/ loading / nomore
				page: {
					pageNum: 1,
					pageSize: 5
				},
			}
		},
		computed: {
			// 列表数据
			listData() {
				return this['list' + (this.tabIndex + 1)]
			},
			// 列表上拉加载
			loadStatus() {
				return this['loadStatus' + (this.tabIndex + 1)]
			}
		},
		// 触底事件
		onReachBottom() {
			this.loadMore()
		},
		onLoad(e) {
			this.info = e
			this.getList()
			// 设置offsetTop
			uni.getSystemInfo({
				success: (res) => {
					// 屏幕高度（screenHeight) = 手机状态栏的高度(statusBarHeight) + 导航栏高度(44px) + 可使用窗口高度(windowHeight)
					// #ifdef APP-PLUS
					this.offsetTop = res.statusBarHeight + 44
					// #endif
					// #ifdef H5
					this.offsetTop = 0
					// #endif
				}
			})
		},
		methods: {
			// tabbar点击
			changeTab(index) {
				this.tabIndex = index
				this.getList(true)
			},
			// 加载更多
			loadMore() {
				// 是否可加载
				if (this.loadStatus !== 'loadmore') return
				// 加载中
				this['loadStatus' + (this.tabIndex + 1)] = "loading"
				// 加载更多
				setTimeout(() => {
					this.page.pageNum++
					this.getList()
				}, 1000);
			},
			// 获取数据
			getList(search = false) {
				// 搜索：重置分页
				search && (this.page.pageNum = 1)
				// 请求参数
				const params = {
					// ...this.params,
					...this.page
				}
				// 接口请求
				const result = newsList[0].list
				if (this.tabIndex === 0) {
					// 更新数据
					this.list1 = search ? result : [...this.list1, ...result]
					// 加载状态
					this.loadStatus1 = result.length < this.page.pageSize ? 'nomore' : 'loadmore'
				} else {
					// 更新数据
					this.list2 = []
					// 加载状态
					this.loadStatus2 = 'loadmore'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.news-topic-detail {
		.topic-bg {
			width: 100%;
			height: 300rpx;
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				position: absolute;
				filter: blur(10px);
			}
		}

		.topic-info {
			position: relative;
			width: 100%;

			.topic-info-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
				position: absolute;
				top: -75rpx;
			}

			.topic-info-title {
				margin-left: 180rpx;
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
			}

		}
	}
</style>
