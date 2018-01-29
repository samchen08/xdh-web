import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store/index'
import createStoreModule from '../widgets/xdh-nav-tabs/store'

const SYSTEM_STORE = 'systemTabs'
const router = new Router(routes)

// 注册导航tabs store模块
if (!store.state[SYSTEM_STORE]) {
  store.registerModule(SYSTEM_STORE, createStoreModule())
}

Vue.use(Router)

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to) => {
  if (to.meta.tab) {
    store.commit(`${SYSTEM_STORE}/push`, {
      tab: {
        label: to.name,
        name: to.path,
        closable: true
      }
    })
  } else {
    store.commit(`${SYSTEM_STORE}/clear`)
  }
})

export default router
