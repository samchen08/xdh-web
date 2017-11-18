/*! create time: 2017-11-16 18:57:04 */

// ajax
import ajax from '@/utils/ajax'

/**
 * FETCH_USERS
 * @type {string}
 */
export const FETCH_USERS = '/api/users/list'

/**
 * fetchUsers
 * @param data
 * @returns {promise}
 */
export const fetchUsers = function (data) {
  return ajax({
    method: 'get',
    data: data,
    url: FETCH_USERS
  })
}

/**
 * GET_USERS
 * @type {string}
 */
export const GET_USERS = '/api/users/info/:id'

/**
 * getUsers
 * @param id
 * @param data
 * @returns {promise}
 */
export const getUsers = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    data: data,
    url: GET_USERS
  })
}

/**
 * ADD_USERS
 * @type {string}
 */
export const ADD_USERS = '/api/users/save'

/**
 * addUsers
 * @param data
 * @returns {promise}
 */
export const addUsers = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: ADD_USERS
  })
}

/**
 * UPDATE_USERS
 * @type {string}
 */
export const UPDATE_USERS = '/api/users/update'

/**
 * updateUsers
 * @param data
 * @returns {promise}
 */
export const updateUsers = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: UPDATE_USERS
  })
}

/**
 * REMOVE_USERS
 * @type {string}
 */
export const REMOVE_USERS = '/api/users/delete/:id'

/**
 * removeUsers
 * @param id
 * @param data
 * @returns {promise}
 */
export const removeUsers = function (id, data) {
  return ajax({
    method: 'get',
    params: {
      id
    },
    data: data,
    url: REMOVE_USERS
  })
}

/**
 * LOGIN
 * @type {string}
 */
export const LOGIN = '/api/users/login/:name'

/**
 * login
 * @param name
 * @param data
 * @returns {promise}
 */
export const login = function (name, data) {
  return ajax({
    method: 'post',
    params: {
      name
    },
    data: data,
    url: LOGIN
  })
}
