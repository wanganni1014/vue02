// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './kkb/krouter'

// import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // 挂载的目的是什么？让我们可以在插件中访问到Router实例
  components: { App },
  template: '<App/>'
})
