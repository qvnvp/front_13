<template>
    <view style="padding: 15px;" >
        <u-form ref="validateFormRef" :model="d" :label-width="150" validate-trrigger="bind">
            <!-- <u-form-item label="登录账号" prop="snumber" required >
                <u-input v-model="d.snumber" placeholder="请输入登录账号"/>
            </u-form-item> -->
			
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
			var validatePass = (rule, value, callback) => {
			        if (value === '') {
			                callback(new Error('请输入密码'));
			        } else {
			    //       if (this.d.confirmPassword !== '') {
			    //           this.$refs.d.validateField('password',(err) => {
							// 	if (err) {
							// 	  callback(err);
							// 	} else {
							// 	  callback();
							// 	}
							//   });
							// }
			    //       else{callback();}
				callback();
			        }
			      };
			var validatePass2 = (rule, value, callback) => {
			          if (value === '') {
			              callback(new Error('请再次输入密码'));
			          } else{ 
						  if (value !== this.d.password) {
							callback(new Error('两次输入密码不一致!'));
							} 
						else {
			              callback();}
					  }
			      };
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
						{pattern: /^(?=.*\S).+$/, message: '请先输入密码!', trigger: 'blur'},
						{ validator: validatePass, trigger: 'blur' }
				    ],
				    confirmPassword: [
				        {required: true, message: '请确认密码!', trigger: 'blur'},
				        //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请再次确认密码!', trigger: 'blur'},
						{validator: validatePass2, trigger: 'blur', required: true }
				    ],
				  
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
					console.log("验证：",valid)
					if(valid){
						console.log("提交")
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
					else{console.log("表单验证不通过")}
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
