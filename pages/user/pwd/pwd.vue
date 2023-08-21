<template>
	<view class="" >
		<u-form ref="validateFormRef" 
		:model="user" :label-width="150" 
		validate-trrigger="bind" style="padding:10rpx 40rpx;">
		    <u-form-item label="输入原密码" prop="oldPassword" required>
		        <u-input type="password" v-model="user.oldPassword" placeholder="请输入原登录密码"/>
		    </u-form-item>
			<u-form-item label="修改密码" prop="newPassword" required>
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
			var validatePass = (rule, value, callback) => {
			        if (value === '') {
			                callback(new Error('请输入密码'));
			        } else {
			          if (this.d.confirmPassword !== '') {
			              this.$refs.user.validateField('confirmPwd');
			          }
			          callback();
			        }
			      };
			var validatePass2 = (rule, value, callback) => {
			          if (value === '') {
			              callback(new Error('请再次输入密码'));
			          } else if (value !== this.user.password) {
			              callback(new Error('两次输入密码不一致!'));
			          } else {
			              callback();
			          }
			      };
			return {
				mobile: '',
				code: '',
				codeText: '',
				rules:{
					oldPassword: [
					    {required: true, message: '请输入密码!', trigger: 'blur'},
					    //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请输入密码!', trigger: 'blur'},
						{
							min: 6,
							max: 12,
							message: '长度在6-12个字符之间'
						},
						{validator: validatePass, trigger: 'blur' }
					],
					newPassword: [
					    {required: true, message: '请输入密码!', trigger: 'blur'},
					    //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请输入密码!', trigger: 'blur'},
						{
							min: 6,
							max: 12,
							message: '长度在6-12个字符之间'
						},
						{validator: validatePass, trigger: 'blur' }
					],
					confirmPassword: [
					    {required: true, message: '请确认密码!', trigger: 'blur'},
					    //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请确认密码!', trigger: 'blur'},
						{validator: validatePass2, trigger: 'blur' }
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
			submit:function(){
				//判断修改成功后返回个人中心页面
				this.$refs.validateFormRef.validate(valid=>{
						if(valid){
							uni.request({
							url:'/api/user/password',
							method:'PUT',
							data:this.user,
							timeout:5000,
							success:function(res){
								//修改成功跳转到个人中心页面
								console.log("res:",res)
								if(res.data.code==200){
									uni.setStorageSync("user",res.data.data)
									uni.navigateTo({
										url:'/pages/user/details/details'
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
						}
					})
					
				}
			},
		
	}
</script>