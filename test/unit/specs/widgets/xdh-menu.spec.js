import Vue from 'vue'
import XdhMenu from '@/widgets/xdh-menu/xdh-menu'

describe('xdh-menu', () => {
  const Constructor = Vue.extend(XdhMenu)

  it('render check', () => {
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
    expect(vm.$el.querySelectorAll('.el-menu-item').length).to.equal(1)
  })

  it('no data', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('.el-menu-item').length).to.equal(0)
  })

  it('group check', () => {
    const data = [{
      id: 1,
      text: 'menu1',
      icon: 'el-icon-setting',
      group: 'group'
    }, {
      id: 2,
      text: 'menu2',
      icon: 'el-icon-setting',
      group: 'group'
    }]
    const vm = new Constructor({
      propsData: {
        data: data
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('.el-menu-item-group').length).to.equal(1)
  })

  it('children check', () => {
    const data = [{
      id: 1,
      text: 'menu1',
      children: [
        {
          id: 2,
          text: 'menu2'
        }
      ]
    }]
    const vm = new Constructor({
      propsData: {
        data: data
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('.el-submenu').length).to.equal(1)
  })
})
