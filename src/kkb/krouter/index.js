import Vue from 'vue'
import VueRouter from '@kkb/krouter/kvue-router'
import Home from '@/views/Home'
import About from '@/views/About'

// 1. use一下，VueRouter是一个插件
// 做了什么？
// 声明两个全局组件 （router-view，router-link）
// use会调用VueRouter.install(Vue),会将Vue实例传入install方法
// 但是Vue.use调用的时机非常早，早到还没有new VueRouter（）。所以考虑使用混入解决这一问题。
Vue.use(VueRouter)


// 2.声明一个路由表
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

// 3.创建一个Router实例
export default new VueRouter({
  routes
})
