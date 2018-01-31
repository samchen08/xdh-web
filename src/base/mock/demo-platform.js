/*! create time: 2018-1-31 15:22:32 */

// FETCH_DEMO_PLATFORM, GET_DEMO_PLATFORM, ADD_DEMO_PLATFORM, UPDATE_DEMO_PLATFORM, REMOVE_DEMO_PLATFORM
import {
  FETCH_DEMO_PLATFORM,
  GET_DEMO_PLATFORM,
  ADD_DEMO_PLATFORM,
  UPDATE_DEMO_PLATFORM,
  REMOVE_DEMO_PLATFORM
} from '@/base/api/demo-platform'

// Mock
export default [{
  title: 'FETCH_DEMO_PLATFORM',
  url: FETCH_DEMO_PLATFORM,
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
        'id': '@guid',
        'name': '@ctitle',
        'code': '@title(1)',
        'path': '@url',
        'order|+1': 1,
        'remark': '@ctitle'
      }]
    }
  }
}, {
  title: 'GET_DEMO_PLATFORM',
  url: GET_DEMO_PLATFORM,
  params: {},
  template: {
    code: 0,
    message: '',
    data: {
      'id': '@guid',
      'name': '@ctitle',
      'code': '@title(1)',
      'path': '@url',
      'order|+1': 1,
      'remark': '@ctitle'
    }
  }
}, {
  title: 'ADD_DEMO_PLATFORM',
  url: ADD_DEMO_PLATFORM,
  params: {},
  template: {
    code: 0,
    message: '添加成功',
    data: {
      'id': '@guid'
    }
  }
}, {
  title: 'UPDATE_DEMO_PLATFORM',
  url: UPDATE_DEMO_PLATFORM,
  params: {},
  template: {
    code: 0,
    message: '更新成功',
    data: true
  }
}, {
  title: 'REMOVE_DEMO_PLATFORM',
  url: REMOVE_DEMO_PLATFORM,
  params: {},
  template: {
    code: 0,
    message: '删除成功',
    data: true
  }
}]
