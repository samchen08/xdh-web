module.exports = {
  vuex: true,
  model: [{
    path: '/demo/api/platform',
    columns: {
      id: '@guid',
      name: '@ctitle',
      code: '@title(1)',
      path: '@url',
      'order|+1': 1,
      remark: '@ctitle'
    }
  }]
}
