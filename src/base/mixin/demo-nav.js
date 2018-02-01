/*! build time: 2018-1-31 22:08:06 */

// getMenus
import {
  getMenus
} from '@/base/api/demo-nav'

// mixin
export default {
  data() {
    return {
      demoNav: {
        menus: null,
        list: [],
        page: null,
        limit: null,
        total: 0,
        model: null
      }
    }
  },
  methods: {
    getMenus(data) {
      return getMenus(data).then(res => {
        this.demoNav.menus = res
        return res
      })
    }
  }
}
