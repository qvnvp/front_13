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
			return {
				user:{
					password:'',
					confirmPassword:'',
				},
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
						{pattern: /^(?=.*\S).+$/, message: '请确认密码!', trigger: 'blur'}
					],
				},
			}
		},
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
		methods: {
			submit:function(){
				
			}
		}
	}
</script>

<style>
.button{
	top:100rpx;
}
</style>
