<template>
    <view  >
        <u-form ref="validateFormRef" :model="user" :label-width="150" 
		validate-trrigger="bind" style="margin-left: 30rpx;">
            <!-- <u-form-item label="账号" prop="accounts" required >
                <u-input v-model="user.accounts" placeholder="请输入登录账号"/>
            </u-form-item> -->
			
			<u-form-item label="昵称" prop="nickname" >
			    <u-input v-model="user.name" placeholder="请输入昵称"/>
			</u-form-item>
			<u-form-item label="学院" prop="college" >
			    <u-input v-model="user.college" placeholder="请输入所在学院"/>
			</u-form-item>
			
            <u-form-item label="用户类型">
            	<u-radio-group v-model="leixing">
            		<u-radio v-for="(item, index) in radioList" @change = "radioChange":key="index" :name="item.name" :disabled="item.disabled">
            			{{ item.name }}
            		</u-radio>
            	</u-radio-group>
            </u-form-item>
			<u-form-item label="兴趣爱好">
				<u-checkbox-group  @change="checkboxChange">
					<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
        </u-form>
		<u-cell-group >
			<u-cell-item title="性别" :value="sex" @click='selectSex'></u-cell-item>
		</u-cell-group>
        <u-button type="error" @click="submit()" >提交</u-button>
    </view>
</template>

<script>

    export default {
        data() {
            return {
				sex:'',
				radioList: [
					{
						name: '管理员',
						disabled: false
					},
					{
						name: '普通用户',
						disabled: false
					}
				],
				checkboxList: [
					{
						name: '音乐',
						checked: false,
						disabled: false
					},
					{
						name: '阅读',
						checked: false,
						disabled: false
					},
					{
						name: '摄影',
						checked: false,
						disabled: false
					},
					{
						name: '旅游',
						checked: false,
						disabled: false
					},
					{
						name: '运动',
						checked: false,
						disabled: false
					},
					{
						name: '其他',
						checked: false,
						disabled: false
					}
				],
				leixing:'普通用户',
                isAgreement: false,
				user:{
					name: null,
					sex:'',
					age:'',
					password:'',
					confirmPassword:'',
					type:0,
					hobbies:null
				},
				
            };
        },
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
        methods: {
			selectSex() {
				const arr = [ '女','男', '保密']
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						console.log(res)
						this.sex=arr[res.tapIndex]
						this.user.sex = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			//更新个人信息的方法
			submit:function(){
				this.user.hobbies = this.user.hobbies==null ? null : this.user.hobbies.join(',')
				this.$refs.validateFormRef.validate(valid=>{
					if(valid){
						console.log("用户爱好：",this.user.hobbies)
						uni.request({
						url:'/api/user',
						method:'PUT',
						data:this.user,
						timeout:5000,
						success:function(res){
							//更新成功跳转到个人信息页面
							console.log("res:",res)
							if(res.data.code==200){
								uni.showToast({
									title: '修改成功',
									icon: 'none',
									duration: 2000
								}) 
								setTimeout(()=>{
									uni.reLaunch({
										url:'/pages/person/person'
									});
								},1000); //延迟2秒后跳转
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
							console.log("修改失败")
						}
				})
					}
				})
				
			},checkboxChange: function (e) {
				console.log(e)
				this.user.hobbies=e
				// var items = this.checkboxList,
				// 	values = e.detail.value;
				// for (var i = 0, lenI = items.length; i < lenI; ++i) {
				// 	const item = items[i]
				// 	if(values.includes(item.value)){
				// 		this.$set(item,'checked',true)
				// 		this.user.hobbies.push(item)
				// 		console.log("hobbies:",this.user.hobbies)
				// 	}else{
				// 		this.$set(item,'checked',false)
				// 	}
				// }
			},
			radioChange(e){
				if(e=="管理员"){
					this.user.type=1
				}else{
					this.user.type=0
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
    
</style>
