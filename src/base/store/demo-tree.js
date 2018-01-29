/*! build time: 2018-1-25 17:33:57 */

// FETCH_DEMO_TREE
import {
  FETCH_DEMO_TREE
} from '@/store/types'

// fetchDemoTree
import {
  fetchDemoTree
} from '@/base/api/demo-tree'

// store module
export default {
  state: {
    list: [],
    page: null,
    limit: null,
    total: 0,
    model: null
  },
  mutations: {
    [FETCH_DEMO_TREE](state, payload) {
      state.list = payload.list;
      state.page = payload.page;
      state.limit = payload.limit;
      state.total = payload.total;
    }
  },
  actions: {
    [FETCH_DEMO_TREE]({
      commit
    }, {
      data
    } = {}) {
      return fetchDemoTree(data).then(res => {
        commit({
          type: FETCH_DEMO_TREE,
          list: res.list,
          page: Number.parseInt(res.page),
          limit: Number.parseInt(res.limit),
          total: Number.parseInt(res.total)
        })
        return res
      })
    }
  }
}
