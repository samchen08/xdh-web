/*! create time: 2017-11-16 18:57:04 */

// ajax
import ajax from '@/utils/ajax'

/**
 * FETCH_SYS_LOG
 * @type {string}
 */
export const FETCH_SYS_LOG = '/api/sys/logs/list'

/**
 * fetchSysLog
 * @param data
 * @returns {promise}
 */
export const fetchSysLog = function (data) {
  return ajax({
    method: 'get',
    data: data,
    url: FETCH_SYS_LOG
  })
}

/**
 * GET_SYS_LOG
 * @type {string}
 */
export const GET_SYS_LOG = '/api/sys/logs/info/:id'

/**
 * getSysLog
 * @param id
 * @param data
 * @returns {promise}
 */
export const getSysLog = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    data: data,
    url: GET_SYS_LOG
  })
}

/**
 * ADD_SYS_LOG
 * @type {string}
 */
export const ADD_SYS_LOG = '/api/sys/logs/save'

/**
 * addSysLog
 * @param data
 * @returns {promise}
 */
export const addSysLog = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: ADD_SYS_LOG
  })
}

/**
 * UPDATE_SYS_LOG
 * @type {string}
 */
export const UPDATE_SYS_LOG = '/api/sys/logs/update'

/**
 * updateSysLog
 * @param data
 * @returns {promise}
 */
export const updateSysLog = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: UPDATE_SYS_LOG
  })
}

/**
 * REMOVE_SYS_LOG
 * @type {string}
 */
export const REMOVE_SYS_LOG = '/api/sys/logs/delete/:id'

/**
 * removeSysLog
 * @param id
 * @param data
 * @returns {promise}
 */
export const removeSysLog = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    data: data,
    url: REMOVE_SYS_LOG
  })
}
