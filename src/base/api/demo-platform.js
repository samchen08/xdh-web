/*! create time: 2018-1-31 15:22:32 */

// ajax
import ajax from '@/utils/ajax'

/**
 * FETCH_DEMO_PLATFORM
 * @type {string}
 */
export const FETCH_DEMO_PLATFORM = '/demo/api/platform/list'

/**
 * fetchDemoPlatform
 * @param data
 * @returns {promise}
 */
export const fetchDemoPlatform = function (data) {
  return ajax({
    method: 'get',
    data: data,
    url: FETCH_DEMO_PLATFORM
  })
}

/**
 * GET_DEMO_PLATFORM
 * @type {string}
 */
export const GET_DEMO_PLATFORM = '/demo/api/platform/info/:id'

/**
 * getDemoPlatform
 * @param id
 * @param data
 * @returns {promise}
 */
export const getDemoPlatform = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    data: data,
    url: GET_DEMO_PLATFORM
  })
}

/**
 * ADD_DEMO_PLATFORM
 * @type {string}
 */
export const ADD_DEMO_PLATFORM = '/demo/api/platform/save'

/**
 * addDemoPlatform
 * @param data
 * @returns {promise}
 */
export const addDemoPlatform = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: ADD_DEMO_PLATFORM
  })
}

/**
 * UPDATE_DEMO_PLATFORM
 * @type {string}
 */
export const UPDATE_DEMO_PLATFORM = '/demo/api/platform/update'

/**
 * updateDemoPlatform
 * @param data
 * @returns {promise}
 */
export const updateDemoPlatform = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: UPDATE_DEMO_PLATFORM
  })
}

/**
 * REMOVE_DEMO_PLATFORM
 * @type {string}
 */
export const REMOVE_DEMO_PLATFORM = '/demo/api/platform/delete/:id'

/**
 * removeDemoPlatform
 * @param id
 * @param data
 * @returns {promise}
 */
export const removeDemoPlatform = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    data: data,
    url: REMOVE_DEMO_PLATFORM
  })
}
