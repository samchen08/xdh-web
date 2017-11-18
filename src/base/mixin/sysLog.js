/*! build time: 2017-11-16 18:57:04 */

// fetchSysLog, getSysLog, addSysLog, updateSysLog, removeSysLog
import {
  fetchSysLog,
  getSysLog,
  addSysLog,
  updateSysLog,
  removeSysLog
} from '@/base/api/sysLog'

// mixin
export default {
  data() {
    return {
      sysLog: {
        list: [],
        page: null,
        limit: null,
        total: 0,
        model: null
      }
    }
  },
  methods: {
    fetchSysLog(data) {
      return fetchSysLog(data).then(res => {
        this.sysLog.list = res.list
        this.sysLog.page = Number.parseInt(res.page)
        this.sysLog.limit = Number.parseInt(res.limit)
        this.sysLog.total = Number.parseInt(res.total)
        return res
      })
    },
    getSysLog(id, data) {
      return getSysLog(id, data).then(res => {
        this.sysLog.model = Object.assign({}, data, res || {})
        return res
      })
    },
    addSysLog(data, index) {
      return addSysLog(data, index).then(res => {
        this.sysLog.model = Object.assign({}, data, res || {})
        if (index !== undefined) {
          this.sysLog.list.splice(index, 0, this.sysLog.model)
        } else {
          this.sysLog.list.push(this.sysLog.model);
        }
        return res
      })
    },
    updateSysLog(data, index) {
      return updateSysLog(data, index).then(res => {
        this.sysLog.model = Object.assign({}, data, res || {})
        if (index !== undefined) {
          this.sysLog.list.splice(index, 1, this.sysLog.model)
        }
        return res
      })
    },
    removeSysLog(id, data, index) {
      return removeSysLog(id, data, index).then(res => {
        if (index !== undefined) {
          this.sysLog.list.splice(index, 1)
        }
        return res
      })
    }
  }
}
