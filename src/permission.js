// 权限
import router from './router'
import nprogress from 'nprogress' // 引入模块
import 'nprogress/nprogress.css' // 引入css
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  nprogress.start() // 开启进度条
  // 判断 拦截的范围
  if (to.path.startsWith('/home')) {
    // 进入到了拦截范围
    // 判断是否登录 有token 就登录 没token就没登录
    let token = window.localStorage.getItem('user-token') // 获取token
    if (token) {
      // 如果有token
      next()
    } else {
      next('/login') // 没有token 就跳转到登录页
    }
  } else {
    next() // 放行
  }
})
// 全局后置守卫
router.afterEach(function () {
  // 关闭进度条
  nprogress.done()
})
// 先导出
export default router
