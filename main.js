import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
//注册全局组件
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import mineNavTab from "@/components/mine-nav-tab/mine-nav-tab.vue";
Vue.component("mine-nav-tab",mineNavTab)
Vue.component("uni-nav-bar",uniNavBar)
Vue.component("scroll-uni",MescrollUni)
const app = new Vue({
    ...App
})
app.$mount()
