<!-- 用户点击进入后的文章页面 -->
<template>
	<view>
		<!-- 文章展示页 -->
		<view style="padding: 10px;">
			<view class="author" style="display: flex; flex-direction: row; align-items: center;">
				<image :src="data.authorAvatar" style="height: 45px; width: 45px; border-radius: 5px;"></image>
				<view style="margin-left: 10px; font-size: 15px; font-weight: 500;">{{data.authorName}}</view>
			</view>
			<view class="title" style="margin: 5px 0px; font-size: 18px;">
				{{data.title}}
			</view>
			<view class="content" style="font: 15px 'Microsoft YaHei'; color: #4B5563; margin: 10px 0px;">
				{{data.content}}
			</view>
			<view class="imgages" style="position: relative;">
				<img style="width: 100%; height: auto;" :src="data.images"></img>
			</view>
		</view>

		<!-- 评论区 -->
		<view class="comment">
			<view style="padding: 10px;">
				<view class="comment_title" style="font-size: 15px; font-weight: bold;">最新评论
					<text style="margin-left: 10px;">{{data.comment}}</text>
				</view>
			</view>
		</view>

		<view style="height: 10px;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {}
			}
		},
		methods: {

		},
		onLoad(option) {
			this.data = JSON.parse(decodeURIComponent(option.data))
			console.log(this.data)
		}
	}
</script>

<style>

</style>