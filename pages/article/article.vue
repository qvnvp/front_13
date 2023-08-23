<!-- 用户点击进入后的文章页面 -->
<template>
	<view>
		
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
