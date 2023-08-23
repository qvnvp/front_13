<template>
	<view class="wrap">
		<view class="box">
			<view class="film_video">
				<video id="myVideo" style="width: 100%" src="http://minio.autumnclouds.cn:9000/nsrs/2023/08/22/2863efae8c96879104baa4fd363d5d4d.mp4" 
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
						text: '第1s出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第3s出现的弹幕',
						color: '#ff00ff',
						time: 3
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