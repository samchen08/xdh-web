import demoRoutes from './demo/index'

// const _import = require('../utils/view-import/' + process.env.NODE_ENV)

export default {
  routes: [
    {
      path: '/',
      redirect: '/demo'
    },
    ...demoRoutes
  ]
}
