module.exports = {
  vuex: false,
  model: [
    {
      path: '/demo/api/param',
      columns: {
        id: '@guid',
        name: '@ctitle',
        value: '@title(1)',
        remark: '@ctitle'
      },
      transform: 'userMap'
    },
    {
      path: '/demo/api/param/remove',
      methods: false,
      name: 'removeParams',
      columns: {
        msg: '删除成功'
      }
    }
  ]
}
