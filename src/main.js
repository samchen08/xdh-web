// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import './helper/element-ui'
import './style/index.scss'

// 发布生产环境需要把模拟数据注释
import './mock/index'

Vue.config.productionTip = false

new Vue({
  mixins: [],
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
