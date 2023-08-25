<template>
	<view style="padding: 15px;">
		<u-toast ref="uToast" />
		<u-form ref="validateFormRef" :model="user" :label-width="150">
			<u-form-item label="姓名" prop="name" required>
				<u-input v-model="user.name" placeholder="请输入姓名" />
			</u-form-item>
			<u-form-item label="电话" prop="phone" required>
				<u-input v-model="user.phone" placeholder="请输入注册姓名" />
			</u-form-item>
			<u-form-item label="QQ号" prop="qq" required>
				<u-input v-model="user.qq" placeholder="请输入注册密码" />
			</u-form-item>
			<u-form-item label="生活作息" prop="zuoxi" required>
				<u-input type="textarea" v-model="user.zuoxi" placeholder="早睡或晚睡,是否有午休习惯等" />
			</u-form-item>
			<u-form-item label="生活习惯" prop="xiguan" required>
				<u-input type="textarea" v-model="user.xiguan" placeholder="是否爱整洁,是否需要安静的学习环境等" />
			</u-form-item>
			<u-form-item label="是否吸烟" prop="xiyan" required>
				<u-input v-model="user.xiyan" placeholder="是否吸烟" />
			</u-form-item>
			<u-form-item label="其他需求" prop="other" required>
				<u-input type="textarea" v-model="user.other" placeholder="填写其他需求" />
			</u-form-item>
		</u-form>
		<u-button :disabled="isUnchanged" type="error" @click="submit()">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rules: {
					name: [{
						required: true,
						message: '请输入姓名!',
						trigger: 'blur'
					}, ],
					phone: [{
						required: true,
						message: '请输入电话号码!',
						trigger: 'blur'
					}, ],
					qq: [{
						required: true,
						message: '请输入QQ号!',
						trigger: 'blur'
					}, ],
					zuoxi: [{
						required: true,
						message: '请输入生活作息!',
						trigger: 'blur'
					}, ],
					xiguan: [{
						required: true,
						message: '请输入生活习惯!',
						trigger: 'blur'
					}, ],
					xiyan: [{
						required: true,
						message: '请输入是否吸烟!',
						trigger: 'blur'
					}, ],
					other: [{
						required: true,
						message: '请输入其他需求!',
						trigger: 'blur'
					}, ],
				},
				user: {
					name: '',
					phone:'',
					qq:'',
					zuoxi:'',
					xiguan:'',
					xiyan:'',
					other:'',
				},
				student: {
					name: '',
					phone:'',
					qq:'',
					content:''	
				},
				defaultzuoxi:'',
				defaultxiguan:'',
				defaultxiyan:'',
				defaultother:'',
				defaultname:'',
				defaultphone:'',
				defaultqq:'',
			}
		},
		computed:{
			isUnchanged(){
				return(
					this.user.zuoxi===this.defaultzuoxi &&
					this.user.xiguan===this.defaultxiguan &&
					this.user.xiyan===this.defaultxiyan &&
					this.user.other===this.defaultother &&
					this.user.name===this.defaultname &&
					this.user.phone===this.defaultphone &&
					this.user.qq===this.defaultqq
				);
			}
		},
		onReady() {
			this.$refs.validateFormRef.setRules(this.rules);
		},
		onLoad() { 
			this.$u.get('/api/v1/dormi_require/user').then(res => { //请求成功执行的函数
				console.log("loadres:",res);
				if (res.code == 200) {
					this.user.zuoxi=res.data.content.split('-')[0]
					this.user.xiguan=res.data.content.split('-')[1]
					this.user.xiyan=res.data.content.split('-')[2]
					this.user.other=res.data.content.split('-')[3]
					this.user.name=res.data.name
					this.user.phone=res.data.phone
					this.user.qq=res.data.qq
					this.defaultzuoxi=res.data.content.split('-')[0]
					this.defaultxiguan=res.data.content.split('-')[1]
					this.defaultxiyan=res.data.content.split('-')[2]
					this.defaultother=res.data.content.split('-')[3]
					this.defaultname=res.data.name
					this.defaultphone=res.data.phone
					this.defaultqq=res.data.qq
				}
				// console.log("comalist:",this.comalist)
			}).catch(err => { //请求失败执行的函数
				console.log(err)
			})
		},
		methods: {
			showToast() {
				this.$refs.uToast.show({
					title: '修改成功',
					type: 'default',
					url: '/pages/room/room'
					// back: true
				})
			},
			submit: function() {
				//1.验证表单是否都通过了验证
				this.$refs.validateFormRef.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.student.content=this.user.zuoxi+'-'+this.user.xiguan+'-'+this.user.xiyan+'-'+this.user.other
						this.student.name=this.user.name
						this.student.phone=this.user.phone
						this.student.qq=this.user.qq
						console.log("student:", this.student);
						// 2.向后端发起请求，实现注册，如果注册成功，跳转到登录页面
						uni.request({
							url: '/api/v1/dormi_require', //仅为示例，并非真实接口地址。
							data: this.student,
							method: 'POST',
							timeout: 5000,
							success: (res) => {
								//3.注册成功跳转到登录页面
								if (res.data.code == 200) {
									this.showToast()
								}

							},
							fail: (err) => {
								console.log(err)
							}
						})
					}
					// else {
					// 	console.log('验证失败');
					// }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.agreement {
		display: flex;
		align-items: center;
		margin: 40rpx 0;

		.agreement-text {
			padding-left: 8rpx;
			color: $u-tips-color;
		}
	}
</style>