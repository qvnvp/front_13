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
				最美的不是下雨天, 是曾与你躲过雨的屋檐!
			</view>
			<view class="content" style="font: 15px 'Microsoft YaHei'; color: #4B5563; margin: 10px 0px;">
				画框里的你应该什么模样,油画颜料散落在阁楼桌上,与你有关的一切我都画不完,放下笔安静的想起一个地方,午后庄园葡萄藤散发果香,地窖的橡木桶酝酿起过往,回忆年少有一种停格的美感,想起了你还有几年前的远方,这石砌的老墙颜色斑驳着米黄,当初的感觉已在石板路上走散,推开了百叶窗,你剪影的背景有夕阳,温暖柔美的光
			</view>
			<view class="imgages" style="position: relative;">
				<img style="width: 100%; height: auto;" src="../../static/pic1.jpeg"></img>
				<img style="width: 100%; height: auto;" src="../../static/pic2.jpeg"></img>
				<img style="width: 100%; height: auto;" src="../../static/pic3.jpeg"></img>
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