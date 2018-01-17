/*! create time: 2018-1-17 21:12:34 */

// ajax
import ajax from '@/utils/ajax'

/**
 * GET_MENUS
 * @type {string}
 */
export const GET_MENUS = '/api/menus'

/**
 * getMenus
 * @param data
 * @returns {promise}
 */
export const getMenus = function (data) {
  return ajax({
    method: 'post',
    data: data,
    url: GET_MENUS
  })
}
