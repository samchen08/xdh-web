/*! create time: 2018-1-25 17:33:57 */

// ajax
import ajax from '@/utils/ajax'

/**
 * FETCH_DEMO_TREE
 * @type {string}
 */
export const FETCH_DEMO_TREE = '/demo/api/tree/list'

/**
 * fetchDemoTree
 * @param data
 * @returns {promise}
 */
export const fetchDemoTree = function (data) {
  return ajax({
    method: 'get',
    data: data,
    url: FETCH_DEMO_TREE
  })
}
