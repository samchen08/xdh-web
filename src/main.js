// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import { FETCH_USERS, REMOVE_USERS } from './store/types'

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
  components: {App},
  created () {
    this.$store.dispatch(FETCH_USERS)
    this.$store.dispatch(REMOVE_USERS, {data: {name: 'hello'}, id: 123, index: 0})
  },
  watch: {}
})
