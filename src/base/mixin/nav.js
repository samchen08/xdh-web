/*! build time: 2018-1-17 21:12:34 */

// getMenus
import {
  getMenus
} from '@/base/api/nav'

// mixin
export default {
  data() {
    return {
      nav: {
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
        this.nav.menus = res
        return res
      })
    }
  }
}
