<template>
	<view class="container">
		<view class="navigate-title">
			<view></view> <!-- 哨兵 -->
			<view :class="active ? 'select_title':'no_select_title'" @click="click_title">校园头条</view>
			<view :class="!active ? 'select_title':'no_select_title'" @click="click_community">学生社区</view>
			<view></view> <!-- 哨兵 -->
			<image src="../../static/img/add1.png" style="height: 40px; width: 40px; position: fixed; top: 80vh; right: 4vh; z-index: 999;"></image>
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
				<view v-for="(item, index) in data" :key="index" style="padding: 10px 15px;">
					<view class="author" style="display: flex; flex-direction: row; align-items: center;">
						<image @click="gotoauthor(item.authorId)" :src="item.authorAvatar"
							style="height: 40px; width: 40px; border: 1px solid red; border-radius: 5px;"></image>
						<view @click="gotoauthor(item.authorId)" style="margin-left: 10px;">{{item.authorName}}</view>
					</view>
					<view class="article_content" @click="gotopage(index)">
						<view>{{item.title}}</view>
						<view style="display: flex;  justify-content: center;">
							<image src="../../static/pic2.jpeg" style="width: 100%; height: 200px; border-radius: 5px;">
							</image>
						</view>
					</view>
					<view style="display: flex; flex-direction: row; margin-top: 5px; justify-content: flex-end;">
						<image :src="item.isLiked  ? '../../static/img/like.png':'../../static/img/islike.png'"
							@click="like(item.id)" style="width: 20px; height: 20px;">{{item.likes}}</image>
						<image
							:src="item.isCollected ? '../../static/img/collection.png':'../../static/img/iscollection.png'"
							@click="collect(item.id)" style="width: 20px; height: 20px;">
							{{item.collection}}
						</image>
						<image src="../../static/img/comment.png" style="width: 20px; height: 20px;">{{item.comment}}
						</image>
					</view>
				</view>
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
				tabbar: articleData,
				data: {},
			}
		},

		methods: {
			collect(id) {
				uni.request({
					url: `/api/behavior/collection/${id}`,
					data: '',
					method: 'PUT',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						this.refresh();
						console.log("success:点击了喜欢", res)
						console.log("打印code:", res.data.code)
						if (res.data.code == 200) {
							uni.request({
								url: `/api/behavior/${id}`,
								data: '',
								method: 'GET',
								timeout: 5000,
								success: (res) => { //获取当前用户对指定文章的行为
									console.log("进入了新的函数")
									console.log("显示收藏状态:", res.data.data.isLiked)

								},
								fail: (err) => {
									// console.log("fail", err)
								}
							})
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			refresh() {
				uni.request({
					url: '/api/article/hot',
					method: 'GET',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						console.log(res)
						this.data = res.data.data
					},
					fail: (err) => {
						console.log(err)
					}
				});

			},
			like(id) {
				uni.request({
					url: `/api/behavior/like/${id}`,
					data: '',
					method: 'PUT',
					timeout: 5000,
					success: (res) => { //请求改成后执行回调函数
						this.refresh();
						console.log("success:点击了收藏", res)
						console.log("打印code:", res.data.code)
						if (res.data.code == 200) {
							// let islike = false;
							uni.request({
								url: `/api/behavior/${id}`,
								data: '',
								method: 'GET',
								timeout: 5000,
								success: (res) => { //获取当前用户对指定文章的行为
									console.log("进入了新的函数")
								},
								fail: (err) => {
									// console.log("fail", err)
								}
							})
						}
					},
					fail: (err) => {
						console.log("fail", err)
					}
				})
			},
			click_title() {
				this.active = 1
			},
			click_community() {
				this.active = 0
			},
			gotoauthor(id) {
				uni.navigateTo({
					url: `/pages/article/author?id=${id}`
				})
			},
			gotopage(index) {
				uni.navigateTo({
					url: "/pages/article/article?data=" + encodeURIComponent(JSON.stringify(this.data[index]))
				})
			}
		},
		onLoad() {
			this.refresh();
		},
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