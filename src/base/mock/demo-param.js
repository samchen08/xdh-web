/*! create time: 2018-1-31 22:08:06 */

// FETCH_DEMO_PARAM, GET_DEMO_PARAM, ADD_DEMO_PARAM, UPDATE_DEMO_PARAM, REMOVE_DEMO_PARAM, REMOVE_PARAMS
import {
  FETCH_DEMO_PARAM,
  GET_DEMO_PARAM,
  ADD_DEMO_PARAM,
  UPDATE_DEMO_PARAM,
  REMOVE_DEMO_PARAM,
  REMOVE_PARAMS
} from '@/base/api/demo-param'

// Mock
export default [{
  title: 'FETCH_DEMO_PARAM',
  url: FETCH_DEMO_PARAM,
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
        'value': '@title(1)',
        'remark': '@ctitle'
      }]
    }
  }
}, {
  title: 'GET_DEMO_PARAM',
  url: GET_DEMO_PARAM,
  params: {},
  template: {
    code: 0,
    message: '',
    data: {
      'id': '@guid',
      'name': '@ctitle',
      'value': '@title(1)',
      'remark': '@ctitle'
    }
  }
}, {
  title: 'ADD_DEMO_PARAM',
  url: ADD_DEMO_PARAM,
  params: {},
  template: {
    code: 0,
    message: '添加成功',
    data: {
      'id': '@guid'
    }
  }
}, {
  title: 'UPDATE_DEMO_PARAM',
  url: UPDATE_DEMO_PARAM,
  params: {},
  template: {
    code: 0,
    message: '更新成功',
    data: true
  }
}, {
  title: 'REMOVE_DEMO_PARAM',
  url: REMOVE_DEMO_PARAM,
  params: {},
  template: {
    code: 0,
    message: '删除成功',
    data: true
  }
}, {
  title: 'REMOVE_PARAMS',
  url: REMOVE_PARAMS,
  params: {},
  template: {
    code: 0,
    message: '',
    data: {
      'msg': '删除成功'
    }
  }
}]
