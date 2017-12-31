import { on, off } from 'element-ui/lib/utils/dom'
import Vue from 'vue'

/**
 * 面向对象DOM事件绑定基类
 */
class Events {
  constructor () {
    this.__handlers__ = []
    this.event = new Vue({})
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

  /**
   * 销毁指定事件
   * @param el
   * @param eventName
   * @param callback
   */
  off (el, eventName, callback) {
    this.__handlers__.forEach((item, index) => {
      if (item.el === el && item.eventName === eventName && item.callback === callback) {
        off(item.el, item.eventName, item.proxy)
        this.__handlers__.splice(index, 1)
      }
    })
  }

  destroy () {
    this.__handlers__.forEach(item => {
      off(item.el, item.eventName, item.proxy)
    })
    this.__handlers__ = []
    this.event.$off()
    this.event.$destroy()
  }
}

export default Events
