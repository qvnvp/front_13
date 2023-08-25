<template>
	<view class="wrap" style="padding: 15px;">
		<u-form ref="validateFormRef" :model="user" :label-width="150">
			<view class="empty_content" v-if="!isShow" style="margin-top: 300rpx;
					fontSize:35rpx;text-align: center; color:#6d6d6d">
						您还未登录
					</view>
			<view class="form" v-if='isShow'>
				<u-form-item label="姓名" prop="name" required>
					<u-input v-model="user.name" placeholder="请填写姓名" />
				</u-form-item>
				<u-form-item label="性别" prop="gender" required>
					<u-radio-group v-model="user.gender">
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
					<u-input type="select" :select-open="selectShow" v-model="user.coma" placeholder="请选择学院及专业"
						@click="selectShow = true" />
				</u-form-item>
				<u-form-item label="电话号码" prop="phone" required>
					<u-input v-model="user.phone" placeholder="请填写电话号码" />
				</u-form-item>
				<u-form-item label="省市区" prop="region" required>
					<u-input type="select" :select-open="pickerShow" v-model="user.region" placeholder="请选择省市区"
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
				<u-button :disabled="isUnchanged" type="error" @click="submit()">提交</u-button>
				<u-toast ref="uToast" />
			</view>
		</u-form>
		<!--选择省市区-->
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm" v-if="!student.province"></u-picker>
		<u-picker mode="region" v-model="pickerShow" @confirm="regionConfirm" v-if="student.province"
			:default-region="[student.province, student.city, student.district]"></u-picker>

		<!--选择专业及大类-->
		<u-select v-model="selectShow" mode="mutil-column-auto" :list="comalist" @confirm="comaConfirm"
			v-if="!user.collegeId"></u-select>
		<u-select v-model="selectShow" mode="mutil-column-auto" :list="comalist" @confirm="comaConfirm"
			v-if="user.collegeId"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: 0,
				// gender: '',
				selectShow: false,
				pickerShow: false,
				// region: '',
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
						message: '请填入姓名',
						trigger: 'blur'
					}, ],
					gender: [{
						required: true,
						message: '请选择性别!',
						trigger: 'blur'
					}, ],
					certificatesNo: [{
						required: true,
						message: '请输入身份证号!',
						trigger: 'blur'
					}, ],
					nation: [{
						required: true,
						message: '请填写民族!',
						trigger: 'blur'
					}, ],
					coma: [{
						required: true,
						message: '请选择学院及专业!',
						trigger: 'blur'
					}, ],
					phone: [{
						required: true,
						message: '请输入电话号码!',
						trigger: 'blur'
					}, ],
					region: [{
						required: true,
						message: '请选择省市区!',
						trigger: 'blur'
					}, ],
					address: [{
						required: true,
						message: '请填写详细地址!',
						trigger: 'blur'
					}, ],
					emer1: [{
						required: true,
						message: '请输入紧急联系人1!',
						trigger: 'blur'
					}, ],
					emer2: [{
						required: true,
						message: '请输入紧急联系人2!',
						trigger: 'blur'
					}, ],
				},
				student: {
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
				},
				user: {
					name: '',
					gender: '',
					certificatesNo: '',
					nation: '',
					coma: '',
					phone: '',
					region: '',
					address: '',
					emer1: '',
					emer2: ''
				},
				
				defaultname: '',
				defaultgender: '',
				defaultcertificatesNo: '',
				defaultnation: '',
				defaultcoma: '',
				defaultphone: '',
		    	defaultregion: '',
		    	defaultaddress: '',
				defaultemer1: '',
				defaultemer2: '',
				
				comalist: []
			}
		},
		onReady(){
			this.$refs.validateFormRef.setRules(this.rules);
		},
		computed: {
			isUnchanged(){
				return(
				    this.user.name === this.defaultname &&
				    this.user.gender === this.defaultgender &&
				    this.user.certificatesNo === this.defaultcertificatesNo &&
				    this.user.nation === this.defaultnation &&
				    this.user.coma === this.defaultcoma &&
				    this.user.phone === this.defaultphone &&
				    this.user.region === this.defaultregion &&
				    this.user.address === this.defaultaddress &&
				    this.emer1_rela+'-'+this.emer1_name+'-'+this.emer1_num === this.defaultemer1 &&
				    this.emer2_rela+'-'+this.emer2_name+'-'+this.emer2_num === this.defaultemer2 
				);
			}
		},
		methods: {
			showToast() {
				this.$refs.uToast.show({
					title: '修改成功',
					type: 'default',
					url: '/pages/index/index',
					isTab: true,
				})
			},
			radioChange(e) {
				if (e == "男") {
					this.student.sex = 0
				} else {
					this.student.sex = 1
				}
			},
			// 选择地区回调
			regionConfirm(e) {
				console.log(e);
				this.user.region = e.province.label + '-' + e.city.label + '-' + e.area.label;
				this.student.province = e.province.label;
				this.student.city = e.city.label;
				this.student.district = e.area.label;
			},
			comaConfirm(e) {
				// console.log(e);
				this.user.coma = e[0].label + '-' + e[1].label;
				// console.log("select_coma:", this.coma)
				this.student.collegeId = e[0].value;
				this.student.majorId = e[1].value;
			},

			submit: function() {
				this.user.emer1=this.emer1_rela+'-'+this.emer1_name+'-'+this.emer1_num;
				this.user.emer2=this.emer2_rela+'-'+this.emer2_name+'-'+this.emer2_num;
				//1.验证表单是否都通过了验证
				this.$refs.validateFormRef.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.student.contactRelationship = this.emer1_rela + '-' + this.emer2_rela;
						this.student.contactName = this.emer1_name + '-' + this.emer2_name;
						this.student.contactPhone = this.emer1_num + '-' + this.emer2_num;
						this.student.name = this.user.name;
						this.student.certificatesNo = this.user.certificatesNo;
						this.student.nation = this.user.nation;
						this.student.phone = this.user.phone;
						this.student.address = this.user.address;
						console.log("post:", this.student);
						//2.向后端发起请求，实现注册，如果注册成功，跳转到登录页面
						uni.request({
							url: '/api/student', //仅为示例，并非真实接口地址。
							data: this.student,
							method: 'PUT',
							timeout: 5000,
							success: (res) => {
								//3.注册成功跳转到登录页面
								console.log("res:", res)
								if (res.data.code == 200) {
									this.showToast()
								}

							},
							fail: (err) => {
								console.log(err)
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			onLoad() { //在页面加载的时候就会执行这个函数
				this.$u.get('/api/college/CollegesWithMajors').then(res => { //请求成功执行的函数
					console.log("res:", res);
					if (res.code == 200) {
						this.comalist = res.data
					}
					// console.log("comalist:",this.comalist)
				}).catch(err => { //请求失败执行的函数
					console.log(err)
				})

				this.$u.get('/api/student').then(res => { //请求成功执行的函数
					console.log("res:", res);
					if (res.code == 200) {
						// this.collegename=res.data.collegeName
						// this.majorname=res.data.majorName
						this.isShow = 1
						if (res.data.collegeName.length != 0) {
							this.user.coma = res.data.collegeName + '-' + res.data.majorName
							this.defaultcoma = res.data.collegeName + '-' + res.data.majorName
						}
						if (res.data.province.length != 0) {
							this.user.region = res.data.province + '-' + res.data.city + '-' + res.data.district
							this.defaultregion = res.data.province + '-' + res.data.city + '-' + res.data.district
							// console.log("size:", res.data.province.length)
						}
						if (res.data.sex == 0) {
							this.user.gender = '男'
							this.defaultgender = '男'
						} else {
							this.user.gender = '女'
							this.defaultgender = '女'
						}
						this.student.collegeId = res.data.collegeId
						this.student.majorId = res.data.majorId
						this.student.province = res.data.province
						this.student.city = res.data.city
						this.student.district = res.data.district
						this.user.name = res.data.name
						this.user.certificatesNo = res.data.certificatesNo
						this.user.nation = res.data.nation
						this.user.phone = res.data.phone
						this.user.address = res.data.address
						this.defaultname = res.data.name
						this.defaultcertificatesNo = res.data.certificatesNo
						this.defaultnation = res.data.nation
						this.defaultphone = res.data.phone
						this.defaultaddress = res.data.address
						this.emer1_rela = res.data.contactRelationship.split('-')[0]
						this.emer2_rela = res.data.contactRelationship.split('-')[1]
						this.emer1_name = res.data.contactName.split('-')[0]
						this.emer2_name = res.data.contactName.split('-')[1]
						this.emer1_num = res.data.contactPhone.split('-')[0]
						this.emer2_num = res.data.contactPhone.split('-')[1]
						this.user.emer1 = this.emer1_rela+'-'+this.emer1_name+'-'+this.emer1_num;
						this.user.emer2 = this.emer2_rela+'-'+this.emer2_name+'-'+this.emer2_num;
						this.defaultemer1 = this.emer1_rela+'-'+this.emer1_name+'-'+this.emer1_num;
						this.defaultemer2 = this.emer2_rela+'-'+this.emer2_name+'-'+this.emer2_num;
						
						// console("num1:",this.emer1_num)
						// this.setFormRules()
						console.log("get:", res.data)
					} else if (res.code == 214) {
						this.isShow = 0
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