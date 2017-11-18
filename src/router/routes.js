const _import = require('../utils/view-import/' + process.env.NODE_ENV)

export default {
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: _import('HelloWorld')
    }
  ]
}
