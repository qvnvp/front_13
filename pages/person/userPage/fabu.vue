<template>
	<view class="release">
		<view class="wrap-card">
			<view class="text-gray-500 my-20">
				想说点啥
			</view>
			<view class="text-gray-500 my-20">
				<template>
				<u-input v-model="article.title" type="text" :border="border" :auto-height="autoheight"
				height="50" placeholder="标题"/>
				</template>
			</view>
			<template>
				<u-input v-model="article.content" type="textarea" :border="border" :auto-height="autoheight"
				height="300" placeholder="随便说点儿什么吧..."/>
			</template>
			<view class="text-gray-500 my-20">
				<template>
				<u-input v-model="article.labels" type="text" :border="border" :auto-height="autoheight"
				height="50" placeholder="标签"/>
				</template>
			</view>
			
			<!-- 上传多图 -->
			<view class="text-gray-500 my-20">
				分享图片
			</view>
			<u-upload ref="upload" :fileList="imgList" @afterRead="autoUpload" @delete="deletePic" name="1" multiple
				:maxCount="9" previewFullImage>
			</u-upload>
		</view>
		<view class="bottom-handle">
			<view class="iconfont iconcaidan text-50 mx-10 animate__animated" hover-class="animate__jello"></view>
			<view class="iconfont iconhuati text-50 mx-10 animate__animated" hover-class="animate__jello"></view>
			<view class="ml-auto mr-20">
				<u-button class="button" color="linear-gradient(to right, #dcc20b, #01906c)"
				:customStyle="btnStyle" @click="submit()">发布</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				border:true,
				autoheight:true,
				// 草稿箱提示
				draftShow: true,
				article:{
					"content": '',
					"images": '',
					"labels": '',
					"title": ''
				},
				// 图片列表
				imgList: [{
						url: '/static/img/demo/autumn.svg',
					},
					{
						url: '/static/img/demo/winter.svg',
					}
				],
				// 按钮配置
				btnStyle: {
					width: "450rpx",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx"
				},
			}
		},
		methods:{
			// 自动上传
			async autoUpload(event) {
				console.log("自动上传")
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let chooseList = [].concat(event.file) // 当前选中列表
				let fileListLen = this.imgList.length // 原始文件列表
				// 将选中的文件添加到文件列表
				chooseList.map((item) => {
					this.imgList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				// 遍历选中的文件依次上传
				for (let i = 0; i < chooseList.length; i++) {
					// 上传成功后返回数据
					const url = await this.uploadFilePromise(chooseList[i].url)
					// 获取当前文件信息：原始文件列表长度，就是当前新增开始的索引
					let item = this.imgList[fileListLen]
					// 改变最后一个文件信息：状态、url
					this.imgList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url
					}))
					console.log("imgList:",this.imgList)
					// 文件索引后移一位
					fileListLen++
				}
			},
			// 上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					console.log("上传图片")
					let a = uni.uploadFile({
						url: '/api/file/picture',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.url)
							}, 1000)
						}
					})
				})
			},
			
			// 删除图片
			deletePic(event) {
				this.imgList.splice(event.index, 1)
			},
			submit() {
				this.draftShow = false
				//this.article.images=this.imgList
				this.article.images=JSON.stringify(this.imgList)
				console.log("images:",this.article.images)
				//解析后端返回的数据JSON.parse(this.article.images)
				uni.request({
					url:'/api/article',
					method:'POST',
					data:this.article,
					timeout:5000,
					success: (res) => {
						console.log("res:",res)
					},
					fail: (err) => {
						console.log("err:",err)
					}
				})
				
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.release {
		.notice-img {
			height: 300rpx;
			width: 300rpx;
		}

		.bottom-handle {
			border-top: 1px solid $uni-border-color1;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 85rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
		}
	}
</style>