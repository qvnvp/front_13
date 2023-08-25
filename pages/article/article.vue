<!-- 用户点击进入后的文章页面 -->
<template>
	<view>
		<!-- 文章展示页 -->
		<view style="padding: 10px;">
			<!--头像栏-->
			<view class="flex flex-row justify-between items-center">
				<!--头像、姓名盒子-->
				<view class="author flex flex-row justify-center items-center"
					style="display: flex; flex-direction: row; align-items: center;">
					<image :src="datas.authorAvatar" style="height: 45px; width: 45px; border-radius: 5px;"></image>
					<view style="margin-left: 10px; font-size: 15px; font-weight: 500;">{{datas.authorName}}</view>
				</view>
				<!--标签盒子-->
				<view class="flex flex-row justify-center items-center bg-gray-100 rounded-10 px-10 py-5 text-28">
					{{datas.labels}}
				</view>
			</view>

			
			<view class="title" style="margin: 5px 0px; font-size: 18px;">
				{{datas.title}}
			</view>
			<view class="content" style="font: 15px 'Microsoft YaHei'; color: #4B5563; margin: 10px 0px;">
				{{datas.content}}
			</view>
			<view class="imgages" style="position: relative;">
				<img style="width: 100%; height: auto;" :src="datas.images"></img>
			</view>
		</view>
		
		<!--底部数据 发布时间 评论点赞转发-->
		<view
			style="display: flex; flex-direction: row; margin-top: 5px; justify-content: flex-end;position: relative;">
			<!--发布时间-->
			<view class="my_label" style="position: absolute;left: 15rpx;">
				{{ new Date(datas.createdTime).getMonth()+1 }}-{{ new Date(datas.createdTime).getDate() }}
				{{ new Date(datas.createdTime).getHours() }}:{{ new Date(datas.createdTime).getMinutes() }}
			</view>
			<!--浏览量-->
			<image src="../../static/img/view_count.png" style="width: 20px; height: 20px;position: absolute;right: 255rpx;">
			</image>
			<view style="position: absolute;right: 225rpx;">
				{{datas.views}}
			</view>
			<!--点赞-->
			<image :src="datas.isLiked==1  ? '../../static/img/like.png' : '../../static/img/islike.png'"
				@click="like(datas.id)" style="width: 20px; height: 20px;position: absolute;right: 170rpx;">
			</image>
			<view style="position: absolute;right: 150rpx;">
				{{datas.likes}}
			</view>
			<!--收藏-->
			<image
				:src="datas.isCollected ? '../../static/img/collection.png':'../../static/img/iscollection.png'"
				@click="collect(datas.id)"
				style="width: 20px; height: 20px;position: absolute;right: 90rpx;">
			</image>
			<view style="position: absolute;right: 70rpx;">
				{{datas.collection}}
			</view>
			<!--评论-->
			<image src="../../static/img/comment.png" style="width: 20px; height: 20px;">{{datas.comment}}
			</image>
		</view>


		<!-- 评论区 -->
		<!-- 发表评论 -->
		<view class="comment">
			<view style="padding: 10px;">
				<view class="comment_title" style="font-size: 15px; font-weight: bold;">发表评论:
					<text style="margin-left: 10px;"></text>
				</view>
			</view>
		</view>


		<!--发表评论框-->
		<view class="foot">
			<view>
				<u-input class="myinput" v-model="comment.content" type="textarea" placeholder="请输入评论内容"
					:auto-height="autoHeight"></u-input>
			</view>
			<button class="sentBtn" @click="send_comment">发送</button>
		</view>

		<!--文章评论页-->
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left">
				<image :src="res.userAvatar" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.userName }}</view>
				</view>
				<view class="content">{{ res.content}}</view>
				<view class="bottom">
					{{ new Date(res.createdTime).getMonth()+1 }}-{{ new Date(res.createdTime).getDate() }}
					{{ new Date(res.createdTime).getHours() }}:{{ new Date(res.createdTime).getMinutes() }}
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				datas: {},
				commentList: [],
				autoHeight: true,
				comment: {
					articleId: 0,
					content: ""
				},
			}
		},
		methods: {
			collect(id) {
				uni.request({
					url: `/api/behavior/collection/${id}`,
					data: '',
					method: 'PUT',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						this.getDatas(this.datas.id);
						console.log("success:点击了喜欢", res)
						console.log("打印code:", res.data.code)
						if (res.data.code == 200) {
							uni.request({
								url: `/api/behavior/${id}`,
								data: '',
								method: 'GET',
								timeout: 5000,
								success: (res) => { //获取当前用户对指定文章的行为
									console.log("进入了新的函数")
									console.log("显示收藏状态:", res.data.data.isLiked)

								},
								fail: (err) => {
									// console.log("fail", err)
								}
							})
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			like(id) {
				uni.request({
					url: `/api/behavior/like/${id}`,
					data: '',
					method: 'PUT',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						this.getDatas(this.datas.id);
						console.log("success:点击了收藏", res)
						console.log("打印code:", res.data.code)
						if (res.data.code == 200) {
							// let islike = false;
							uni.request({
								url: `/api/behavior/${id}`,
								data: '',
								method: 'GET',
								timeout: 5000,
								success: (res) => { //获取当前用户对指定文章的行为
									console.log("进入了新的函数")
								},
								fail: (err) => {
									// console.log("fail", err)
								}
							})
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			send_comment() {
				// console.log("我要发表评论啦")
				this.comment.articleId = this.datas.id;
				uni.request({
					url: '/api/behavior/comment',
					data: this.comment,
					method: 'POST',
					timeout: 5000,
					success: (res) => {
						this.getDatas(this.datas.id);
						console.log("res:", res);
						if (res.data.code == 200) {
							this.getComment(this.datas.id),
							this.comment.content = '';
							this.getDatas(this.datas.id);
						}
					},
					fail: (err) => {
						console.log(err);
					}
				});
				

			},
			getComment(id) {
				// console.log("这是我的文章id:", this.datas.id)
				uni.request({
					url: `/api/behavior/comment/${id}`,
					data: '',
					method: 'GET',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						// console.log("success:这是我获取到的数据", res)
						// console.log("打印code:", res.data.data)
						if (res.data.code == 200) {
							this.commentList = res.data.data
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			getDatas(id) {
				uni.request({
					url: `/api/article/${id}`,
					method: 'GET',
					timeout: 5000,
					success: (res) => { //获取指定文章数据
						// console.log("打印huo取到的数据:", res.data.data)
						if (res.data.code == 200) {
							this.datas = res.data.data
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			}

		},

		onLoad(option) {
			//点进指定文章,其浏览量加一
			//文章浏览量
			// uni.request({
			// 	url: `/api/behavior/view/${option.id}`,
			// 	method: 'PUT',
			// 	timeout: 5000,
			// 	success: (res) => { //请求改成后执行回调函数
			// 		if (res.data.code == 200) {
			// 			console.log("浏览量+1")
			// 		}
			// 	},
			// 	fail: (err) => {
			// 		console.log("fail", err)
			// 	}
			// })
			console.log("文章id:", option.id)
			this.getDatas(option.id)
			this.getComment(option.id);
			// this.refresh();
		}
	}
</script>

<style lang="scss" scoped>
	.foot {
		 position: fixed;
		    left: 0;
		    bottom: 0;
		    width: 100%;
		    background-color: white; /* 设置合适的背景颜色 */
		    padding: 10px; /* 根据需要调整内边距 */
		    box-shadow: 0 -2px 5px rgba(255, 255, 255, 0.1); /* 可选的底部阴影效果 */

		.myinput {
			height: 85upx;
			width: 280px;
			margin-left: 5px ;
			border: solid red;
		}

		.sentBtn {
			height: 80upx;
			background-color: rgb(57, 116, 255);
			color:#fff;
			padding: 45;
			// margin-right: 5rpx;
			// margin-top: 5rpx;
			position: absolute;
			top: 20rpx;
			right: 10rpx;
		}

	}

	.comment {
		display: flex;
		padding: 30rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: 30rpx;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: 24rpx;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>