<template>
    <view class="wrap">
        <view class="content">
			<u-image class="image" style="padding:10rpx 200rpx;"  mode="widthFix" src="@/static/logo.jpg"></u-image>
            <view class="title u-text-center">欢迎登录</view>
            <u-form ref="validateFormRef" :model="user">
                <u-form-item label="账号" prop="snumber" :border-bottom="false">
                    <u-input class="u-border-bottom" v-model="user.snumber" placeholder="请输入账号"/>
                </u-form-item>
                <u-form-item label="密码" prop="password" :border-bottom="false">
                    <u-input type="password" class="u-border-bottom" v-model="user.password" placeholder="请输入密码"/>
                </u-form-item>
            </u-form>
            <button :style="" class="loginBtn" @click="login()">登录</button>
            <view class="alternative">
                <!-- <view class="password" @click="toRegister('/pages/users/register/register')">注册</view> -->
                <view class="issue" @click="toFindPwd()">忘记密码</view>
            </view>
			
        </view>
    </view>
</template>

<script>
    
    export default {
        data() {
            return {
                show: false,
                user: {
                    snumber: '', //user对象的属性
                    password: ''//user对象的属性
                },
                rules: {
                    snumber: [
						//required表示是否必须填写，message表示提示的信息 trigger->触发验证的事件 blur->失去焦点 focus:获得焦点
                        {required: true, message: '请输入账号!', trigger: 'blur'},
                        
                    ],
                    password: [
                        {required: true, message: '请输入密码!', trigger: 'blur'},
                        //pattern 规则
						{pattern: /^(?=.*\S).+$/, message: '请输入密码!', trigger: 'blur'}
                    ]
                }
                
            }
        },
        computed: {
            
        },
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
        
        methods: {
			toFindPwd:function(){
				uni.navigateTo({
					url:'/pages/user/login/findPwd/findPwd'
				})
			},
			//登录的方法
			login:function(){
				//1.验证表单是否都通过了验证
				this.$refs.validateFormRef.validate(valid => {
					if (valid) {
						console.log('验证通过');
						//2.向后端发起请求，实现登录，如果登陆成功跳转到个人中心
						uni.request({
							url:'/api/user/login',///根据后端更改地址
							data:this.user,
							method:'POST',
							//timeout:8000,
							success:(res)=>{//请求成功之后执行的回调函数
								console.log("res:",res);
								//3.如果登录成功，将用户的数据存储在storage中，以便验证
								if(res.data.code==200){
									uni.setStorageSync("user",res.data.data)
									// localStorage.setItem('user',res.data.data)
									//4.返回个人中心页面
									uni.reLaunch({
										url:'/pages/person/person'
									})
								}else if(res.data.code==250){
									uni.navigateTo({
										url:'/pages/user/register/register'
									})
								}else{
									this.$u.toast('用户名或密码错误')
								}
								
							},
							fail:(err)=>{
								console.log(err)
							}
						});
					} 
				});
			}
        }
    };
</script>

<style lang="scss" scoped>
    @import "./index.scss";
	
</style>
