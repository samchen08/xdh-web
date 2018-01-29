/*
 ex:
 export const handleName = function (Mock, url, query){
 // return {code:0, data:[], message:''}
 }
 */

export const createTree = function (Mock, url, query) {
  let root = Mock.mock({
    'list|30': [{
      'id|+1': 1,
      'label': '@ctitle',
      'parentId': null
    }]
  })
  let data = Mock.mock({
    'list|100': [{
      'id|+1': 31,
      'label': '@ctitle',
      'parentId': function () { return Math.floor(Math.random() * 50) }
    }]
  })
  return {code: 0, data: {list: root.list.concat(data.list)}, message: ''}
}

export const mockMenus = function (Mock, url, query) {
  const menuData = [
    {
      path: '/demo',
      icon: 'iconfont icon-home',
      text: '主页'
    },
    {
      path: '/demo/start',
      icon: 'el-icon-news',
      text: '快速上手'
    },
    {
      path: '/demo/rules',
      icon: 'el-icon-share',
      text: '开发规范',
      children: []
    },
    {
      path: '/demo/base',
      icon: 'iconfont icon-widget',
      text: '基础组件',
      children: [
        {
          path: 'interactive',
          icon: 'el-icon-star-off',
          text: '交互类'
        },
        {
          path: 'makeup',
          icon: 'el-icon-star-off',
          text: '排版类'
        }
      ]
    },
    {
      path: '/demo/business',
      icon: 'iconfont icon-component',
      text: '业务组件'
    },
    {
      path: '/demo/utils',
      icon: 'el-icon-star-on',
      text: '实用工具'
    },
    {
      path: '/demo/utils',
      icon: 'el-icon-menu',
      text: '官方资源',
      children: [
        {
          path: 'https://cn.vuejs.org/',
          icon: 'el-icon-star-off',
          text: 'Vue.js',
          type: 'iframe'
        },
        {
          path: 'http://element.eleme.io/',
          icon: 'el-icon-star-off',
          text: 'ElementUI',
          type: 'iframe'
        }
      ]
    }
  ]
  return {code: 0, data: menuData, message: ''}
}
