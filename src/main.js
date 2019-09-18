import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI) // 相当于全局注册elementUI  Vue.use => 干了什么?
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
