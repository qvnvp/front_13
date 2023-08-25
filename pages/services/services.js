//本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm
import app from "../../App.vue"


// 定义全局参数,控制数据加载
var _self, page = 1,
	timer = null;

export default {
	data() {
		return {
			loadingText: '',

			page: 0, //当前分页页码
			apiUrl: 'https://www.ymznkf.com/wx_server', //后端接口地址
			id: '', //传值使用,方便存在本地的locakStorage  
			del_id: '' //方便存在本地的locakStorage  
		}
	},
	components: {

	},
	onLoad(options) {
		_self = this;

		//检查是否登录参考代码,需要用的时候，可以把注释取掉
		//if(this.checkLogin()==false){
		//	return;
		//}

		//this.getLaction();//得到gps

		this.page = 0;

		//检测有没有传入id参数
		if (options.id != null && options.id != "") {
			this.id = options.id;
		}
		//执行初始化,需要用的时候，可以把注释取掉
		//this.Refresh("init");

	},
	onShow() {
		console.log("on show");
		//if(this.checkLogin()==false){
		//	return;
		//}

		//执行初始化,需要用的时候，可以把注释取掉
		//this.Refresh("init");
	},
	onPullDownRefresh: function() {
		//下拉刷新的时候请求一次数据
		this.Refresh();
	},
	methods: {
		/**
		 * services_4_4处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		// services_4_4_click:function(event){

		// },

		/**
		 * services_6_6处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		// services_6_6_click:function(event){

		// },

		/**
		 * services_29_29处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_29_29_click: function(event) {
			uni.navigateTo({
				url: '/pages/services/chuangye/chuangye?url=' + encodeURIComponent(
					'https://sxic.cqu.edu.cn/home')
			})
		},

		/**
		 * services_32_32处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_32_32_click: function() {
			uni.navigateTo({
				url: "/pages/services/bus_time/bus_time"
			})
		},

		/**
		 * services_35_35处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_35_35_click: function(event) {
			uni.navigateTo({
				url: '/pages/services/jiaofei/jiaofei?url=' + encodeURIComponent(
					'http://pay.cqu.edu.cn/payment/mobilePay/getOpenid.action?code=073XrnGa1fafTF0WgoJa1GP5Ik3XrnGR&state=&jump_from=1_05_37_01'
					)
			})
		},

		/**
		 * services_38_38处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_38_38_click: function(event) {
			uni.navigateTo({
				url: '/pages/services/webview/webview?url=' + encodeURIComponent(
					'http://v2.lib.cqu.edu.cn/')
			})
		},

		/**
		 * services_41_41处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_41_41_click: function(event) {
			uni.navigateTo({
				url: "/pages/services/wenjuan/wenjuan"
			})
		},

		/**
		 * services_44_44处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_44_44_click: function(event) {
			uni.navigateTo({
				url: "/pages/services/activities/activities"
			})
		},

		/**
		 * services_48_48处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_48_48_click: function(event) {
			uni.navigateTo({
				url: "/pages/services/xiaoli/xiaoli"
			})
		},

		/**
		 * services_51_51处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_51_51_click: function(event) {
			uni.navigateTo({
				url: '/pages/services/pinjiao/pinjiao?url=' + encodeURIComponent(
					'http://jxpj.cqu.edu.cn/stu/index')
			})
		},

		/**
		 * services_54_54处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_54_54_click: function(event) {
			uni.navigateTo({
				url: '/pages/services/xinli/xinli?url=' + encodeURIComponent(
					'https://yuyuezixunm.cqu.edu.cn/student-index?jump_from=1_05_37_01')
			})
		},

		/**
		 * services_58_58处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_58_58_click: function() {
			uni.navigateTo({
				url: "/pages/services/baoxiu/baoxiu"
			})
		},

		/**
		 * services_59_59处理函数
		 * 数据绑定  data-index="{{index}}" 
		 * 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
		 */
		services_59_59_click: function(event) {
			uni.navigateTo({
				url: "/pages/services/baoxiu/baoxiu"
			})
		},



		//刷新数据
		Refresh: function(_action) {

			uni.showLoading();

			//提交到服务器
			var that = this
			var url = that.apiUrl + '{server_code_file_path}';
			console.log(url);
			uni.request({
				url: url, //后端接口地址，需要改成自己的接口地址
				data: {
					action: _action, //上传动作，如按钮点击会产生click动作，分页也会产生，在后端根据具体的动作来判断事件
					uid: that.getUid(), //上传用户id,在登录中获得
					//上传页面中的变量
					//定义变量---start

					//定义变量---end
					id: that.id, //上传id值，后端可以根据此值来操作当前id
					del_id: that.del_id, //在列表中删除按钮选中时，上传到有后端，进行删除操作
					page: that.page
				},
				method: 'GET',
				success: function(res) { //后端返回数据

					// 隐藏导航栏加载框  
					uni.hideNavigationBarLoading();
					// 停止下拉动作  
					uni.stopPullDownRefresh();

					// 隐藏加载框  
					uni.hideLoading();

					var tmp = res.data;

					//初始化，对页面上的控件进行赋值操作
					if (_action == "init") {

					}

					{
						deal_listpages
					}



					//如果后端有返回消息，则弹出消息提示
					if (tmp.message != null && tmp.message != "") {
						uni.showToast({
							title: tmp.message,
							icon: 'none',
							duration: 2000
						})
					}



					//如果后端有返回页码，则更改当前页码
					if (tmp.page != null && tmp.page != "") {
						page = tmp.page;
					}

				},
				fail: function(res) {
					uni.showToast({
						title: "服务器访问失败",
						icon: 'none',
						duration: 2000
					})
					console.log(res.data);
					console.log('is failed')
				}
			})
		},
	}
}