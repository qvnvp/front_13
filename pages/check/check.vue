<template>
	<view class="u-wrap">
		<view class="u-menu-wrap">
			<!-- 左边滚动条 -->
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view class="u-tab-item" :class="[current === index ? 'u-tab-item-active' : '']"
					@tap.stop="swichMenu(index)" v-for="(item, index) in tabbar" :key="index">
					<text class="u-line-1">{{ item.name }}</text>
				</view>
			</scroll-view>
			<!-- 滚动条结束 -->
			<scroll-view scroll-y class="right-box">
				<!-- 页面内容部分 -->
				<view class="page-view" v-if="current === 0">
					<view class="class-item">
						<view class="item-content">
							<text>{{ text1 }}</text>
						</view>
					</view>
				</view>
				<view class="page-view" v-if="current === 1">
					<view class="class-item">
						<view class="item-content">
							<view class="notice">
								请按流程顺序进行报道，如您已完成一项，请点击底部“我已完成”进行确认！
							</view>
							<!-- <u-steps :list="numList" :current="currentstep" mode="number" direction="column"></u-steps> -->
							 <u-steps :list="numList" :current="currentstep" mode="number" direction="column">
							        <template #default="{ step }">
							            <u-icon :type="getStepIconType(step)">{{ step }}</u-icon>
							        </template>
							    </u-steps>
							<text>{{"\n\n1\n\n"}}</text>
						</view>
						<!-- <view class="item-btn">
							<u-button type="primary" @click="submit()"> {{"我已完成"}}</u-button>
						</view> -->
						<view class="item-btn">
						        <u-button type="primary" @click="submit()" class="report-btn">{{ isReported ? '已完成报道' : '我已完成该步骤' }}</u-button>
						    </view>
					</view>
				</view>
				<view class="page-view" v-if="current === 2">
					<view class="class-item">
						<view class="item-content">
							这是学校地图
						</view>
					</view>
				</view>
				<view class="page-view" v-if="current === 3">
					<view class="class-item">
						<view class="item-content">
							<view class="content1" style="background-color: #50abff;color: white; margin-left: 150rpx;margin-right: 215rpx;">
								到校交通
								</view>
							<view class ="content2">
								<text>{{ text2 }}</text>
							</view>
							<view class="content2" style="background-color: #50abff;color: white;margin-left: 150rpx;margin-right: 215rpx;">
								校内交通
							</view>
							<u-image width="100%" border-radius="5" height="750rpx" mode="aspectFill"
								src="https://news.cqu.edu.cn/uploadfile/2022/0204/1643963864980703.jpg"></u-image>
							<u-image width="100%" border-radius="5" height="1000rpx" mode="aspectFit"
								src="https://news.cqu.edu.cn/uploadfile/2022/0204/1643963864980703.jpg"></u-image>
						</view>
					</view>
				</view>
				<!-- 添加其他选项卡的内容 -->
			</scroll-view>
		</view>
	</view>
</template>


<script>
	// import classifyData from "@/common/classify.data.js";
	export default {
		data() {
			return {
				// tabbar: classifyData,
				isReported: false, // 初始化为未报道状态
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				currentstep: -1,
				// user:{
				// 	
				// }
				numList: [{
					name: '学院报到'
				}, {
					name: '住宿办理'
				}, {
					name: '财务办理'
				}, {
					name: '学生资助'
				}, {
					name: '档案馆'
				}, {
					name: '户口办理'
				}, {
					name: '军训服装领取'
				}, ],
				tabbar: [{
						"name": "注意事项",
					},
					{
						"name": "报道流程",
					},
					{
						"name": "学校地图",
					},
					{
						"name": "交通指导",
					}
				],
				text1: "寒窗十二载，今朝圆梦。距离开学还有不到一个月的时间了，你开始准备了吗？\
				     特为大家送来这篇大学新生入学必备物品清单及开学注意事项，愿你不会手忙脚乱，\
					 建议分享给身边的家长和同学！本文内容较详细，收藏阅读哦！\n\n\
					 一、报到必备-证件材料\n\n\
					 大学新生报到，往往因为准备不足而显得捉襟见肘，所以入大学报到前一定要仔细阅读录取通知书中的须知内容，逐一落实。\n\n\
					 1. 两证一书\n\
					 “一书”指通知书，这是大学报到的身份证明。另外，身份证是必需的，可以提前复印几张，因为有些大学报到体检、寝室登记、注册信息等有可能用的到。\
					 高考时的准考证也要带着，说不定有些时候用得着，准备充足总不会有错!\n\n\
					 2. 档案\n\
					 各省(市、区)的政策要求都会有些不同，若需要新生报到时自己携带纸质档案到校的，考生切记一定要保管好且不要自己拆封，到校后尽快交给老师。\n\n\
					 3. 党团转接手续\n\
					 (1)若已是党员，切记在大学报到前，到学校党组织开具党组织关系转出证明。还要记得带上自己的团员证、党员证，以及党、团关系的转接证明。\n\
					 (2)若是团员，应由团籍所在学校团委在团员证上填写转至高校团委并加盖公章。\n\n\
					 4. 户口\n\
					 准大学生，如果需要迁户口到高校所在地的话，则需要到户口所在地派出所办理户口迁移证，并将户口迁移证上交学校办理迁入手续。\
				     办理时要带上自己的录取通知书、身份证以及家里的户口簿。\n\n\
					 5. 家庭情况调查表+经济困难证明\n\
					 家庭情况调查表是针对家庭的经济情况进行调查，要求对家庭情况的填写要真实。家庭经济困难的同学，可以到由乡(镇)、街道办以及民政部门等开具贫困证明并盖公章。详情请戳：关系到大学奖助学金!录取通知书中的这张表非常重要!\
				　　以上这些东西关系到你在大学期间的奖助学金。对于经济困难的同学，学校一般会给予照顾，比如提供助学贷款、勤工俭学等机会。\
				　　这些东西是入学新生最容易忽略的，很多真正家庭困难的学生，因为提前不知道办理这些证明，到学校后收到相关通知，但来不及回家办理而白白错过一些助学金，是很可惜的。\n\n\
				    6. 照片\n\
					一寸和两寸的免冠照片要提前准备一些，因为新生报到时，需要办理很多手续。所以提前准备好，一定用的到。\
				　　虽然学校周边也有照相馆，但是当天肯定要排队，而且价钱也贵。照片最好留存电子版。这样在报到登记、体检、寝室登记、学生证办理，以及参加社团可以做到有备无患。\n\n\
				    7. 文件袋\n\
					大学报到时，会有很多零散的东西，比如体检单，入学手册，缴费单，各种证明，宣传页，小地图等等，所以必须要准备好一个文件袋，既方便有安全。\
				　　建议在文件袋上写上自己的姓名和联系方式，万一丢失也可以让捡到的人快速找到你!\n\n\
				    二、衣食住用\n\n\
					进入大学都要在学校住宿(家在学校旁边的学生请自动忽略)，但是没有必要大包小包的全部从家带到学校，路远难走不说，关键还容易丢，这张必备清单送给你！\n\n\
					1.衣\n\
					大多数院校是在九月初开学，有些会稍晚一点。此时天气还是有点热的，但是大概一个月后天气就会逐渐转凉，所以记得带几件秋装。(鞋子的携带道理同上)\
				　　那些棉袄类的冬装，可以在国庆假期回家带来(一般刚出远门都会想家的，所以十一大多都会回家)，也可以让家里给邮寄过来，省时省力。\n\n\
				    2.食\n\
					南北方以及东西方的饮食差异较大，例如北方好面食，南方好米饭，所以很多学生会吃不惯学校当地的饭。\
				　　但是现在不用太担心，经济发达的今天，你想吃什么学校周边基本上都有的。\
				　　建议入校时带一个装满白开水的水杯，可以一顿不吃饭，但不能一天不喝水，尤其旅途劳顿，喝瓶装水特别容易拉肚子。\
				　　另外，可以带点家乡特产，既可以自己吃，又可以分享给即将见面的室友以快速联络彼此之间的关系。\n\n\
				    3.住\n\
					开学前提前了解学校的住宿环境以及是否统一配套凉席、被褥、蚊帐等。但是据了解，大部分学校还是需要自己带的。\n\n\
					4.用\n\
					上了大学，就意味着要真正远离父母，开始自己独立的生活了，那些生活用品一定要准备好。\n\
					(1)军训必备：纸巾、花露水、风油精、清凉油(驱蚊止痒、治中暑都有用)等;\n\
					(2)防病必备：创可贴、感冒药、退烧药、消炎药、跌打损伤药、胃药，有痛经史的女生还要带缓解痛经的药等。\n\
					(3)生活用品：这些可根据每个人的需求自行准备，例如毛巾、牙刷、牙膏、剃须刀、洗面奶、沐浴露、澡巾、热水瓶，洗脸(脚)盆、晾衣架等。\n\
					与男生相比，女生相对需要的洗护用品要多一些，可以列张清单跟新室友一起去买。除了自己日常需用外，在大学宿舍，以下所列也是很有必要准备的:\n\
					台灯：最好是可以充电的那种，一旦宿舍停电也可以派上用场\n\
					剪刀、双面胶、透明胶：粘挂钩等日常生活基本都用的上。\n\
					锁：宿舍个人的小柜子，还是需要一把锁的。\n\
					收纳盒：对男生宿舍的印象大多是脏、乱、差，所以一个方便的收纳盒还是很有必要的。平时的一些琐碎的东西都可以整理进去，方便卫生。\n\
					电子产品：手机、耳机、充电器三大标配就不用说了。外地学生可以带一个充电宝，以防止手机路上没电。\n\
					另外就是电脑，在网络发达的今天，如果家里有条件，带一台电脑也是很不错的，因为大学很多课程以及社交都是需要电脑的",
					
					
					text2: "轻轨：\n\n\
					1.江北机场：\n\
					乘10号线→环线重庆大学（到达重庆大学A、B区）3号线江北机场→两路口换乘→1号线大学城（到达重庆大学虎溪校区）\n\n\
					2.重庆北站南广场\n\
					环线重庆北站南广场→环线重庆大学（重庆大学A、B校区）环线重庆北站南广场→沙坪坝换乘→1号线大学城（重庆大学虎溪校区）\n\n\
					3.重庆北站北广场\n\
					10号线重庆北站北广场→重庆北站南广场换乘→环线重庆大学（重庆大学A、B校区）4号线重庆北站北广场→民安大道换乘→环线沙坪坝换乘→1号线大学城（重庆大学虎溪校区）\n\n\
					4.重庆西站\n\
					环线重庆西站→重庆大学（重庆大学A、B校区）5号线重庆西站→石桥铺换乘→1号线大学城（重庆大学虎溪校区）\n\n\
					公交车：\n\n\
					1.江北机场专线03号线→杨公桥换乘181路公交车→沙杨路（重庆大学B区后门）→沙中路（重庆大学A区后门）\n\n\
					2.重庆北站北广场东侧乘坐217路公交车→沙中路（重庆大学A区后门）→沙杨路（重庆大学B区后门）\n\n\
					3.重庆北站南广场出站通道到达821路公交车站→沙中路（重庆大学A区后门）→沙杨路（重庆大学B区后门）\n",
					
					}
		},
		computed: {

		},
		methods: {
			submit: function() {
				if (this.currentstep != 6) {
					this.currentstep += 1;
					uni.showToast({
					    title: '请进行下一步',
					    icon: 'none',
					    duration: 3000
					
						})
				} 
				else {
					 // 更新isReported状态
					    this.isReported = true;
						  
				uni.request({
					url: 'http://nsrs.autumnclouds.cn/api/student', //仅为示例，并非真实接口地址。
					method: 'PUT',
					 data: {
					                reportedStatus: 1, // 更新为已报道状态
					            },
					timeout: 5000,
				});
				uni.showToast({
				    title: '您已报道成功！',
				    icon: 'none',
				    duration: 2000
				
					})
				}
				
			},
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (index == this.current) return;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .u-wrap {
	// 	height: calc(100vh);
	// 	/* #ifdef H5 */
	// 	height: calc(100vh - var(--window-top));
	// 	/* #endif */
	// 	display: flex;
	// 	flex-direction: column;
	// }
.notice {
  border-radius: 8px; /* 增加圆角 */
  background-color: #4ba2ff;
  color: white; /* 调整文字颜色 */
  padding: 12px 16px; /* 调整内边距 */
  font-size: 14px; /* 调整文字大小 */
  line-height: 1.5; /* 调整行高，使文字更易读 */
  margin-bottom: 20px; /* 调整通知与其他内容的间距 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.class-item {}
	
	.u-wrap {
	    /* ...其他样式... */
	    background-color: #f4f4f4; /* 更改页面背景颜色 */
	    font-family: Arial, sans-serif; /* 更改字体 */
	}
	
	.page-view {
	    /* ...其他样式... */
	    background-color: #ffffff; /* 更改内容区域背景颜色 */
	    border-radius: 10px; /* 添加圆角边框 */
	    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
	    padding: 20px; /* 增加内边距 */
	}
	
	.u-steps {
	    /* ...其他样式... */
	    margin-top: 20px; /* 增加步骤条与其他内容的间距 */
	}
	.report-btn {
	    background-color: #107cff; /* 修改按钮背景颜色 */
	    color: #ffffff; /* 修改按钮文本颜色 */
	    border: none; /* 去掉按钮边框 */
	    font-weight: bold; /* 加粗按钮文本 */
	    border-radius: 8px; /* 圆角边框 */
	    padding: 10px 20px; /* 调整内边距 */
	    font-size: 16px; /* 调整字体大小 */
	    cursor: pointer; /* 鼠标指针样式为手型 */
	    transition: background-color 0.3s ease; /* 添加过渡效果 */
	}
	
	.report-btn:hover {
	    background-color: #0841ff; /* 鼠标悬停时按钮背景颜色变化 */
	}
	.u-steps .u-icon {
	    font-size: 20px; /* 调整图标大小 */
	    line-height: 20px; /* 调整图标行高 */
	    color: #ccc; /* 默认图标颜色 */
	}
	
	.u-steps .u-icon.success {
	    color: #65a0ff; /* 已完成图标颜色 */
	}
	
	.u-steps {
	  margin-top: 20px; /* 调整步骤条与其他内容的间距 */
	}
	
	.step-icon {
	  font-size: 24px; /* 调整图标大小 */
	  line-height: 24px; /* 调整图标行高 */
	  color: #ccc; /* 默认图标颜色 */
	  margin-right: 6px; /* 调整图标与文字之间的间距 */
	}
	
	.step-icon.success {
	  color: #016fff; /* 已完成图标颜色 */
	}
</style>