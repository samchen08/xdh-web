module.exports = {
  vuex: true,
  model: [{
    path: '/api/users',
    columns: {
      id: '@id',
      name: '@ctitle'
    }
  }, {
    path: '/api/users/login/:name',
    methods: false,
    name: 'login',
    state: 'currentUser'
  }]
}
