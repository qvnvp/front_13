<template>
	<view>
		<!--登录之后显示的内容-->
		<view v-if="isLogin">
			<view class="u-flex-col u-p-30 u-col-center">
				<u-image width='150rpx' height='150rpx' :src="user.avatar" shape="circle"></u-image>
				<u-button size="mini" style="margin-top: 10rpx;" @click="chooseAvaters=true">编辑头像</u-button>
				<!-- 头像弹窗 -->
				<u-action-sheet :list="lists" v-model="chooseAvaters" @click="editAvater"></u-action-sheet>
			</view>
			<u-cell-group>
				<u-cell-item title="用户id" :value="user.id" :arrow="false"></u-cell-item>
				<u-cell-item title="昵称" :value="user.name" :arrow="false"></u-cell-item>
				<u-cell-item title="个人主页" @click="userPage()"></u-cell-item>
				<u-cell-item title="修改个人信息" @click="changeDetails()"></u-cell-item>
				<u-cell-item title="修改密码" @click="changePwd()"></u-cell-item>
				
			</u-cell-group>
			<u-button class="button" shape="square" type="error" @click="exit()">退出登录</u-button>
		</view>
		<!--登录之前显示的内容-->
		<view v-else>
			<view class="u-flex-col u-p-30 u-col-center">
					<u-image width='150rpx' height='150rpx' src="@/static/logo.jpg" shape="circle"></u-image>
					<text class="u-p-t-10 change" style="margin-top: 20rpx;">未登录</text>
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
				isLogin:false,
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
				user:{},
				

			}
		},
		onShow() {//在页面显示时调用这个周期函数
		//1.从storage中回调用户数据
			let user=uni.getStorageSync("user")
			//2.判断用户信息是否不为空
			if(user){
				this.isLogin=true;
				uni.request({
					url:'/api/user',
					method:'GET',
					timeout:5000,
					success: (res) => {
						console.log("调取登录用户数据:",res)
						if(res.data.code=='200'){
							this.user=res.data.data;
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
			
			//let user=getStora
			
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
			//退出登录的函数
			exit:function(){
				//清空storage中的用户数据
				uni.clearStorageSync("user")
				//刷新当前页面
				uni.reLaunch({
					url:'/pages/person/person'
				})
			},
			userPage:function(){
				uni.navigateTo({
					url:'/pages/person/userPage/userPage'
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
				    //count:1,//限制图片上传数量，封顶9张
				    success:(res)=>{//拿到图片的返回数据
				    const tempFilePaths=res.tempFilePaths;
				    const tempFiles=res.tempFiles;
					uni.uploadFile({
						url:'/api/file/picture',
						// filePath:tempFilePaths[0],
						file : tempFiles[0],
						name:'file',
						success: (res) => {//返回url
							console.log(res);
							if(res.statusCode=='200'){
								this.user.avatar =JSON.parse(res.data).data
								uni.request({
									url:'/api/user',
									method:'PUT',
									data:this.user,
									timeout:5000,
									success:function(res){
										console.log(res)
									},
									fail:function(){
										console.log("修改失败")
									},
								})
							}
							
							
						}
					})
				    }
				})
			},
			previewImage(){
				uni.previewImage({
					urls: [this.user.avatar[0]],//拿头像地址
				})
			},
			goPage(url) {
				if (url) this.$u.route('/pages/person/' + url)
			}

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
