<template>
    <view  >
        <u-form ref="validateFormRef" :model="user" :label-width="150" 
		validate-trrigger="bind" style="margin-left: 30rpx;">
            <!-- <u-form-item label="账号" prop="accounts" required >
                <u-input v-model="user.accounts" placeholder="请输入登录账号"/>
            </u-form-item> -->
			
			<u-form-item label="昵称" prop="nickname" >
			    <u-input v-model="user.nickname" placeholder="请输入昵称"/>
			</u-form-item>
			<u-form-item label="学院" prop="college" >
			    <u-input v-model="user.college" placeholder="请输入登录姓名"/>
			</u-form-item>
			
            <u-form-item label="用户类型">
            	<u-radio-group v-model="leixing">
            		<u-radio v-for="(item, index) in radioList" @change = "radioChange":key="index" :name="item.name" :disabled="item.disabled">
            			{{ item.name }}
            		</u-radio>
            	</u-radio-group>
            </u-form-item>
			<u-form-item label="兴趣爱好">
				<u-checkbox-group>
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
						name: '乐器类',
						checked: false,
						disabled: false
					},
					{
						name: '歌舞类',
						checked: false,
						disabled: false
					},
					{
						name: '摄影类',
						checked: false,
						disabled: false
					},
					{
						name: '相声小品类',
						checked: false,
						disabled: false
					},
					{
						name: '室外活动类',
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
					accounts:'',
					age:'',
					password:'',
					confirmPassword:'',
					habbit:'',
					type:0,
				},
				
            };
        },
		onReady() {
				this.$refs.validateFormRef.setRules(this.rules);
		},
        methods: {
			selectSex() {
				const arr = ['男', '女', '保密']
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						this.sex = arr[res.tapIndex]
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			//更新个人信息的方法
			submit:function(){
				this.$refs.validateFormRef.validate(valid=>{
					if(valid){
						uni.request({
						url:'/api/user/update',
						method:'POST',
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
									uni.navigateTo({
										url:'/pages/person/person'
									});
								},2000); //延迟2秒后跳转
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
