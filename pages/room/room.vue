<template>
	<view class="wrapp">
		<view class="empty_content" v-if="!isShow" style="margin-top: 300rpx;
		 border:1rpx solid red;fontSize:35rpx;text-align: center; color:#6d6d6d">
			您还未登录
		</view>
		<!-- <u-divider color="#6d6d6d" half-width="30%" fontSize="30" border-color="#6d6d6d" >您还未登录</u-divider> -->
		<view class="wrap" v-if="isShow">
			<view class="myrequest" style="padding-top: 10rpx; padding-bottom: 10rpx;" @click="toMyroom()">
				<text class="mytext" style="font-size: 20px; color: red;">我的申请</text>
				<u-icon name="arrow-right-double" size="40rpx" color="red"></u-icon>
			</view>
			<view class="waterfall">
				<u-waterfall v-model="flowList" ref="uWaterfall" add-time="50">
					<template v-slot:left="{leftList}">
						<view class="demo-warter" v-for="(item,index) in leftList" :key="index" @click="toRoomDetail(item.id)">
							<view class="demo-title">
								<!-- {{item.id}} -->
								{{item.building[0]+item.building[2]+item.dormitoryno}}
							</view>
							<view class="demo-price">
								已组{{item.count}}/4人
							</view>
							<view class="demo-shop">
								{{item.building}}
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="toRoomDetail(item.id)">
							<view class="demo-title">
								{{item.building[0]+item.building[2]+item.dormitoryno}}
							</view>
							<view class="demo-price">
								已组{{item.count}}/4人
							</view>
							<view class="demo-shop">
								{{item.building}}
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
		
			<view class="btn">
				<u-button @click="toTable()">填表</u-button>
			</view>
		
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:0,
				loadStatus: 'nomore',
				flowList: [],
				list: [
					{
						building:'竹园四栋',
						count:0,
						dormitoryno:'竹四201',
						id:1
					},
					{
						building:'竹园四栋',
						count:1,
						dormitoryno:'竹四202',
						id:2
					},
					{
						building:'竹园四栋',
						count:2,
						dormitoryno:'竹四203',
						id:3
					},
					{
						building:'竹园四栋',
						count:3,
						dormitoryno:'竹四204',
						id:4
					},
					{
						building:'竹园四栋',
						count:4,
						dormitoryno:'竹四205',
						id:5
					},
					{
						building:'竹园四栋',
						count:0,
						dormitoryno:'竹四206',
						id:6
					},
					{
						building:'竹园四栋',
						count:1,
						dormitoryno:'竹四207',
						id:7
					},
					{
						building:'竹园四栋',
						count:2,
						dormitoryno:'竹四208',
						id:8
					},
					{
						building:'竹园四栋',
						count:3,
						dormitoryno:'竹四209',
						id:9
					},
					{
						building:'竹园四栋',
						count:4,
						dormitoryno:'竹四210',
						id:10
					}
				]
			}
		},
		onLoad() { 
			//在页面加载的时候就会执行这个函数
			//发送请求去查询电影列表数据
			//uni.request({}) 这个属于是uniapp中的请求方式
			//使用uview中的请求方式请求数据
			this.$u.get('/api/dormitory/user').then(res => { //请求成功执行的函数
				console.log("res:",res);
				if (res.code == 200) {
					this.isShow=1
					this.list=res.data
					this.addRandomData();
					console.log("list:",this.list)
				}
				else if(res.code==214){
					this.isShow=0
				}
			}).catch(err => { //请求失败执行的函数
				console.log(err)
			})
		},
		methods: {
			toTable: function() { //跳转到宿舍需求的页面
				uni.navigateTo({
					url: '/pages/roomtable/roomtable'
				})
			},
			toRoomDetail: function(id) { //跳转到宿舍需求的页面
				uni.navigateTo({
					url: '/pages/roomdetail/roomdetail?dormitoryId='+id,
				})
				// console.log("firstid:",id)
			},
			toMyroom: function(){
				uni.navigateTo({
					url:'/pages/myroom/myroom'
				})
			},
			addRandomData() {
				for (let i = 0; i < this.list.length; i++) {
					// let index = this.$u.random(0, this.list.length - 1);
					let index = i
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = this.list[index]
					// let item = JSON.parse(JSON.stringify(this.list[index]))
					// item.id = this.$u.guid();
					this.flowList.push(item);
					// console.log("id:",item.id);
				}
			},
			// remove(id) {
			// 	this.$refs.uWaterfall.remove(id);
			// },
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		/* border:1rpx solid red; */
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.wrap {
		position: relative;
		/* 使页面内容相对定位，以便按钮位置相对于页面 */
	}

	.btn {
		position: fixed;
		/* 使用固定定位 */
		bottom: 20px;
		/* 距离底部的距离 */
		right: 20px;
		/* 距离右侧的距离 */
		width: 60px;
		/* 按钮宽度 */
		height: 60px;
		/* 按钮高度 */
		// background-color: #007bff;
		/* 按钮背景颜色 */
		border-radius: 50%;
		/* 使按钮呈圆形 */
		color: #fff;
		/* 文字颜色 */
		text-align: center;
		line-height: 60px;
		/* 文字垂直居中 */
		cursor: pointer;
		/* 可以添加其他样式属性，如阴影等 */
	}
	.demo-tag {
			// display: flex;
			margin-top: 5px;
		}
		
	.demo-tag-text {
			border: 1px solid $u-type-primary;
			color: $u-type-primary;
			margin-left: 10px;
			border-radius: 50rpx;
			line-height: 1;
			width: 50%;
			padding: 4rpx 14rpx;
			// display: flex;
			align-items: center;
			border-radius: 50rpx;
			font-size: 20rpx;
		}
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}


	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>