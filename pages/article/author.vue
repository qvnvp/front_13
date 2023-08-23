<!-- 点击头像进入的页面 -->
<template>
	<view class="container">
		<!-- 作者用户渲染界面 -->
		<view class="top_container" style="height: 280px; position: relative;">
			<image src="../../static/img/back.png" style="position: fixed; top:10px; left: 10px; height: 35px; width: 35px; z-index: 999;" @click="goback"></image>
			<view>
				<image src="../../static/logo.png" style="height: 270px; width: 100%; filter: blur(6px)"></image>
			</view>
			<view style="position: absolute; bottom: 0; height: 80px; width: 100%; background-color: #fff;">
				<view style="position: absolute; top: -30px; right: 20px; display: flex; flex-direction: row;">
					<view style="margin: 40px 10px; font-size: 14px; font-weight: bold;">ikun</view>
					<image src="../../static/logo.png" style="height: 60px; width: 60px;"></image>
				</view>
			</view>
		</view>
		<!-- 作用文章渲染界面 -->
		<view v-for="(item, index) in this.data" :key="index"
			style="height: 100px; width: 100%; padding: 0px 10px; display: flex; flex-direction: row;">
			<view class="time"
				style="width: 100px; height: 100%; display: flex; flex-direction: row; padding-top: 5px;">
				<view style="font-size: 40px;">{{getDateDay(item.createdTime)}}</view>
				<view style="font-size: 24px; padding-top: 16px;">{{getDateMonth(item.createdTime)}}</view>
			</view>
			<!-- <view class="content"
				style="margin-top: 5px; margin-left: 10px; width: 89px; height: 89px; display: grid; grid-template-columns: repeat(2, 1fr);grid-template-rows: repeat(2, 1fr);grid-gap: 1px;">
				<view style="height: 40px; width: 40px; border: 1px solid red;"></view>
				<view style="height: 40px; width: 40px; border: 1px solid red;"></view>
				<view style="height: 40px; width: 40px; border: 1px solid red;"></view>
				<view style="height: 40px; width: 40px; border: 1px solid red;"></view>
			</view> -->
			<view style="font-size: 15px; font-weight: 500; padding-top: 10px; padding-left: 6px;">
				{{item.title}}
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
				authorName: '',
				authorAvatar: ''
			}
		},
		methods: {
			submit() {
				console.log(this.data)
			},
			getDateMonth(timestamp) {
				var date = new Date(timestamp);
				var month = date.getMonth() + 1;
				return this.addLeadingZero(month);
			},
			getDateDay(timestamp) {
				var date = new Date(timestamp);
				var day = date.getDate();
				return day;
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
			goback(){
				uni.navigateBack({
				    delta: 1
				});
			}
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

</style>