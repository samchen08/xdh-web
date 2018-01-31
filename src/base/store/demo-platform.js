/*! build time: 2018-1-31 15:22:32 */

// FETCH_DEMO_PLATFORM, GET_DEMO_PLATFORM, ADD_DEMO_PLATFORM, UPDATE_DEMO_PLATFORM, REMOVE_DEMO_PLATFORM
import {
  FETCH_DEMO_PLATFORM,
  GET_DEMO_PLATFORM,
  ADD_DEMO_PLATFORM,
  UPDATE_DEMO_PLATFORM,
  REMOVE_DEMO_PLATFORM
} from '@/store/types'

// fetchDemoPlatform, getDemoPlatform, addDemoPlatform, updateDemoPlatform, removeDemoPlatform
import {
  fetchDemoPlatform,
  getDemoPlatform,
  addDemoPlatform,
  updateDemoPlatform,
  removeDemoPlatform
} from '@/base/api/demo-platform'

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
    [FETCH_DEMO_PLATFORM](state, payload) {
      state.list = payload.list;
      state.page = payload.page;
      state.limit = payload.limit;
      state.total = payload.total;
    },
    [GET_DEMO_PLATFORM](state, payload) {
      state.model = payload.model
    },
    [ADD_DEMO_PLATFORM](state, payload) {
      if (payload.index !== undefined) {
        state.list.splice(payload.index, 0, payload.model)
      } else {
        state.list.push(payload.model);
      }
    },
    [UPDATE_DEMO_PLATFORM](state, payload) {
      if (payload.index !== undefined) {
        state.list.splice(payload.index, 1, payload.model)
      }
    },
    [REMOVE_DEMO_PLATFORM](state, payload) {
      if (payload.index !== undefined) {
        state.list.splice(payload.index, 1)
      }
    }
  },
  actions: {
    [FETCH_DEMO_PLATFORM]({
      commit
    }, {
      data
    } = {}) {
      return fetchDemoPlatform(data).then(res => {
        commit({
          type: FETCH_DEMO_PLATFORM,
          list: res.list,
          page: Number.parseInt(res.page),
          limit: Number.parseInt(res.limit),
          total: Number.parseInt(res.total)
        })
        return res
      })
    },
    [GET_DEMO_PLATFORM]({
      commit
    }, {
      id,
      data
    } = {}) {
      return getDemoPlatform(id, data).then(res => {
        commit({
          type: GET_DEMO_PLATFORM,
          model: res
        })
        return res
      })
    },
    [ADD_DEMO_PLATFORM]({
      commit
    }, {
      data,
      index
    } = {}) {
      return addDemoPlatform(data).then(res => {
        commit({
          type: ADD_DEMO_PLATFORM,
          model: Object.assign({}, data, res),
          index: index
        })
        return res
      })
    },
    [UPDATE_DEMO_PLATFORM]({
      commit,
      state
    }, {
      data,
      index
    } = {}) {
      return updateDemoPlatform(data).then(res => {
        commit({
          type: UPDATE_DEMO_PLATFORM,
          index: index,
          model: Object.assign({}, state.list[index], data, res)
        })
        return res
      })
    },
    [REMOVE_DEMO_PLATFORM]({
      commit
    }, {
      id,
      data,
      index
    } = {}) {
      return removeDemoPlatform(id, data).then(res => {
        commit({
          type: REMOVE_DEMO_PLATFORM,
          index: index
        })
        return res
      })
    }
  }
}
