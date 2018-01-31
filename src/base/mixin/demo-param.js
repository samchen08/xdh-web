/*! build time: 2018-1-31 15:22:32 */

// fetchDemoParam, getDemoParam, addDemoParam, updateDemoParam, removeDemoParam, removeParams
import {
  fetchDemoParam,
  getDemoParam,
  addDemoParam,
  updateDemoParam,
  removeDemoParam,
  removeParams
} from '@/base/api/demo-param'

// mixin
export default {
  data() {
    return {
      demoParam: {
        message: null,
        list: [],
        page: null,
        limit: null,
        total: 0,
        model: null
      }
    }
  },
  methods: {
    fetchDemoParam(data) {
      return fetchDemoParam(data).then(res => {
        this.demoParam.list = res.list
        this.demoParam.page = Number.parseInt(res.page)
        this.demoParam.limit = Number.parseInt(res.limit)
        this.demoParam.total = Number.parseInt(res.total)
        return res
      })
    },
    getDemoParam(id, data) {
      return getDemoParam(id, data).then(res => {
        this.demoParam.model = Object.assign({}, data, res || {})
        return res
      })
    },
    addDemoParam(data, index) {
      return addDemoParam(data, index).then(res => {
        this.demoParam.model = Object.assign({}, data, res || {})
        if (index !== undefined) {
          this.demoParam.list.splice(index, 0, this.demoParam.model)
        } else {
          this.demoParam.list.push(this.demoParam.model);
        }
        return res
      })
    },
    updateDemoParam(data, index) {
      return updateDemoParam(data, index).then(res => {
        this.demoParam.model = Object.assign({}, data, res || {})
        if (index !== undefined) {
          this.demoParam.list.splice(index, 1, this.demoParam.model)
        }
        return res
      })
    },
    removeDemoParam(id, data, index) {
      return removeDemoParam(id, data, index).then(res => {
        if (index !== undefined) {
          this.demoParam.list.splice(index, 1)
        }
        return res
      })
    },
    removeParams(data) {
      return removeParams(data).then(res => {
        this.demoParam.message = res
        return res
      })
    }
  }
}
