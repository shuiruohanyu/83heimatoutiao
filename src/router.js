import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index.vue' // 完整写法
import Home from './views/home/'
import Login from './views/login' // 简写
import Main from './views/home/main'
Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*', // 匹配任何地址 但是如果其他的可以匹配 优先匹配其他 否则匹配该组件
      component: () => import('./views/404')
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', // 什么都不写 就默认是二级路由组件的
          component: Main // 默认二级路由
        },
        {
          // path:'/home/comment', // 完整写法
          path: 'comment', // 评论列表路径
          component: () => import('./views/comment')
        }, {
          path: 'material',
          component: () => import('./views/material')
        }, {
          path: 'articles',
          component: () => import('./views/articles')
        }, {
          // 修改文章
          path: 'publish/:articleId', // 定义参数
          component: () => import('./views/publish')
        }, {
          // 新建组件
          path: 'publish',
          component: () => import('./views/publish')
        }, {
          // 账户信息
          path: 'account',
          component: () => import('./views/account')
        }, {
          // 图文数据
          path: 'gradata',
          component: () => import('./views/fans')
        }, {
          // 异步应用
          path: 'async',
          component: () => import('./views/async')
        }
      ]
    }, {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue') // 按需加载
    // }
  ]
})
