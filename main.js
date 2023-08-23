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
    }
})
const httpInterceptor = (Vue, vm) => {

    // 请求拦截部分，如配置，每次请求前都会执行
    Vue.prototype.$u.http.interceptor.request = (config) => {
        const user = uni.getStorageSync('user');
        if (user) {
            config.header['token'] = user.token;
        }
        return config;
    }
}
Vue.use(httpInterceptor, app)


app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif