// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import './helper/element-ui'
import './mock/index'
import './style/index.scss'

Vue.config.productionTip = false

new Vue({
  mixins: [],
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
