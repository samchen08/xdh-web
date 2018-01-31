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
      }
    },
    {
      path: '/demo/api/param/remove',
      methods: false,
      name: 'removeParams',
      state: 'message',
      columns: {
        msg: '删除成功'
      }
    }
  ]
}
