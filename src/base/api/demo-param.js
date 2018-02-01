/*! create time: 2018-1-31 22:08:06 */

// ajax
import ajax, {
  transformHandler
} from '@/utils/ajax'

// transformer
import transformer from '@/mapping/index'
const {
  userMap
} = transformer

/**
 * FETCH_DEMO_PARAM
 * @type {string}
 */
export const FETCH_DEMO_PARAM = '/demo/api/param/list'

/**
 * fetchDemoParam
 * @param data
 * @returns {promise}
 */
export const fetchDemoParam = function (data) {
  return ajax({
    method: 'get',
    transformResponse: [transformHandler(userMap, 'fetchDemoParam', data)],
    data: data,
    url: FETCH_DEMO_PARAM
  })
}

/**
 * GET_DEMO_PARAM
 * @type {string}
 */
export const GET_DEMO_PARAM = '/demo/api/param/info/:id'

/**
 * getDemoParam
 * @param id
 * @param data
 * @returns {promise}
 */
export const getDemoParam = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    transformResponse: [transformHandler(userMap, 'getDemoParam', data, {
      id
    })],
    data: data,
    url: GET_DEMO_PARAM
  })
}

/**
 * ADD_DEMO_PARAM
 * @type {string}
 */
export const ADD_DEMO_PARAM = '/demo/api/param/save'

/**
 * addDemoParam
 * @param data
 * @returns {promise}
 */
export const addDemoParam = function (data) {
  return ajax({
    method: 'post',
    transformResponse: [transformHandler(userMap, 'addDemoParam', data)],
    data: data,
    url: ADD_DEMO_PARAM
  })
}

/**
 * UPDATE_DEMO_PARAM
 * @type {string}
 */
export const UPDATE_DEMO_PARAM = '/demo/api/param/update'

/**
 * updateDemoParam
 * @param data
 * @returns {promise}
 */
export const updateDemoParam = function (data) {
  return ajax({
    method: 'post',
    transformResponse: [transformHandler(userMap, 'updateDemoParam', data)],
    data: data,
    url: UPDATE_DEMO_PARAM
  })
}

/**
 * REMOVE_DEMO_PARAM
 * @type {string}
 */
export const REMOVE_DEMO_PARAM = '/demo/api/param/delete/:id'

/**
 * removeDemoParam
 * @param id
 * @param data
 * @returns {promise}
 */
export const removeDemoParam = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    transformResponse: [transformHandler(userMap, 'removeDemoParam', data, {
      id
    })],
    data: data,
    url: REMOVE_DEMO_PARAM
  })
}

/**
 * REMOVE_PARAMS
 * @type {string}
 */
export const REMOVE_PARAMS = '/demo/api/param/remove'

/**
 * removeParams
 * @param data
 * @returns {promise}
 */
export const removeParams = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: REMOVE_PARAMS
  })
}
