/*! create time: 2018-1-3 08:59:48 */

// ajax
import ajax from '@/utils/ajax'

/**
 * FETCH_TREE
 * @type {string}
 */
export const FETCH_TREE = '/api/tree/list'

/**
 * fetchTree
 * @param data
 * @returns {promise}
 */
export const fetchTree = function (data) {
  return ajax({
    method: 'get',
    data: data,
    url: FETCH_TREE
  })
}
