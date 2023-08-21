<template>
	<view>
		<u-form ref="validateFormRef"
		:model="user" :label-width="150" 
		validate-trrigger="bind" style="padding:10rpx 40rpx;">
		    <u-form-item label="输入密码" prop="password" required>
		        <u-input type="password" v-model="user.password" placeholder="请输入修改后的登录密码"/>
		    </u-form-item>
			<u-form-item label="确认密码" prop="confirmPassword" required>
			    <u-input type="password" v-model="user.confirmPassword" placeholder="请确认登录密码"/>
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
				user:{
					userId:'',
					password:'',
					confirmPassword:'',
				},
				user_data:{},
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
						{validator: validatePass, trigger: 'blur' }
					],
					confirmPassword: [
					    {required: true, message: '请确认密码!', trigger: 'blur'},
					    //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请确认密码!', trigger: 'blur'},
						{validator: validatePass2, trigger: 'blur' }
					],
				},
			}
		},
		onShow() {//在页面显示时调用这个周期函数
		//1.从storage中回调用户数据
			let find_user=uni.getStorageSync("find_user")//从验证码页面收到的用户信息
			//2.判断用户信息是否不为空
			if(find_user){
				this.user.userId=find_user.sname;
				this.user_data=find_user;
			}
		},
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
		methods: {
			submit:function(){
				//判断修改成功后返回登录页面
				this.$refs.validateFormRef.validate(valid=>{
						if(valid){
							uni.request({
							url:'/api/user/password',
							method:'PUT',
							data:this.user,
							timeout:5000,
							success:function(res){
								//修改成功跳转到登录页面
								console.log("res:",res)
								if(res.data.code==200){
									uni.navigateTo({
										url:'/pages/user/login/login'
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
								console.log("找回失败")
							}
					})
						}
					})
					
				}
		}
	}
</script>

<style>
.button{
	top:100rpx;
}
</style>
