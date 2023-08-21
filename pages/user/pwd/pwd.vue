<template>
	<view class="" >
		
		<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		<u-form ref="validateFormRef" 
		:model="user" :label-width="150" 
		validate-trrigger="bind" style="padding:10rpx 40rpx;">
		    <u-form-item label="输入原密码" prop="password" required>
		        <u-input type="password" v-model="user.oldPassword" placeholder="请输入原登录密码"/>
		    </u-form-item>
			<u-form-item label="修改密码" prop="password" required>
			    <u-input type="password" v-model="user.newPassword" placeholder="请输入新的登录密码"/>
			</u-form-item>
			<u-form-item label="确认密码" prop="confirmPassword" required>
			    <u-input type="password" v-model="user.confirmPassword" placeholder="请确认新的登录密码"/>
			</u-form-item>
		</u-form>
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
				rules:{
					password: [
					    {required: true, message: '请输入密码!', trigger: 'blur'},
					    //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请输入密码!', trigger: 'blur'},
						{
							min: 6,
							max: 12,
							message: '长度在6-12个字符之间'
						},
					],
					confirmPassword: [
					    {required: true, message: '请确认密码!', trigger: 'blur'},
					    //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请确认密码!', trigger: 'blur'},
						{
							validateFunction: function(rule, value, data, callback) {
								if (value != data.password) {
									callback('两次输入的密码必须相同')
								}
									return true
							}
						}
					],
				},
				user:{
					accounts:'',
					oldPassword:'',
					newPassword:'',
					confirmPassword:'',
				},
			}
		},
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
		methods: {
			submit(){
				//判断修改成功后返回个人中心页面
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