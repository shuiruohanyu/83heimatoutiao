import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将地址的常态值设置给baseUrl
Vue.prototype.$axios = axios // 将axios共享给所有Vue或者组件实例使用
Vue.config.productionTip = false
Vue.use(ElementUI) // 相当于全局注册elementUI  Vue.use => 干了什么?
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
