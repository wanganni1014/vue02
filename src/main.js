// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './kkb/krouter'
import store from './kkb/kstore'

// import store from './store'
// import router from './router'

Vue.config.productionTip = false

console.log(router)

/* eslint-disable no-new */
new Vue({
  router,  // 挂载的目的是什么？让我们可以在插件中访问到Router实例
  store,
  render: h => h(App)
}).$mount('#app')
