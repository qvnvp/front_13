<template>
	<view class="wrap">
		<view class="empty_content" v-if="!isShow" style="margin-top: 300rpx;
		 border:1rpx solid red;fontSize:35rpx;text-align: center; color:#6d6d6d">
			您还未登录
		</view>
		<view v-if='isShow' style="padding: 15px;">
			<u-form ref="validateFormRef" :model="user" :label-width="150">
				<u-form-item label="姓名" prop="name" required>
					<u-input v-model="user.name" placeholder="请填写姓名" />
				</u-form-item>
				<u-form-item label="性别" prop="gender" required>
					<u-radio-group v-model="gender">
						<u-radio @change="radioChange" v-for="(item, index) in radioList" :key="index" :name="item.name"
							:disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="身份证号" prop="certificatesNo" required>
					<u-input v-model="user.certificatesNo" placeholder="请填写身份证号" />
				</u-form-item>
				<u-form-item label="民族" prop="nation" required>
					<u-input v-model="user.nation" placeholder="请填写民族" />
				</u-form-item>
				<u-form-item label="学院及专业" prop="coma" required>
					<u-input type="select" :select-open="selectShow" v-model="coma" placeholder="请选择学院及专业"
						@click="selectShow = true" />
				</u-form-item>
				<u-form-item label="电话号码" prop="phone" required>
					<u-input v-model="user.phone" placeholder="请填写电话号码" />
				</u-form-item>
				<u-form-item label="省市区" prop="region" required>
					<u-input type="select" :select-open="pickerShow" v-model="region" placeholder="请选择省市区"
						@click="pickerShow = true" />
				</u-form-item>
				<u-form-item label="详细地址" prop="address" required>
					<u-input v-model="user.address" placeholder="请填写详细地址" />
				</u-form-item>
				<u-form-item label="紧急联系人" prop="emer1" required>
					<view class="emer">
						<view class="emer1-upper">
							<view class="emer1-upper-rela">
								<u-input v-model="emer1_rela" placeholder="关系" />
							</view>
							<view class="emer1-upper-name">
								<u-input v-model="emer1_name" placeholder="姓名" />
							</view>
						</view>
						<view class="emer1-lower">
							<u-input v-model="emer1_num" placeholder="号码" />
						</view>
					</view>
				</u-form-item>
				<u-form-item label="紧急联系人" prop="emer2" required>
					<view class="emer">
						<view class="emer1-upper">
							<view class="emer1-upper-rela">
								<u-input v-model="emer2_rela" placeholder="关系" />
							</view>
							<view class="emer1-upper-name">
								<u-input v-model="emer2_name" placeholder="姓名" />
							</view>
						</view>
						<view class="emer1-lower">
							<u-input v-model="emer2_num" placeholder="号码" />
						</view>
					</view>
		
				</u-form-item>
			</u-form>
			<!--选择省市区-->
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm" v-if="!user.province"></u-picker>
			<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm" v-if="user.province"
				:default-region="[user.province, user.city, user.district]"></u-picker>
		
			<!--选择专业及大类-->
			<u-select v-model="selectShow" mode="mutil-column-auto" :list="comalist" @confirm="comaConfirm"
				v-if="!user.collegeId"></u-select>
			<u-select v-model="selectShow" mode="mutil-column-auto" :list="comalist" @confirm="comaConfirm"
				v-if="user.collegeId" ></u-select>
			<u-button type="error" @click="submit()">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:0,
				gender: '',
				coma: '',
				// collegename: '',
				// majorname :'',
				selectShow: false,
				pickerShow: false,
				region: '',
				emer1_rela: '',
				emer1_name: '',
				emer1_num: '',
				emer2_rela: '',
				emer2_name: '',
				emer2_num: '',

				radioList: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				rules: {
					name: [{
						required: true,
						message: '请输入账号!',
						trigger: 'blur'
					}, ],
					certificatesNo: [{
						required: true,
						message: '请输入姓名!',
						trigger: 'blur'
					}, ],
					nation: [{
						required: true,
						message: '请输入密码!',
						trigger: 'blur'
					}, ],
					// coma: [{
					// 	required: true,
					// 	message: '请输入确认密码!',
					// 	trigger: 'blur'
					// }, ],
					phone: [{
						required: true,
						message: '请输入年龄!',
						trigger: 'blur'
					}, ],
					// region: [{
					// 	required: true,
					// 	message: '请输入账号!',
					// 	trigger: 'blur'
					// }, ],
					address: [{
						required: true,
						message: '请输入账号!',
						trigger: 'blur'
					}, ],
					// emer1: [{
					// 	required: true,
					// 	message: '请输入账号!',
					// 	trigger: 'blur'
					// }, ],
					// emer2: [{
					// 	required: true,
					// 	message: '请输入账号!',
					// 	trigger: 'blur'
					// }, ],
				},
				user: {
					name: '',
					sex: null,
					certificatesNo: '',
					nation: '',
					
					collegeId: null,
					majorId: null,
					phone: '',
					
					province: '',
					city: '',
					district: '',
					address: '',
					contactRelationship: '',
					contactName: '',
					contactPhone: ''
					// emer1_rela: "",
					// emer1_name: "",
					// emer1_num: null
				},
				 comalist: []
			}
		},
		onReady() {
			this.$refs.validateFormRef.setRules(this.rules);
		},
		methods: {
			radioChange(e) {
				if (e == "男") {
					this.user.sex = 0
				} else {
					this.user.sex = 1
				}
			},
			// 选择地区回调
			regionConfirm(e) {
				console.log(e);
				this.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
				this.user.province = e.province.label;
				this.user.city = e.city.label;
				this.user.district = e.area.label;
			},
			comaConfirm(e) {
				console.log(e);
				this.user.coma = e[0].label + '-' + e[1].label;
				console.log("select_coma:",this.coma)
				this.user.collegeId = e[0].value;
				this.user.majorId = e[1].value;
			},

			submit: function() {
				//1.验证表单是否都通过了验证
				this.$refs.validateFormRef.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.user.contactRelationship = this.emer1_rela + '-' + this.emer2_rela;
						this.user.contactName = this.emer1_name + '-' + this.emer2_name;
						this.user.contactPhone = this.emer1_num + '-' + this.emer2_num;
						console.log("user:", this.user);
						//2.向后端发起请求，实现注册，如果注册成功，跳转到登录页面
						uni.request({
							url: '/api/student', //仅为示例，并非真实接口地址。
							data: this.user,
							method: 'PUT',
							timeout: 5000,
							success: (res) => {
								//3.注册成功跳转到登录页面
								console.log("res:",res)
								if (res.data.code == 200) {
									uni.navigateTo({ //返回上一页面
										url: '/pages/info/info'
									})
									this.$u.toast('请下拉页面刷新')
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

			},
			// submit:function(){
			// 	console.log(this.user);
			// },
			onLoad() { //在页面加载的时候就会执行这个函数
				//发送请求去查询电影列表数据
				//uni.request({}) 这个属于是uniapp中的请求方式
				//使用uview中的请求方式请求数据
				this.$u.get('/api/college/CollegesWithMajors').then(res => { //请求成功执行的函数
					console.log("res:",res);
					if (res.code == 200) {
						this.comalist=res.data
					}
					// console.log("comalist:",this.comalist)
				}).catch(err => { //请求失败执行的函数
					console.log(err)
				})
				
				this.$u.get('/api/student').then(res => { //请求成功执行的函数
					console.log("res:",res);
					if (res.code == 200) {
						// this.collegename=res.data.collegeName
						// this.majorname=res.data.majorName
						this.isShow=1
						if(res.data.collegeName.length!=0){
							this.coma=res.data.collegeName + '-' + res.data.majorName
						}
						if(res.data.province.length!=0){
							this.region=res.data.province + '-' + res.data.city + '-' + res.data.district
							console.log("size:",res.data.province.length)
						}
						this.user=res.data
						if(res.data.sex == 0){
							this.gender='男'
						}
						else{
							this.gender='女'
						}
						this.emer1_rela=res.data.contactRelationship.split('-')[0]
						this.emer2_rela=res.data.contactRelationship.split('-')[1]
						this.emer1_name=res.data.contactName.split('-')[0]
						this.emer2_name=res.data.contactName.split('-')[1]
						this.emer1_num=res.data.contactPhone.split('-')[0]
						this.emer2_num=res.data.contactPhone.split('-')[1]
						// console("num1:",this.emer1_num)
						
						// console.log("coma:",this.coma)
					}
					else if(res.code==214){
						this.isShow=0
					}
					// console.log("comalist:",this.comalist)
				}).catch(err => { //请求失败执行的函数
					console.log(err)
				})
			},
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

	.emer {
		display: flex;
		flex-direction: row;
		flex: 4;

		.emer1-upper {
			display: flex;
			flex-direction: row;
			flex: 2;

			.emer1-upper-rela {
				flex: 1;
			}

			.emer1-upper-name {
				flex: 1;
			}
		}

		.emer1-lower {
			flex: 2;
		}
	}
</style>