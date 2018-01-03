/*! build time: 2018-1-3 08:59:48 */

// fetchTree
import {
  fetchTree
} from '@/base/api/tree'

// mixin
export default {
  data() {
    return {
      tree: {
        list: [],
        page: null,
        limit: null,
        total: 0,
        model: null
      }
    }
  },
  methods: {
    fetchTree(data) {
      return fetchTree(data).then(res => {
        this.tree.list = res.list
        this.tree.page = Number.parseInt(res.page)
        this.tree.limit = Number.parseInt(res.limit)
        this.tree.total = Number.parseInt(res.total)
        return res
      })
    }
  }
}
