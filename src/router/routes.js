import demoRoutes from './demo/index'

const _import = require('../utils/view-import/' + process.env.NODE_ENV)

export default {
  routes: [
    ...demoRoutes,
    {
      path: '/',
      redirect: '/demo'
    },
    {
      path: '/login',
      component: _import('login')
    },

    {
      path: '*',
      component: _import('404')
    }
  ]
}
