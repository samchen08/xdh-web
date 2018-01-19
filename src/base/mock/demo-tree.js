/*! create time: 2018-1-19 14:57:39 */

// FETCH_DEMO_TREE
import {
  FETCH_DEMO_TREE
} from '@/base/api/demo-tree'

// createTree
import {
  createTree
} from '@/mock/templates'

// Mock
export default [{
  title: 'FETCH_DEMO_TREE',
  url: FETCH_DEMO_TREE,
  params: {
    page: 1,
    limit: 10
  },
  template: createTree
}]
