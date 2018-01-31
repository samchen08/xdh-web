/*! create time: 2018-1-31 15:22:32 */

// ajax
import ajax from '@/utils/ajax'

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
