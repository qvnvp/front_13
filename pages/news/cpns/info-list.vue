<template>
	<!-- 资讯列表 -->
	<view class="info-list wrap-card border-b animate__animated animate__fadeInLeft animate__fast">
		<!-- 头像栏 -->
		<view class="flex flex-row justify-between items-center">
			<!-- 头像 -->
			<view class="flex flex-row justify-center items-center">
				<image class="img-header mr-10" :src="info.userPic" mode="widthFix" lazy-load></image>
				<view class="flex justify-center items-center text-gray-500 text-30">{{item.username}}</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="w-100 line-1 text-32 my-10" @click="goDetail()">{{info.title}}</view>
		<!-- 插槽：图片、视频 -->
		<slot>
			<view class="relative flex flex-row justify-center items-center">
				<!-- 图片 -->
				<image class="w-full rounded-20" :src="info.coverPic" mode="widthFix" lazy-load @click="goDetail()">
				</image>
				<template v-if="info.type === 'video'">
					<!-- 视频 -->
					<view class="icon-play iconfont iconbofang"></view>
					<view class="play-info">
						{{info.playNum}}次播放 {{info.playLong}}
					</view>
				</template>
			</view>
		</slot>
		<!-- 点赞、评论 -->
		<view class="flex flex-row justify-between items-center text-gray-500 my-10">
			<view class="flex flex-row justify-center items-center">
				<view class="flex flex-row justify-center items-center mr-20" >
					<view class="iconfont mr-10 text-36"></view>
					{{info.infoNum.smileNum}}
				</view>
				<view class="flex flex-row justify-center items-center" >
					<view class="iconfont mr-10 text-36" ></view>
					{{info.infoNum.cryNum}}
				</view>
			</view>
			<view class="flex flex-row justify-center items-center">
				<view class="flex flex-row justify-center items-center mr-20">
					<view class="iconfont iconliaotian mr-10 text-36"></view>
					{{info.commentNum}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	 * InfoList 内容列表
	 * @description 用于首页图文列表信息
	 * @author MrThinco
	 * @property {Object} item 列表信息
	 * @property {Number} index 列表信息索引
	 * @property {Boolean} isDetail 是否详情页
	 */
	export default {
		props: {
			item: Object,
			index: {
				type: [Number, String],
				default: -1
			},
			isDetail: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				info: null
			}
		},
		watch: {
			item: {
				handler(val) {
					this.info = val
				},
				immediate: true
			}
		},
		methods: {
			// 进入详情页
			goDetail() {
				if (this.isDetail) return // 详情页，不跳转
				this.$u.route('pages/home/detail', {
					data: JSON.stringify(this.info)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info-list {
		.img-header {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
		}

		.tag-age {
			background-color: $uni-color-blue;
			color: #FFFFFF;
			font-size: 24rpx;
			padding: 2rpx 10rpx;
			margin-left: 10rpx;
			border-radius: 20rpx;

			&.girl {
				background-color: $uni-color-pink;
			}
		}

		.icon-play {
			position: absolute;
			font-size: 120rpx;
			color: #FFF;
		}

		.play-info {
			position: absolute;
			right: 10rpx;
			bottom: 10rpx;
			color: #FFF;
			background-color: rgba(153, 153, 153, 0.75);
			border-radius: 50rpx;
			padding: 5rpx 20rpx;
			font-size: 25rpx;
		}

		.active {
			color: #19be6b;

			view {
				color: #19be6b;
			}
		}
	}
</style>
