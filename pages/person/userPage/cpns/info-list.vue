<template>
	<!-- 资讯列表 -->
	<view class="info-list wrap-card border-b animate__animated animate__fadeInLeft animate__fast">
		<!-- 头像栏 -->
		<view class="flex flex-row justify-between items-center">
			<!-- 头像 -->
			<view class="flex flex-row justify-center items-center">
				<image class="img-header mr-10" :src="info.authorAvatar" mode="widthFix" lazy-load
					@click="gotoauthor(info.authorId)()"></image>
				<view class="flex justify-center items-center text-gray-500 text-30">{{user.name}}
					<template v-if="user.sex==2">
						
					</template>
					<template v-else>
						<view class="iconfont iconxingbie-nan tag-age"
							:class="[user.sex == 1 ? 'iconxingbie-nan' :'iconxingbie-nv girl']">
							<!-- <text class="ml-10">{{user.age}}</text> (user.sex == 0 ? 'iconxingbie-nv girl' : '')-->
						</view>
					</template>
				</view>
			</view>
			<!-- 关注 -->
			<!-- <view class="flex flex-row justify-center items-center bg-gray-100 rounded-10 px-10 py-5 text-28">
				<template v-if="info.isFollow">
					<text @click="follow(false)">
						已关注
					</text>
				</template>
				<template v-else>
					<view class="flex items-center" @click="follow(true)">
						<text class="iconfont iconjia mr-10 text-24"></text>关注
					</view>
				</template>
			</view> -->
			<!--标签盒子-->
			<view class="flex flex-row justify-center items-center bg-gray-100 rounded-10 px-10 py-5 text-28">
				{{info.labels}}
			</view>
			
		</view>
		<!-- 标题 -->
		<view class="w-100 line-2 text-32 my-20" @click="goDetail()">{{info.title}}</view>
		<!-- 插槽：图片、视频 -->
		
		<slot>
			<template v-if="info.images===null">
				<view class="w-100 line-3 text-26 my-20">{{info.content}}</view>
			</template>
			<template v-else>
				<view class="relative flex flex-row justify-center items-center">
				<!-- 图片 -->
				<image class="w-full rounded-20" :src="info.images" mode="widthFix" lazy-load @click="goDetail()" style="border: 1px solid red;">
				</image>
				</view>
			</template>
			<!-- <view style="display: flex; flex-direction: row; justify-content: flex-end;">
				<image src="../../../static/img/islike.png" style="height: 20px; width: 20px;">{{info.likes}}</image>
				<image src="../../../static/img/iscollection.png" style="height: 20px; width: 20px;">{{info.collection}}</image>
				<image src="../../../static/img/comment.png" style="height: 20px; width: 20px;">{{info.comment}}</image>
			</view> -->
		</slot>
		<!-- 点赞、评论 -->
		<view class="flex flex-row justify-between items-center text-gray-500 my-10">
			
			<view class="flex flex-row justify-center items-center">
				<view class="flex flex-row justify-center items-center mr-20" @click="handleComment()">
					<view class="iconfont iconliaotian mr-10 text-36"></view>
					{{info.comment}}
				</view>
				<view class="flex flex-row justify-center items-center" @click="handleShare()">
					<view class="iconfont iconshoucang mr-10 text-36"></view>
					{{info.collection}}
				</view>
			</view>
			<view class="flex flex-row justify-center items-center">
				<view class="flex flex-row justify-center items-center mr-20" @click.stop="handleMark('smile')">
					<view class="iconfont icondianzan mr-10 text-36" ></view>
					{{info.likes}}
				</view>
				<!-- <view class="flex flex-row justify-center items-center" @click.stop="handleMark('cry')">
					<view class="iconfont mr-10 text-36" :class="[handleIcon('cry',info.infoNum)]"></view>
					{{info.infoNum.cryNum}}
				</view> -->
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
				info: null,
				user:{},
				author:{},
			}
		},
		watch: {
			item: {
				handler(val) {
					this.info = val
					if(this.info){
						this.$u.get('/api/user/'+this.info.authorId).then(res=>{
							//console.log("author:",res)
							this.user=res.data
						}).catch(err=>{
							console.log(err)
						})
					}
				},
				immediate: true
			}
		},
		// onLoad(){
		// 	if(this.info){
		// 		this.$u.get('/api/user/'+this.info.authorId).then(res=>{
		// 			console.log("author:",res)
		// 			this.user=res.data
		// 		}).catch(err=>{
		// 			console.log(err)
		// 		})
		// 	}
		// },
		methods: {
			// 关注
			follow(value) {
				this.$emit('follow', {
					value,
					index: this.index
				})
			},
			gotoauthor(id) {
				uni.navigateTo({
					url: `/pages/article/author?id=${id}`
				})
			},
			// 表情处理
			// handleIcon(type, item = null) {
			// 	if (!item) return
			// 	let index = item.index
			// 	if (type === 'smile') {
			// 		if (index === 1) {
			// 			return 'active,icondianzan'
			// 		} else {
			// 			return 'iconthumbsup'
			// 		}
			// 	} else {
			// 		if (index === 2) {
			// 			return 'active,iconz-nolikeFill'
			// 		} else {
			// 			return 'iconz-nolike'
			// 		}
			// 	}
			// },
			// 操作表情
			// handleMark(value) {
			// 	this.$emit('mark', {
			// 		value,
			// 		index: this.index
			// 	})
			// },
			// 评论
			handleComment() {
				if (!this.isDetail) return this.goDetail()
				this.$emit('comment')
			},
			// 分享
			handleShare() {
				if (!this.isDetail) return this.goDetail()
				this.$emit('share')
			},
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
