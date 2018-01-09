import { on, off } from 'element-ui/lib/utils/dom'
import Vue from 'vue'

/**
 * 面向对象DOM事件绑定基类
 */
class Events {
  constructor () {
    this.__handlers__ = []
    this.__event__ = new Vue({})
  }

  /**
   * 绑定事件
   * @param el 元素DOM对象
   * @param eventName 事件名称如：click、mouseenter、keydown
   * @param callback 事件回调函数，函数内的this会修改指向类的实例
   */
  on (el, eventName, callback) {
    const proxy = callback.bind(this)
    const handler = {el, eventName, callback, proxy}
    this.__handlers__.push(handler)
    on(el, eventName, proxy)
  }

  $on () {
    return this.event.$on.apply(this.__event__, arguments)
  }

  /**
   * 销毁指定事件
   * @param el
   * @param eventName
   * @param callback
   */
  off (el, eventName, callback) {
    if (!el) return
    const length = arguments.length
    this.__handlers__.forEach((item, index) => {
      switch (length) {
        case 3:
          if (item.el === el && item.eventName === eventName && item.callback === callback) {
            off(item.el, item.eventName, item.proxy)
            this.__handlers__.splice(index, 1)
          }
          break
        case 2:
          if (item.el === el && item.eventName === eventName) {
            off(item.el, item.eventName, item.proxy)
            this.__handlers__.splice(index, 1)
          }
          break
        case 1:
          if (item.el === el) {
            off(item.el, item.eventName, item.proxy)
            this.__handlers__.splice(index, 1)
          }
          break
      }
    })
  }

  $off () {
    return this.__event__.$off.apply(this.__event__, arguments)
  }

  $emit () {
    return this.__event__.$emit.apply(this.__event__, arguments)
  }

  destroy () {
    this.__handlers__.forEach(item => {
      off(item.el, item.eventName, item.proxy)
    })
    this.__handlers__ = []
    this.__event__.$off()
    this.__event__.$destroy()
  }
}

export default Events
