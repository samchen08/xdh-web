/*! create time: 2017-12-26 09:21:28 */

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
