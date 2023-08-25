<template>
	<view class="wrap">
		<view class="box">
			<view class="film_video">
				<video id="myVideo" style="width: 100%; border:1rpx solid; border-radius: 20rpx;" src="http://minio.autumnclouds.cn:9000/nsrs/2023/08/22/2863efae8c96879104baa4fd363d5d4d.mp4" 
				@error="videoErrorCallback" :danmu-list="danmuList" enable-danmu controls>
				</video>
			</view>
			<view class="film_detail">
				<view class="summary">
					<text>一生中最美的场景不过就是相遇。\n</text>
					<text>无论前行的道路上是布满鲜花还是荆棘，\n</text>
					<text>探寻未知的路途中，我们期待与你同行！\n</text>
					<text>重庆大学2023年招生宣传片《逐光而上》\n</text>
					<text>正式发布！</text>
					<text>重大等你，未来，我们一起逐光而上！</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				film: {

				},
				danmuList: [{
						text: '为我重大打call！！！',
						color: '#ff0000',
						time: 1
					},
					{
						text: '重庆大学，逐光而上！',
						color: '#ff0000',
						time: 3
					},
					{
						text: '今年9月，重大等你！',
						color: '#55aaff',
						time: 3
					},
					{
						text: '今年9月就要去重大了，好激动！',
						color: '#55aaff',
						time: 3
					},
					{
						text: '重庆大学是我梦想中的学校！',
						color: '#00ff7f',
						time: 5
					},
					{
						text: '重庆大学23级学子，请求出列！',
						color: '#00ff7f',
						time: 5
					},
					{
						text: '愿母校越来越好！',
						color: '#ff0000',
						time: 7
					}
				],
				text: "一生中最美的场景不过就是相遇。无论前行的道路上是布满鲜花还是荆棘，探寻未知的路途中，我们期待与你同行！重庆大学2023年招生宣传片《逐光而上》正式发布！重大等你，未来，我们一起逐光而上！"

			}
		},
		// onLoad:function(option){//option为object类型，会序列化上个页面传递的参数
		// 	console.log(option.filmId)
		// 	this.$u.get('/api/film/getfilm/'+option.filmId).then(res => {//请求成功执行的函数
		// 		if(res.code==200){
		// 			this.film=res.data
		// 		}
		// 	}).catch(err => {//请求失败执行的函数
		// 		console.log(err)
		// 	})
		// },
		methods: {

		}
	}
</script>

<style lang="scss">
	.summary {
		border-radius: 8px;
		/* 增加圆角 */
		background-color: #4ba2ff;
		color: white;
		/* 调整文字颜色 */
		padding: 12px 16px;
		/* 调整内边距 */
		font-size: 14px;
		/* 调整文字大小 */
		line-height: 1.5;
		/* 调整行高，使文字更易读 */
		margin-bottom: 20px;
		/* 调整通知与其他内容的间距 */
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		/* 添加阴影效果 */
	}
	.box {
		// border: 1rpx solid red;
		margin: 5rpx;
		border-radius: 5rpx;
		
		.film_detail {
			background-color: #ffffff;
			margin-top: 10rpx;
			padding: 10rpx;

			.summary {
				line-height: 50rpx
			}

			;
		}
	}
</style>