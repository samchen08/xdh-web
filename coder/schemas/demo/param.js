module.exports = {
  vuex: false,
  model: [{
    path: '/demo/api/param',
    columns: {
      id: '@guid',
      name: '@ctitle',
      value: '@title(1)',
      remark: '@ctitle'
    }
  }]
}
