/**
 * 拖拽指令
 * 注意：需要设置拖拽容器元素的css position才能启动拖拽
 *
 * 用法：
 * <div v-draggable="options"></div>
 *
 * options: [Boolean, Object]
 *
 * 选项默认值：
 *
 *      const defaultOptions = {
 *
 *       // 拖拽句柄元素选择器
 *       handle: null,
 *
 *       // 限制拖拽方向可选: v 垂直、h 水平，默认不限制
 *       axis: null,
 *
 *       // 延时开始拖拽
 *       delay: 100,
 *
 *       // 限制拖拽范围
 *       range: {
 *         left: -10000,
 *         top: -10000,
 *         width: 10000,
 *         height: 10000
 *       },
 *
 *       // 在元素范围内
 *       target: null,
 *
 *       // 克隆拖拽，boolean 或 function
 *       clone: false,
 *
 *       // 拖拽放置后动画返回原来位置，clone不为false时才有效
 *       revert: true,
 *
 *      // 分组名称， 与droppable配合使用
 *       group: null,
 *
 *
 *       // 是否禁用拖拽
 *       disabled: false,
 *
 *       // 开始拖拽时回调
 *       onStartDrag: noop,
 *
 *       // 结束拖拽时回调
 *       onStopDrag: noop,
 *
 *       // 正在拖拽时回调
 *       onDrag: noop
 *     };
 *
 */

import { addClass, removeClass, setStyle } from 'element-ui/lib/utils/dom'
import Events from '../events'
// 拖拽容器的className
const DRAGGABLE_CLASS = 'xdh-draggable'

// 拖拽句柄的元素className
const DRAGGABLE_HANDLE_CLASS = 'xdh-draggable__handle'

const DRAGGING_CLASS = 'xdh-draggable--dragging'

const CLONE_CLASS = 'xdh-draggable__clone'

const CLONE_TRANSLATE = 'xdh-draggable__clone--translate'

// 禁止页面选择className
const USER_SELECT_NONE = 'user-select--none'

// 空函数
const noop = function () {
}

/**
 * 拖拽类实例化默认参数
 */
const defaultOptions = {

  // 拖拽句柄元素选择器
  handle: null,

  // 限制拖拽方向可选: v 垂直、h 水平，默认不限制
  axis: null,

  // 延时开始拖拽
  delay: 100,

  // 限制拖拽范围
  range: {
    left: -10000,
    top: -10000,
    width: 10000,
    height: 10000
  },
  // 在元素范围内
  target: null,

  // 克隆拖拽，boolean 或 function
  clone: false,

  // 拖拽放置后动画返回原来位置，clone不为false时才有效
  revert: true,

  // 分组名称， 与droppable配合使用
  group: null,

  // 是否禁用拖拽
  disabled: false,

  // 开始拖拽时回调
  onStartDrag: noop,

  // 结束拖拽时回调
  onStopDrag: noop,

  // 正在拖拽时回调
  onDrag: noop
}

class Draggable extends Events {
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

    this.handle = o.handle ? (this.el.querySelector(o.handle) || this.el) : this.el
    if (!o.disabled) {
      addClass(this.el, DRAGGABLE_CLASS)
      addClass(this.handle, DRAGGABLE_HANDLE_CLASS)
      this.on(this.handle, 'mousedown', this.handleMouseDown)
    }
    this.setRange()
  }

  setRange () {
    let target = this.options.target
    if (typeof target === 'string') {
      this.options.target = this.document.querySelector(target)
    }
    if (this.options.target instanceof HTMLElement) {
      const rect = this.options.target.getBoundingClientRect()
      this.options.range = {
        left: rect.left,
        top: rect.top,
        width: rect.left + rect.width,
        height: rect.top + rect.height
      }
    }
  }

  /**
   *  当选项参数改变时调用，更新组件
   * @param options
   */
  reset (options) {
    this.destroy()
    this.init(options)
  }

  handleMouseDown (e) {
    // 设置延迟开始拖拽
    this.timer = setTimeout(() => {
      this.on(this.document, 'mousemove', this.handleMouseMove)
      this.startDrag(e.clientX, e.clientY)
    }, this.options.delay)

    this.on(this.document, 'mouseup', this.handleMouseUp)
  }

  handleMouseMove (e) {
    if (!this.isDragging) return

    // 如果元素同时绑定了resizable，当resizable正在Resizing时，不进行拖拽
    if (this.el.__resizable__ && this.el.__resizable__.isResizing) return

    this.drag(e.clientX, e.clientY)
  }

  handleMouseUp (e) {
    clearTimeout(this.timer)
    if (this.isDragging) {
      this.off(this.document, 'mousemove', this.handleMouseMove)
      this.stopDrag(e.clientX, e.clientY)
    }
    this.off(this.document, 'mouseup', this.handleMouseUp)
  }

  /**
   * 为了防止拖拽过程中鼠标选中了页面的文字导致 mouseup 事件不被触发，在开始拖拽时禁止页面选择文字，在停止拖拽后再恢复
   * @param none
   */
  setBodySelect (none) {
    none
      ? addClass(this.document.body, USER_SELECT_NONE)
      : removeClass(this.document.body, USER_SELECT_NONE)
  }

  createProxy () {
    const o = this.options
    if (o.clone) {
      let node = null
      if (typeof o.clone === 'function') {
        node = o.clone(this)
      } else {
        node = this.el.cloneNode(true)
      }
      addClass(node, CLONE_CLASS)
      this.document.body.appendChild(node)
      return node
    }
    return this.el
  }

  removeProxy () {
    const o = this.options
    if (o.clone) {
      if (o.revert) {
        this.on(this.dragProxy, 'webkitTransitionEnd', this.handleAnimationEnd)
        this.on(this.dragProxy, 'transitionend', this.handleAnimationEnd)
        addClass(this.dragProxy, CLONE_TRANSLATE)
        setStyle(this.dragProxy, 'left', `${this.dragData.startLeft}px`)
        setStyle(this.dragProxy, 'top', `${this.dragData.startTop}px`)
        setTimeout(this.handleAnimationEnd.bind(this), 500)
      } else {
        this.handleAnimationEnd()
      }
    }
  }

  handleAnimationEnd () {
    if (this.dragProxy) {
      this.off(this.dragProxy, 'webkitTransitionEnd', this.handleAnimationEnd)
      this.off(this.dragProxy, 'transitionend', this.handleAnimationEnd)
      this.dragProxy.parentNode.removeChild(this.dragProxy)
      this.dragProxy = null
    }
  }

  startDrag (pageX, pageY) {
    const left = this.el.offsetLeft
    const top = this.el.offsetTop
    const width = this.el.offsetWidth
    const height = this.el.offsetHeight
    this.isDragging = true
    this.dragData = {
      startLeft: left,
      startTop: top,
      left: left,
      top: top,
      startX: pageX,
      startY: pageY,
      width: width,
      height: height,
      offsetWidth: pageX - left,
      offsetHeight: pageY - top
    }
    this.options.onStartDrag(this.dragData)
    this.setBodySelect(true)
    addClass(this.el, DRAGGING_CLASS)
    this.dragProxy = this.createProxy()
    this.droppables = this.getDroppables()
  }

  getDroppables () {
    const o = this.options
    if (!o.group) return []
    let nodes = Array.from(this.document.querySelectorAll('.xdh-droppable'))
    return nodes.filter(node => {
      let match = node.style.display !== 'none'
      if (!match) {
        return false
      }
      const options = node.__droppable__.options
      if (options.accept && !options.disabled) {
        return options.accept.includes(o.group.trim())
      }
      return false
    })
  }

  hasInRect (x, y, rect) {
    return x > rect.left &&
      x < rect.left + rect.width &&
      y > rect.top &&
      y < rect.top + rect.height
  }

  checkDroppable (pageX, pageY) {
    return this.droppables.filter(node => {
      const rect = node.getBoundingClientRect()
      const drop = node.__droppable__
      if (node.entered) {
        node.entered = true
      }
      const isMatch = this.hasInRect(pageX, pageY, rect)
      if (isMatch) {
        if (!node.entered) {
          // 判断是否已近存在进入droppable
          const hasEnterNodes = this.droppables.filter(n => n.entered)
          // 把已近进入的droppable设置为离开，确保当前进入的droppable只有一个
          hasEnterNodes.forEach(n => {
            n.entered = false
            n.__droppable__.event.$emit('drag-leave', this)
          })
          node.entered = true
          drop.event.$emit('drag-enter', this)
        }
        drop.event.$emit('drag-over', this)
      } else {
        if (node.entered) {
          node.entered = false
          drop.event.$emit('drag-leave', this)
        }
      }
      return isMatch
    })
  }

  getDragRange (left, top, width, height) {
    const range = this.options.range
    let offset = {
      left: left,
      top: top
    }
    if (left < range.left) {
      offset.left = range.left
    }
    if (top < range.top) {
      offset.top = range.top
    }
    if (left + width > range.width) {
      offset.left = range.width - width
    }
    if (top + height > range.height) {
      offset.top = range.height - height
    }
    return offset
  }

  drag (pageX, pageY) {
    let data = this.dragData
    let left = data.startLeft + pageX - data.startX
    let top = data.startTop + pageY - data.startY
    const range = this.getDragRange(left, top, data.width, data.height)
    switch (this.options.axis) {
      case 'h':
        data.left = range.left
        break
      case 'v':
        data.top = range.top
        break
      default:
        data.left = range.left
        data.top = range.top
        break
    }
    this.applyDrag()
    this.checkDroppable(pageX, pageY)
    this.options.onDrag(this.dragData)
  }

  applyDrag () {
    let data = this.dragData
    setStyle(this.dragProxy, 'left', `${data.left}px`)
    setStyle(this.dragProxy, 'top', `${data.top}px`)
  }

  stopDrag (pageX, pageY) {
    this.isDragging = false
    this.setBodySelect()
    this.options.onStopDrag(this.dragData)
    removeClass(this.el, DRAGGING_CLASS)

    const metches = this.checkDroppable(pageX, pageY)
    metches.length ? this.handleAnimationEnd() : this.removeProxy()
    metches.forEach(node => {
      node.entered && node.__droppable__.event.$emit('drop', this, metches)
    })
  }

  destroy () {
    super.destroy()
    this.handleAnimationEnd()
    this.off(this.handle, 'mousedown', this.handleMouseDown)
    removeClass(this.el, DRAGGABLE_CLASS)
    removeClass(this.handle, DRAGGABLE_HANDLE_CLASS)
  }
}

export default {
  bind (el, binding) {
    el.__draggable__ = new Draggable(window.document, el, binding.value)
  },
  componentUpdated (el, binding) {
    const instance = el.__draggable__
    instance.reset(binding.value)
  },
  unbind (el) {
    const instance = el.__draggable__
    instance.destroy()
  }
}
