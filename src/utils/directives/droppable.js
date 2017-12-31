/**
 * 可放置指令
 *
 * 用法：
 * <div v-droppable="options"></div>
 *
 * options: [Boolean, Object]
 *
 * 选项默认值：
 *
 */
import Events from '../events'
import { addClass, removeClass } from 'element-ui/lib/utils/dom'

const DROPPABLE_CLASS = 'xdh-droppable'
const DRAG_ENTER_CLASS = 'xdh-droppable--enter'
// 空函数
const noop = function () {
}
const defaultOptions = {
  // 设置可放置的draggable分组名称，字符串或数组，多个分组字符串可用英文逗号分隔
  accept: null,

  enterClass: DRAG_ENTER_CLASS,

  // 是否禁用
  disabled: false,

  // 拖拽进入回调
  onDragEnter: noop,
  // 拖拽经过回调
  onDragOver: noop,

  // 拖拽离开回调
  onDragLeave: noop,

  // 放置回调
  onDrop: noop
}

class Droppable extends Events {
  constructor (document, el, options) {
    super()
    this.document = document
    this.el = el
    this.init(options)
  }

  init (options) {
    let o = this.options = Object.assign({},
      defaultOptions,
      options === false ? {disabled: true} : options || {})
    if (typeof o.accept === 'string') {
      this.options.accept = o.accept.split(',')
    }
    addClass(this.el, DROPPABLE_CLASS)
    this.event.$on('drag-enter', this.handleDragEnter.bind(this))
    this.event.$on('drag-over', this.handleDragOver.bind(this))
    this.event.$on('drag-leave', this.handleDragLeave.bind(this))
    this.event.$on('drop', this.handleDrop.bind(this))
  }

  handleDragEnter (e) {
    addClass(this.el, this.options.enterClass)
    this.options.onDragEnter(e)
  }

  handleDragOver (e) {
    this.options.onDragOver(e)
  }

  handleDragLeave (e) {
    removeClass(this.el, this.options.enterClass)
    this.options.onDragLeave(e)
  }

  handleDrop (e) {
    removeClass(this.el, this.options.enterClass)
    this.options.onDrop(e)
  }

  destroy () {
    super.destroy()
    removeClass(this.el, DROPPABLE_CLASS)
    removeClass(this.el, this.options.enterClass)
  }

  reset (options) {
    this.destroy()
    this.init(options)
  }
}

export default {
  bind (el, binding) {
    el.__droppable__ = new Droppable(window.document, el, binding.value)
  },
  componentUpdated (el, binding) {
    // const instance = el.__droppable__
    // instance.reset(binding.value)
  },
  unbind (el) {
    const instance = el.__droppable__
    instance.destroy()
  }
}
