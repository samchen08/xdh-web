/*! create time: 2018-1-3 08:59:48 */

// FETCH_TREE
import {
  FETCH_TREE
} from '@/base/api/tree'

// createTree
import {
  createTree
} from '@/mock/templates'

// Mock
export default [{
  title: 'FETCH_TREE',
  url: FETCH_TREE,
  params: {
    page: 1,
    limit: 10
  },
  template: createTree
}]
