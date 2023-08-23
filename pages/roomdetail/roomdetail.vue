<template>
	<view class="container">
		<view class="main flex-column align-center">
			<view class="card-box1 basic-info margin-top-sm flex-column align-center">
				<view class="info-top flex-row margin-top-sm">
					<view class="job-name flex-row align-center">
						<text class="text-bold">{{this.building[0]+this.building[2]+this.dormitoryno}}</text>
					</view>
				</view>
				<view class="place-info margin-top-xs text-gray text-xs">
					<text class="fa fa-map-marker"></text>
					<text class="margin-left-xs">{{this.building}}</text>
				</view>
				<view class="request-info text-gray text-xs">
					<text class="margin-left-xs">{{"已组"+this.count+"/4人"}}</text>
					<text class="margin-left-xs">{{this.gender}}</text>
				</view>
			</view>

			<!-- 发布人 -->
			<!-- style="border:1rpx solid red" -->
			<view class="user-info-wrap">
				<view class="card-box2 user-info margin-top-sm align-center" v-for="(item,index) in list" :item="item"
					:index="index" :key="index">
					<view class="tip-title">
						<text>{{item.name}}</text>
					</view>
					<!-- 				<view class="user-card flex-row align-center"> -->
					<view class="user-content">
						<view class="user-card">
							<text class="text-xs text-gray">{{"电话："+item.phone}}</text>
						</view>
						<view class="user-card">
							<text class="text-xs text-gray">{{"qq号："+item.qq}}</text>
						</view>
						<view class="user-card">
							<text class="text-xs text-gray">{{"生活作息："+item.content.split('-')[0]}}</text>
						</view>
						<view class="user-card">
							<text class="text-xs text-gray">{{"生活习惯："+item.content.split('-')[1]}}</text>
						</view>
						<view class="user-card">
							<text class="text-xs text-gray">{{"是否吸烟："+item.content.split('-')[2]}}</text>
						</view>
						<view class="user-card">
							<text class="text-xs text-gray">{{"其他需求："+item.content.split('-')[3]}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="re-bottom bg-white shadow-sm">
			<view class="bottom-right " @click="join()">
				<text class="bottom-text text-white text-bold">{{"申请加入"}}</text>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import BottomBar from '@/components/BottomBar.vue';

	export default {
		data() {
			return {
				gender: '',
				dormitoryId: 1,
				building: '',
				dormitoryno: '',
				count: null,
				sex: null,

				list: [{
						name: '蒋凡江',
						phone: '12345678998',
						qq: '1234567898',
						content: '一般11点前入睡，中午会午休-爱整洁，学习时需要安静的环境-不吸烟-dsfsefdfefefewfwfwfwfewfwefewfdfsfwfefwfweffwwfwefewfwfwfwfewfewfwefwefewfwefwefewf',
					},
					{
						name: '蒋凡江',
						phone: '12345678998',
						qq: '1234567898',
						content: '一般11点前入睡，中午会午休-爱整洁，学习时需要安静的环境-不吸烟-dsfsefdf',
					},
					{
						name: '蒋凡江',
						phone: '12345678998',
						qq: '1234567898',
						content: '一般11点前入睡，中午会午休-爱整洁，学习时需要安静的环境-不吸烟-dsfsefdfefefewfwfwfwfewfwefewfdfsfwfefwfweffwwfwefewfwfwfwfewfewfwefwefewfwefwefewf',
					},
					{
						name: '蒋凡江',
						phone: '12345678998',
						qq: '1234567898',
						content: '一般11点前入睡，中午会午休-爱整洁，学习时需要安静的环境-不吸烟-dsfsefdfefefewfwfwfwfewfwefewfdfsfwfefwfweffwwfwefewfwfwfwfewfewfwefwefewfwefwefewf',
					}
				]
			}
		},
		// components: {
		// 	BottomBar
		// },
		methods: {
			showToast() {
				this.$refs.uToast.show({
					title: '加入成功',
					type: 'default',
					url: '/pages/room/room'
				})
			},
			join: function() {
				uni.request({
					url: '/api/v1/dormi_require/apply/' + this.dormitoryId, //仅为示例，并非真实接口地址。
					data: null,
					method: 'PUT',
					timeout: 5000,
					success: (res) => {
						//3.注册成功跳转到登录页面
						if (res.data.code == 200) {
							// uni.navigateTo({ //返回上一页面
							// 	url: '/pages/roomdetail/roomdetail'
							// })
							// this.$u.toast('加入成功')
							this.showToast()
						} else if (res.data.code == 219) {
							this.$u.toast('请先填写宿舍需求表！')
						} else if (res.data.code == 201) {
							this.$u.toast('您已申请过宿舍！')
						} else if (res.data.code == 202) {
							this.$u.toast('该宿舍已满！')
						}
						

					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log("lastid:", option.dormitoryId)
			this.$u.get('/api/v1/dormi_require/' + option.dormitoryId).then(res => { //请求成功执行的函数
				if (res.code == 200) {
					this.list = res.data
					this.dormitoryId = option.dormitoryId
				}
			}).catch(err => { //请求失败执行的函数
				console.log(err)
			})

			this.$u.get('/api/dormitory').then(res => { //请求成功执行的函数
				if (res.code == 200) {
					for (let i = 0; i < res.data.length; i++) {
						if (this.dormitoryId == res.data[i].id) {
							this.building = res.data[i].building
							this.dormitoryno = res.data[i].dormitoryno
							this.count = res.data[i].count
							this.sex = res.data[i].sex
						}
					}
					if (this.sex == 0) {
						this.gender = '男'
					} else {
						this.gender = '女'
					}
					// console.log("id:",item.id);
				}
			}).catch(err => { //请求失败执行的函数
				console.log(err)
			})
		},
	}
</script>

<style>
	.main {
		width: 100%;
		height: auto;
	}

	.card-box1 {
		background-color: white;
		border-radius: 10rpx;
		width: 94%;
		/* border:1rpx solid red; */
		/* 	padding-bottom: 1000rpx; */
		/* height:500rpx; */
	}

	.card-box2 {
		background-color: white;
		border-radius: 10rpx;
		width: 100%;
		/* border:1rpx solid red; */
		/* 	padding-bottom: 1000rpx; */
		/* height:500rpx; */
	}

	.basic-info {
		height: 270rpx;
	}

	.basic-info .info-top {
		width: 94%;
		height: 100rpx;
	}

	.basic-info .info-top .job-name {
		width: 80%;
		font-size: 38rpx;
		line-height: 50rpx;
	}

	.basic-info .info-top .job-salary {
		width: 20%;
		height: 100rpx;
		line-height: 100rpx;
	}

	.basic-info .place-info {
		width: 94%;
		height: 60rpx;
		line-height: 60rpx;
	}

	.basic-info .request-info {
		width: 94%;
		height: 60rpx;
		line-height: 60rpx;
		position: relative;
	}

	.basic-info .request-info text:last-of-type {
		position: absolute;
		right: 0;
	}

	.tip-title {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		border-bottom: 1px solid #f1f1f1;
		padding-left: 26rpx;

	}

	.user-info-wrap {
		width: 94%;
		padding-bottom: 150rpx;
	}

	.user-info {
		width: auto,
			/* width: 94%; */
			/* padding-bottom: 1000rpx; */
			/* 		height: 1000rpx; */
	}

	.user-content {
		width: 94%;
		/* 	padding-top:20rpx;
		padding-bottom: 20rpx; */
		padding-left: 20rpx;

	}

	.user-card {
		width: 100%;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		white-space: pre-wrap;
		/* 允许换行，并保留换行符 */
		word-wrap: break-word;
		/* 允许在单词内换行 */
		/* 		height: 100rpx; */
	}

	.relate-request {
		height: auto;
	}

	.relate-request .request-tag-list {
		width: 94%;
		height: auto;
		margin-bottom: 10rpx;
		flex-wrap: wrap;
	}

	.relate-request .request-tag-list .tag-item {
		height: 40rpx;
		line-height: 40rpx;
		padding: 0 10rpx;
		font-size: 12px;
		border-radius: 5rpx;
		color: #606266;
		margin-top: 10rpx;
		margin-left: 20rpx;
		white-space: nowrap;
	}

	.job-intro {
		width: 94%;
		height: auto;
		margin-bottom: 160rpx;
	}

	.job-intro .intro {
		width: 94%;
		height: auto;
		line-height: 50rpx;
		margin-bottom: 20rpx;
	}

	.container>>>.re-bottom {
		position: fixed;
		bottom: 0;
	}



	//下方按钮
	.re-bottom {
		width: 100%;
		height: 100rpx;
		border-radius: 20rpx 20rpx 0 0;
	}

	.bottom-right {
		/* 		border:1rpx solid red; */
		margin-left: 150rpx;
		
		width: 60%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #ffaa00;
	}

	.bottom-text {
		/* border:1rpx solid red; */
		/* 		align-items: center; */
		margin-left: 200rpx;
	}

	.bottom-right:active {
		opacity: 0.9;
	}
</style>