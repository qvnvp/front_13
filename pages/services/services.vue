<template>
	<view class="YmContent">
			<view class="services_7">
				<view class="services_8">
					<view class="services_9">
					</view>
					<text decode="true" class="services_10">推荐服务</text>
				</view>
				<view class="services_11">
					<view class="services_26">
						<view class="services_28">
							<image v-on:click="services_29_29_click()"  src="/static/services/images/services_29_29.jpg" mode="scaleToFill" border="0"    class="services_29"></image>
							<text decode="true" class="services_30">身份认证</text>
						</view>
						<view class="services_31">
							<image v-on:click="services_32_32_click()"  src="/static/services/images//bus.png" mode="scaleToFill" border="0"    class="services_32"></image>
							<text decode="true" class="services_33">校车时刻</text>
						</view>
						<view class="services_34">
							<image v-on:click="services_35_35_click()"  src="/static/services/images/services_35_35.jpg" mode="scaleToFill" border="0"    class="services_35"></image>
							<text decode="true" class="services_36">在线缴费</text>
						</view>
						<view class="services_37">
							<image v-on:click="services_38_38_click()"  src="/static/services/images/services_38_38.jpg" mode="scaleToFill" border="0"    class="services_38"></image>
							<text decode="true" class="services_39">图书检索</text>
						</view>
					</view>
					<view class="services_27">
						<view class="services_40">
							<image v-on:click="services_41_41_click()"  src="/static/services/images/services_41_41.jpg" mode="scaleToFill" border="0"    class="services_41"></image>
							<text decode="true" class="services_42">问卷调查</text>
						</view>
						<view class="services_43">
							<image v-on:click="services_44_44_click()"  src="/static/services/images/active.png" mode="scaleToFill" border="0"    class="services_44"></image>
							<text decode="true" class="services_45">社团活动</text>
						</view>
					</view>
				</view>
				<view class="services_14">
					<view class="services_15">
					</view>
					<text decode="true" class="services_16">公共服务</text>
				</view>
				<view class="services_17">
					<view class="services_47">
						<image v-on:click="services_48_48_click()"  src="/static/services/images/xiaoli.png" mode="scaleToFill" border="0"    class="services_48"></image>
						<text decode="true" class="services_49">校历</text>
					</view>
					<view class="services_50">
						<image v-on:click="services_51_51_click()"  src="/static/services/images/services_51_51.jpg" mode="scaleToFill" border="0"    class="services_51"></image>
						<text decode="true" class="services_52">评教系统</text>
					</view>
					<view class="services_53">
						<image v-on:click="services_54_54_click()"  src="/static/services/images/services_54_54.jpg" mode="scaleToFill" border="0"    class="services_54"></image>
						<text decode="true" class="services_55">开学小贴士</text>
					</view>
				</view>
				<view class="services_20">
					<view class="services_21">
					</view>
					<text decode="true" class="services_22">智慧后勤</text>
				</view>
				<view class="services_23">
					<view class="services_64">
						<image v-on:click="services_58_58_click()"  src="/static/services/images/sushe.png" mode="scaleToFill" border="0"    class="services_58"></image>
						<text decode="true" class="services_61">宿舍管理</text>
					</view>
					<view class="services_65">
						<image v-on:click="services_59_59_click()"  src="/static/services/images/weixiu.png" mode="scaleToFill" border="0"    class="services_59"></image>
						<text decode="true" class="services_62">后勤报修</text>
					</view>
				</view>
			</view>
		
		<view class="loading">{{loadingText}}</view>
	<view class="ymBbottom"></view>
	</view>
</template>

<script>
import services from "./services.js";
export default services;
</script>

<style lang="scss" scoped>
   @import './services.scss'   
</style>