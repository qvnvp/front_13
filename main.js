import App from './App'
//模板改动222
import titleBar from '@/components/titleBar.vue'
Vue.component('titleBar', titleBar)
//模板改动222
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
import uView from "@/uview-ui";
Vue.use(uView);
const app = new Vue({
	...App
})

uni.addInterceptor('request', {
	invoke(args) {
		const user = uni.getStorageSync('user')
		if (user) {
			args.header = {
				'token': user.token
			}
		}
	},
	success(args) {
		// 拦截响应，如果是错误的响应，弹出提示

		if (args.data.code != 200) {

			uni.showToast({
				title: args.data.message,
				icon: 'error'
			})
			if (args.data.code == 214) {
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
				}, 1500)
			}
		}
	}

})
const httpInterceptor = (Vue, vm) => {

	Vue.prototype.$u.http.interceptor.request = (config) => {
		const user = uni.getStorageSync('user');
		if (user) {
			config.header['token'] = user.token;
		}
		return config;
	}
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.code != 200) {
			vm.$u.toast(res.message);
			if (res.code == 214) {
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/user/login/login'
					})
				}, 1500)
			}
		}
		return res
	}
}
Vue.use(httpInterceptor, app)

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif