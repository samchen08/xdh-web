const _import = require('@/utils/view-import/' + process.env.NODE_ENV)
export default [
  {
    path: '/demo',
    component: _import('demo/layout'),
    redirect: '/demo/index',
    children: [
      {
        path: 'index',
        name: '主页',
        component: _import('demo/index'),
        meta: {tab: true}
      },
      {
        path: 'frame',
        component: _import('demo/frame')
      },
      {
        path: 'start',
        name: '快速上手',
        component: _import('demo/start'),
        meta: {tab: true}
      },
      {
        path: 'rules',
        name: '开发规范',
        component: _import('demo/rules'),
        meta: {tab: true}
      }
    ]
  }
]
