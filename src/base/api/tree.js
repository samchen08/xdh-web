/*! create time: 2017-12-31 13:27:19 */

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
