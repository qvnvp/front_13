<template>
	<view class="re-bottom bg-white shadow-sm">
		<view class="bottom-right "><!-- bg-blue -->
			<text class="bottom-text text-white text-bold">{{"提交"}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'BottomBar',
		props: {
			
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.re-bottom {
		width: 100%;
		height: 100rpx;
		border-radius: 20rpx 20rpx 0 0;
	}
	
	.bottom-right {
/* 		border:1rpx solid red; */
		margin-left: 150rpx;
		width: 60%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #ffaa00;
	}
	.bottom-text{
		/* border:1rpx solid red; */
/* 		align-items: center; */
		margin-left: 200rpx;
	}
	
	.bottom-right:active {
		opacity: 0.9;
	}
</style>
