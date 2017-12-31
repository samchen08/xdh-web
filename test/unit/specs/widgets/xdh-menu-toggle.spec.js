import Vue from 'vue'
import XdhMenuToggle from '@/widgets/xdh-menu-toggle/xdh-menu-toggle'

describe('xdh-menu-toggle', () => {
  const Constructor = Vue.extend(XdhMenuToggle)
  it('render', () => {
    const data = [{
      id: 1,
      text: 'menu1',
      icon: 'el-icon-setting',
      group: null
    }]
    const vm = new Constructor({
      propsData: {
        data: data
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('.el-menu').length).to.equal(2)
  })
})
