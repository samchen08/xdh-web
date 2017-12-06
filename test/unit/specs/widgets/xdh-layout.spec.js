import Vue from 'vue'
import XdhLayout from '@/widgets/xdh-layout/xdh-layout'

describe('widgets xdh-layout', () => {
  const Constructor = Vue.extend(XdhLayout)
  it('render components', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.el-header')).to.not.be.null
    expect(vm.$el.querySelector('.el-aside')).to.not.be.null
    expect(vm.$el.querySelector('.el-main')).to.not.be.null
    expect(vm.$el.querySelector('.el-footer')).to.not.be.null
  })

  it('no components render', () => {
    const vm = new Constructor({
      propsData: {
        header: false,
        aside: false,
        footer: false
      }
    }).$mount()
    expect(vm.$el.querySelector('.el-header')).to.be.null
    expect(vm.$el.querySelector('.el-aside')).to.be.null
    expect(vm.$el.querySelector('.el-main')).to.not.be.null
    expect(vm.$el.querySelector('.el-footer')).to.be.null
  })

  it('size check', () => {
    const vm = new Constructor({
      propsData: {
        headerHeight: '100px',
        footerHeight: '100px',
        asideWidth: '100px'
      }
    }).$mount()
    expect(vm.$el.querySelector('.el-header').style.height).to.equal('100px')
    expect(vm.$el.querySelector('.el-footer').style.height).to.equal('100px')
    expect(vm.$el.querySelector('.el-aside').style.width).to.equal('100px')
  })

  it('fixed check', () => {
    const vm = new Constructor({
      propsData: {
        fixed: true
      }
    }).$mount()
    expect(vm.$el.className.includes('xdh-layout__fixed')).to.equal(true)
  })

})
