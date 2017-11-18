/*! build time: 2017-11-16 18:57:04 */

// FETCH_USERS, GET_USERS, ADD_USERS, UPDATE_USERS, REMOVE_USERS, LOGIN
import {
  FETCH_USERS,
  GET_USERS,
  ADD_USERS,
  UPDATE_USERS,
  REMOVE_USERS,
  LOGIN
} from '@/store/types'

// fetchUsers, getUsers, addUsers, updateUsers, removeUsers, login
import {
  fetchUsers,
  getUsers,
  addUsers,
  updateUsers,
  removeUsers,
  login
} from '@/base/api/users'

// store module
export default {
  state: {
    currentUser: null,
    list: [],
    page: null,
    limit: null,
    total: 0,
    model: null
  },
  mutations: {
    [FETCH_USERS](state, payload) {
      state.list = payload.list;
      state.page = payload.page;
      state.limit = payload.limit;
      state.total = payload.total;
    },
    [GET_USERS](state, payload) {
      state.model = payload.model
    },
    [ADD_USERS](state, payload) {
      if (payload.index !== undefined) {
        state.list.splice(payload.index, 0, payload.model)
      } else {
        state.list.push(payload.model);
      }
    },
    [UPDATE_USERS](state, payload) {
      if (payload.index !== undefined) {
        state.list.splice(payload.index, 1, payload.model)
      }
    },
    [REMOVE_USERS](state, payload) {
      if (payload.index !== undefined) {
        state.list.splice(payload.index, 1)
      }
    },
    [LOGIN](state, payload) {
      state.currentUser = payload.currentUser
    }
  },
  actions: {
    [FETCH_USERS]({
      commit
    }, {
      data
    } = {}) {
      return fetchUsers(data).then(res => {
        commit({
          type: FETCH_USERS,
          list: res.list,
          page: Number.parseInt(res.page),
          limit: Number.parseInt(res.limit),
          total: Number.parseInt(res.total)
        })
        return res
      })
    },
    [GET_USERS]({
      commit
    }, {
      id,
      data
    } = {}) {
      return getUsers(id, data).then(res => {
        commit({
          type: GET_USERS,
          model: res
        })
        return res
      })
    },
    [ADD_USERS]({
      commit
    }, {
      data,
      index
    } = {}) {
      return addUsers(data).then(res => {
        commit({
          type: ADD_USERS,
          model: Object.assign({}, data, res),
          index: index
        })
        return res
      })
    },
    [UPDATE_USERS]({
      commit,
      state
    }, {
      data,
      index
    } = {}) {
      return updateUsers(data).then(res => {
        commit({
          type: UPDATE_USERS,
          index: index,
          model: Object.assign({}, state.list[index], data, res)
        })
        return res
      })
    },
    [REMOVE_USERS]({
      commit
    }, {
      id,
      data,
      index
    } = {}) {
      return removeUsers(id, data).then(res => {
        commit({
          type: REMOVE_USERS,
          index: index
        })
        return res
      })
    },
    [LOGIN]({
      commit
    }, {
      name,
      data
    } = {}) {
      return login(name, data).then(res => {
        commit({
          type: LOGIN,
          currentUser: res
        })
        return res
      })
    }
  }
}
