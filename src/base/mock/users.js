/*! create time: 2017-11-16 18:57:04 */

// FETCH_USERS, GET_USERS, ADD_USERS, UPDATE_USERS, REMOVE_USERS
import {
  FETCH_USERS,
  GET_USERS,
  ADD_USERS,
  UPDATE_USERS,
  REMOVE_USERS
} from '@/base/api/users'

// Mock
export default [{
  title: 'FETCH_USERS',
  url: FETCH_USERS,
  params: {
    page: 1,
    limit: 10
  },
  template: {
    code: 0,
    data: {
      page: '{{page}}',
      limit: '{{limit}}',
      total: 1000,
      'list|{{limit}}': [{
        'id': '@id',
        'name': '@ctitle'
      }]
    }
  }
}, {
  title: 'GET_USERS',
  url: GET_USERS,
  params: {},
  template: {
    code: 0,
    message: '',
    data: {
      'id': '@id',
      'name': '@ctitle'
    }
  }
}, {
  title: 'ADD_USERS',
  url: ADD_USERS,
  params: {},
  template: {
    code: 0,
    message: '添加成功',
    data: true
  }
}, {
  title: 'UPDATE_USERS',
  url: UPDATE_USERS,
  params: {},
  template: {
    code: 0,
    message: '更新成功',
    data: true
  }
}, {
  title: 'REMOVE_USERS',
  url: REMOVE_USERS,
  params: {},
  template: {
    code: 0,
    message: '删除成功',
    data: true
  }
}]
