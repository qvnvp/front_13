<!-- 点击头像进入的页面 -->
<template>
<view id="moments">
		<view class="moments_post" v-for="(item, index) in data" :key="index" :id="'post-'+index" style="">
			<view class="post_left">
				<image class="post_header" :src="item.authorAvatar" style="border: 1px solid red;" @click="submit(item.authorId)"></image>
			</view>

			<view class="post_right">
				<text class="post_username"></text>
				<view id="paragraph" class="paragraph">{{item.content}}</view>
				<!-- 相册 to do -->
 
				<!-- 时间戳 + 当前用户是否点赞 收藏 + 添加评论功能 to do -->
				<view class="toolbar">
					<view class="timestamp">{{formatDate(item.createdTime)}}</view> <!-- 这个函数把 -->
					<view class="foot_box">
						<view class="like">
							<image src="../../static/img/islike.png">{{item.likes}}</image>
						</view>
						<view class="collection">
							<image src="../../static/img/iscollection.png">{{item.collection}}</image>
						</view>
						<view class="comment">
							<image src="../../static/img/comment.png">{{item.comment}}</image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorId: -1,
				data: {},
			}
		},
		methods: {
			submit() {
				console.log(this.data)
			},
			formatDate(timestamp) {
				var date = new Date(timestamp);
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var formattedDate = year + '-' + this.addLeadingZero(month) + '-' + this.addLeadingZero(day);
				return formattedDate;
			},
			addLeadingZero(number) {
				return number < 10 ? '0' + number : number;
			},
		},
		onLoad(options) {
			this.authorId = options.id;
			uni.request({
				url: `/api/article/author/${this.authorId}`,
				data: '',
				method: 'GET',
				timeout: 5000,
				success: (res) => { //请求改成后执行回调函数
					this.data = res.data.data
					console.log(this.data)
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
	}
</script>

<style scoped>
	#moments {
		background: #fff;
	}
	
	.post_header {
		width: 90upx !important;
		height: 90upx !important;
		border-radius: 10upx;
		margin-top: 8upx;
	}
	
	.post_username {
		font-size: 32upx;
		font-weight: 600;
		color: #36648B;
	}
	
	#moments .moments_post {
		background: #fff;
		display: block;
		border-bottom: 1px solid #f2eeee;
		padding: 30upx 20upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	
	#moments .moments_post::before {
		content: none
	}
	
	#moments .moments_post .post_right {
		font-size: 32upx;
		display: table-cell;
		padding-left: 20upx;
		width: 100%;
	}
	
	.paragraph {
		font-size: 14px;
		line-height: 1.8;
	}
	
	/* 点赞 收藏 评论 */
	#moments .moments_post .toolbar {
		/* position: relative; */
		top: 10upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		justify-content: space-between;
	}
	
	#moments .moments_post .toolbar .timestamp {
		color: #757575;
		font-size: 22upx;
	}
	
	#moments .moments_post .toolbar .foot_box {
		display: flex;
		flex-direction: row;
	}
	
	#moments .moments_post .like {
		width: auto;
		height: auto;
		display: flex;
		align-items: center;
	}
	
	#moments .moments_post .collection {
		width: auto;
		height: auto;
		display: flex;
		align-items: center;
	}
	
	#moments .moments_post .comment {
		width: auto;
		height: auto;
		display: flex;
		align-items: center;
	}
	
	#moments .moments_post .toolbar image {
		padding-left: 20upx;
		width: 40upx;
		height: 40upx;
	}
	
	/* 评论区 */
	.post_footer {
		margin-top: 30upx;
		background-color: #f3f3f5;
		width: 100%;
	}
	
	#moments .moments_post .footer_content {
		padding-left: 10upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap
	}
	
	#moments .moments_post .footer_content .comment-nickname {
		color: #36648B;
		font-size: 24upx
	}
	
	#moments .moments_post .footer_content .comment-content {
		color: #000000;
		font-size: 24upx
	}
</style>