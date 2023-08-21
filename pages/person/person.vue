<template>
	<view>
		<!--登录之后显示的内容-->
		<view v-if="isLogin">
			<view class="u-flex-col u-p-30 u-col-center">
				<u-image width='150rpx' height='150rpx' :src='imgArr[0]' shape="circle"></u-image>
				<u-button size="mini" style="margin-top: 10rpx;" @click="chooseAvaters=true">编辑头像</u-button>
				<!-- 头像弹窗 -->
				<u-action-sheet :list="lists" v-model="chooseAvaters" @click="editAvater"></u-action-sheet>
			</view>
			<u-cell-group>
				<u-cell-item title="用户名" value="184177677" :arrow="false"></u-cell-item>
				<u-cell-item title="昵称" value="新生" :arrow="false"></u-cell-item>
				<u-cell-item title="学院" value="计算机学院" :arrow="false"></u-cell-item>
				<u-cell-item title="修改个人信息" @click="changeDetails()"></u-cell-item>
				<u-cell-item title="修改密码" @click="changePwd()"></u-cell-item>
			</u-cell-group>
		</view>
		<!--登录之前显示的内容-->
		<view v-else>
			<view class="u-flex-col u-p-30 u-col-center">
					<u-image width='150rpx' height='150rpx' :src="headImg" shape="circle"></u-image>
					<text class="u-p-t-10 change">未登录</text>
			</view>
			<u-button class="button" shape="square"  @click="toLogin()">登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headImg:'/static/logo.png',
				sex: '男',
				isLogin:true,
				chooseAvaters: false, // 操作菜单的显示隐藏
				lists: [  // 操作菜单的列表内容
					{
					    text: '更换头像',
					    color: '',
					    fontSize: 28,
					},
					{
					    text: '查看大图',
					    color: '',
					    fontSize: 28,
					}
				],
				imgArr:'',

			}
		},
		onShow() {//在页面显示时调用这个周期函数
		//1.从storage中回调用户数据
			let user=uni.getStorageSync("user")
			//2.判断用户信息是否不为空
			if(user){
				this.isLogin=true;
				this.user=user;
			}
		},
		methods: {
			selectSex() {
				const arr = ['男', '女', '保密']
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						this.sex = arr[res.tapIndex]
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			toLogin:function(){
				uni.navigateTo({
					url:'/pages/user/login/login'
				})
			},
			changeDetails:function(){
				uni.navigateTo({
					url:'/pages/user/details/details'
				})
			},
			changePwd:function(){
				uni.navigateTo({
					url:'/pages/user/pwd/pwd'
				})
			},
			chooseAvater() {
				this.chooseAvaters = true
			},
			editAvater(index) {
				if (index === 0) {
					this.chooseImage()
				} else {
					this.previewImage()
				}
			},
			chooseImage (){
				uni.chooseImage({
				    count:1,//限制图片上传数量，封顶9张
				    success:(res)=>{//拿到图片的返回数据
				    this.imgArr = res.tempFilePaths
				    }
				})
			},
			previewImage(){
				uni.previewImage({
					urls: [this.imgArr[0]],//拿头像地址
				})
			},

		}
	}
</script>

<style>
.change{
	color: #247dff;
}
.button{
	top:100rpx;
}
</style>
