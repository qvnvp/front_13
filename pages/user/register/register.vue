<template>
    <view style="padding: 15px;" >
        <u-form ref="validateFormRef" :model="d" :label-width="150" validate-trrigger="bind">
            <u-form-item label="登录账号" prop="snumber" required >
                <u-input v-model="d.snumber" placeholder="请输入登录账号"/>
            </u-form-item>
			
            <u-form-item label="修改密码" prop="password" required>
                <u-input type="password" v-model="d.password" placeholder="请修改登录密码"/>
            </u-form-item>
			<u-form-item label="确认密码" prop="confirmPassword" required>
			    <u-input type="password" v-model="d.confirmPassword" placeholder="请确认登录密码"/>
			</u-form-item>
        </u-form>
		<u-field v-model="d.phone" label="手机号" placeholder="请填写手机号"></u-field>
		<u-field v-model="d.code" label="验证码" placeholder="请填写验证码">
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
				codeText:'',
				rules: {
				    accounts: [
				        {required: true, message: '请输入账号!', trigger: 'blur'},
				    ],
				    password: [
				        {required: true, message: '请输入密码!', trigger: 'blur'},
				        //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请输入密码!', trigger: 'blur'}
				    ],
				  //   confirmPassword: [
				  //       {required: true, message: '请确认密码!', trigger: 'blur'},
				  //       //pattern 规则
						// {pattern: /^(?=.*\S).+$/, message: '请确认密码!', trigger: 'blur'}
				  //   ],
				},
				confirm_password: {
					rules: [{
							required: true,
							errorMessage: '请再次输入新密码',
						},
						{
							validateFunction: function(rule, value, data, callback) {
								if (value != this.d.password) {
									callback('两次输入的密码必须相同')
								}
								return true
							}
						}
					]
				},
				d:{
					code:'',
					password:'',
					confirmPassword:'',
					phone:'',
					snumber:''
				}
				
            };
        },
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
        methods: {
			//注册的方法
			submit:function(){
				this.$refs.validateFormRef.validate(valid=>{
					if(valid){
						uni.request({
						url:'/api/user/register',
						method:'POST',
						data:this.d,
						timeout:5000,
						success:function(res){
							//绑定成功跳转到个人中心页面
							console.log("res:",res)
							if(res.data.code==200){
								uni.setStorageSync("user",res.data.data)
								uni.navigateTo({
									url:'/pages/user/details/details'
								})
							}
							if(res.data.code=='000'){
								uni.showToast({
									title: '输入密码不一致',
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
				
			},codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 向后端请求验证码
					uni.request({
						url:'/api/user/send/'+this.d.phone,///根据后端更改地址
						
						//data:this.d,
						method:'GET',
						timeout:5000,
						success:(res)=>{//请求成功之后执行的回调函数
							console.log("res:",res);
							//3.如果登录成功，将用户的数据存储在storage中，以便验证
							// if(res.data.code==200){
							// 	uni.setStorageSync("user",res.data.data)
							// 	//4.返回个人中心页面
							// 	uni.reLaunch({
							// 		url:'/pages/person/person'
							// 	})
							// }else if(res.data.code==250){
							// 	uni.navigateTo({
							// 		url:'/pages/user/register/register'
							// 	})
							// }else{
							// 	this.$u.toast('用户名或密码错误')
							// }
							
						},
						fail:(err)=>{
							console.log(err)
						}
					});
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				}
				else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			
		}
    }
</script>

<style>
	.button{
		top:100rpx;
	}
</style>
