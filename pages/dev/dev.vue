<template>
	<view class="container">
		<view class="navigate-title">
			<view></view> <!-- 哨兵 -->
			<view :class="active ? 'select_title':'no_select_title'" @click="click_title">校园头条</view>
			<view :class="!active ? 'select_title':'no_select_title'" @click="click_community">学生社区</view>
			<view></view> <!-- 哨兵 -->
		</view>
		<view class="father">
			<view :class="active ? 'view_center':'view_left'">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/article/pic1.jpeg" class="banner-img"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/article/pic2.jpeg" class="banner-img"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../static/article/pic3.jpeg" class="banner-img"></image>
						</view>
					</swiper-item>
				</swiper> 
				<view v-for="(item, index) in tabbar" :key="index" class="item">
					<view class="title">{{item.title}}</view>
					<view class="content">
						<image class="photo" :src="item.content.pic"></image>
						<view class="foot_father">
							<view class="foot_son">{{item.content.foot_son1}}</view>
							<view class="foot_son">{{item.content.foot_son2}}</view>
						</view>
					</view>
				</view>
			</view>
			<view :class="!active ? 'view_center':'view_right'">
				学生社区
			</view>			
		</view>
	</view>
</template>

<script>
	import articleData from '@/common/article.data.js';
	
	export default {
		data() {
			return {
				active: 1,
				tabbar: articleData
			}
		},

		methods: {
			click_title() {

				this.active = 1
			},
			click_community() {
				this.active = 0
			}

		}
	}
</script>

<style lang="scss">
	.navigate-title {
		background-color: #fff;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e3e3e3;
	}

	.no_select_title {
		color: #6b6b6b;
		font-size: 14px;
	}

	.select_title {
		color: #000;
		font-size: 17px;
		font-weight: bold;
	}
	
	.view_center {
		width: 100%;	
		transition: transform 0.5s ease;
		transform: translateX(0%);
		margin-top: 5px;
	}
	
	.view_right {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: transform 0.5s ease;
		transform: translateX(100%);
	}
	
	.view_left {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: transform 0.5s ease;
		transform: translateX(-100%);
	}
	
	.father {
		position: relative;
	}
	
	.item {
		height: 180px;
		padding: 0px 15px;
	
		.title {
			font-weight: bold;
			margin-top: 8px;
			margin-bottom: 6px;
			font-size: 15px;
		}
	
		.content {
			.photo {
				width: 100%;
				height: 120px;
				border-radius: 5px;
			}
	
			.foot_father {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
	
				.foot_son {
					font-size: 10px;
					font-weight: 400;
					color: #6c6c6c;
				}
			}
		}
	}

	.swiper-item,
	.banner-img {
		width: 100%;
		height: 100%;
	}
</style>