const _import = require('../utils/view-import/' + process.env.NODE_ENV)

export default {
  routes: [
    {
      path: '/',
      name: 'index',
      component: _import('frame'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: _import('index')
        },
        {
          path: 'test1',
          name: 'test1',
          component: _import('test1')
        }
      ]
    }
  ]
}
