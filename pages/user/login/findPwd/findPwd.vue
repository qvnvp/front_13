<template>
	<view class="" >
		<u-field v-model="mobile" label="手机号" placeholder="请填写已绑定的手机号"></u-field>
		<u-field
			v-model="code"
			label="验证码"
			placeholder="请填写验证码"
		>
			<u-button size="mini" slot="right" type="success" @tap="getCode">{{codeText}}</u-button>
		</u-field>
		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		
		<u-button class="button" type="error" @click="submit()" >提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				codeText: '',
				user:{}
				
			}
		},
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
		methods: {
			submit(){
				//判断修改成功后进入重置密码页面
				this.$refs.validateFormRef.validate(valid=>{
					if(valid){
						uni.request({
						url:'/api/user/send/'+this.mobile,
						method:'GET',
						data:this.data,
						timeout:5000,
						success:function(res){
							//验证码发送成功比对验证码是否正确
							console.log("res:",res)
							if(res.data.code==200){
								uni.request({
									url:'/api/user/password/'+this.user.phone+'/'+this.user.code,
									method:'GET',
									data:this.user,
									timeout:5000,
									success:function(res){
										//验证码一致则收到user信息，调用更改密码接口
										console.log("res:",res)
										if(res.data.code==200){
											uni.setStorageSync("find_user",res.data.data)
											uni.navigateTo({
												url:'/pages/user/login/findPwd/find_changePwd/find_changePwd'
											})
										}
										else{
											uni.showToast({
												title: res.data.message,
												icon: 'none',
												duration: 2000
											})  
										}
									},
									fail:function(){
										console.log("注册失败")
									}
								})
								uni.showToast({
									title: '修改成功',
									icon: 'none',
									duration: 2000
								}) 
								setTimeout(()=>{
									uni.navigateTo({
										url:'/pages/person/person'
									});
								},2000); //延迟2秒后跳转
							}
							else{
								uni.showToast({
									title: '修改失败',
									icon: 'none',
									duration: 2000
								})  
							}
						},
						fail:function(){
							console.log("修改失败")
						}
				})
					}
				})
			},
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				}else {
					this.$u.toast('倒计时结束后再发送');
				}
			}
		}
	}
</script>
<style>
	.button{
		top:100rpx;
	}
</style>