/**
 *  resizable 指令
 *
 *  用法：
 *  <div v-resizable="options"></div>
 *
 *  options: [Boolean, Object]
 *
 *  const defaultOptions = {
 *     disabled: false,
 *     handles: 'all', // 可resize的方向，可选值 e/s/w/n/all
 *     minWidth: 20,
 *     minHeight: 20,
 *     maxWidth: 10000,
 *     maxHeight: 10000,
 *     edge: 5, // 距离边缘多少时显示鼠标Cursor
 *     onStartResize: noop,
 *     onStopResize: noop,
 *     onResize: noop
 *   };
 *
 *
 */
import { addClass, removeClass, getStyle, setStyle } from 'element-ui/lib/utils/dom'

import Events from '../events'

// 禁止页面选择className
const USER_SELECT_NONE = 'user-select--none'

// 拖拽容器的className
const RESIZABLE_CLASS = 'xdh-resizable'

const RESIZING_CLASS = 'xdh-resizeable--resizing'

// 空函数
const noop = function () {
}

const defaultOptions = {
  disabled: false,
  handles: 'all', // 可resize的方向，可选值 e/s/w/n/all
  minWidth: 50,
  minHeight: 50,
  maxWidth: 10000,
  maxHeight: 10000,
  edge: 5, // 距离边缘多少时显示鼠标Cursor
  onStartResize: noop,
  onStopResize: noop,
  onResize: noop
}

class Resizable extends Events {
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
    this.handleArray = o.handles.split(',')
    this.isResizing = false
    this.isMouseEnter = false
    if (!o.disabled) {
      addClass(this.el, RESIZABLE_CLASS)
      this.on(this.el, 'mousedown', this.handleMouseDown)
      this.on(this.el, 'mouseleave', this.handleMouseLeave)
      this.on(this.el, 'mouseenter', this.handleMouseEnter)
      this.on(this.document, 'mousemove', this.handleMouseMove)
    }
  }

  reset (options) {
    this.destroy()
    this.init(options)
  }

  handleMouseDown (e) {
    const dir = this.getDirection(e)
    if (!dir) return
    this.startResize(dir, e.pageX, e.pageY)
    this.on(this.document, 'mouseup', this.handleMouseUp)
    return false
  }

  handleMouseLeave () {
    this.isMouseEnter = false
    !this.isResizing && this.setCursor(null)
    return false
  }

  handleMouseEnter () {
    this.isMouseEnter = true
    return false
  }

  handleMouseMove (e) {
    if (this.options.disabled) return

    // 鼠标进入容器才计算resize方向
    if (this.isMouseEnter && !this.isResizing) {
      const dir = this.getDirection(e)
      this.setCursor(dir)
    }
    if (this.isResizing) {
      this.resize(e)
      this.applyResize()
    }
    return false
  }

  handleMouseUp () {
    this.stopResize()
    this.off(this.document, 'mouseup', this.handleMouseUp)
  }

  getDirection ({pageX, pageY}) {
    const edge = this.options.edge
    const data = {
      left: this.el.offsetLeft,
      top: this.el.offsetTop,
      width: this.el.offsetWidth,
      height: this.el.offsetHeight
    }
    let dir = ''
    if (pageY > data.top && pageY < data.top + edge) {
      dir += 'n'
    } else if (pageY < data.top + data.height && pageY > data.top + data.height - edge) {
      dir += 's'
    }
    if (pageX > data.left && pageX < data.left + edge) {
      dir += 'w'
    } else if (pageX < data.left + data.width && pageX > data.left + data.width - edge) {
      dir += 'e'
    }
    for (let i = 0; i < this.handleArray.length; i++) {
      let handle = this.handleArray[i].trim()
      if (handle === 'all' || handle === dir) {
        return dir
      }
    }
    return null
  }

  startResize (dir, pageX, pageY) {
    const left = this.el.offsetLeft
    const top = this.el.offsetTop
    const width = this.el.offsetWidth
    const height = this.el.offsetHeight
    this.resizeData = {
      dir: dir,
      startLeft: left,
      startTop: top,
      left: left,
      top: top,
      startX: pageX,
      startY: pageY,
      startWidth: width,
      startHeight: height,
      width: width, // outerWidth
      height: height, // outerHeight
      deltaWidth: width - Number.parseInt(getStyle(this.el, 'width')), // outerWidth 与 元素 width 的差值
      deltaHeight: height - Number.parseInt(getStyle(this.el, 'height')) // outerHeight 与 元素 height 的差值
    }
    this.isResizing = true
    this.setBodySelect(true)
    this.options.onStartResize(this.resizeData)
    addClass(this.el, RESIZING_CLASS)
  }

  stopResize () {
    this.isResizing = false
    this.setBodySelect()
    this.options.onStopResize(this.resizeData)
    removeClass(this.el, RESIZING_CLASS)
  }

  resize ({pageX, pageY}) {
    let data = this.resizeData
    if (!data.dir) return

    const o = this.options
    if (data.dir.includes('e')) {
      let width = data.startWidth + pageX - data.startX
      width = Math.min(
        Math.max(width, o.minWidth),
        o.maxWidth
      )
      data.width = width
    }
    if (data.dir.includes('s')) {
      let height = data.startHeight + pageY - data.startY
      height = Math.min(
        Math.max(height, o.minHeight),
        o.maxHeight
      )
      data.height = height
    }
    if (data.dir.includes('w')) {
      let width = data.startWidth - pageX + data.startX
      width = Math.min(
        Math.max(width, o.minWidth),
        o.maxWidth
      )
      data.width = width
      data.left = data.startLeft + data.startWidth - data.width
    }
    if (data.dir.includes('n')) {
      let height = data.startHeight - pageY + data.startY
      height = Math.min(
        Math.max(height, o.minHeight),
        o.maxHeight
      )
      data.height = height
      data.top = data.startTop + data.startHeight - data.height
    }
  }

  applyResize () {
    const data = this.resizeData
    setStyle(this.el, 'width', `${data.width - data.deltaWidth}px`)
    setStyle(this.el, 'height', `${data.height - data.deltaHeight}px`)
    setStyle(this.el, 'left', `${data.left}px`)
    setStyle(this.el, 'top', `${data.top}px`)
    this.options.onResize(this.resizeData)
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

  setCursor (dir) {
    const cursor = dir ? `${dir}-resize` : ''
    setStyle(this.document.body, 'cursor', cursor)
  }

  destroy () {
    super.destroy()
    this.off(this.el, 'mousedown', this.handleMouseDown)
    this.off(this.el, 'mouseleave', this.handleMouseLeave)
    this.off(this.el, 'mouseenter', this.handleMouseEnter)
    this.off(this.document, 'mousemove', this.handleMouseMove)
    removeClass(this.el, RESIZABLE_CLASS)
  }
}

export default {
  bind (el, binding) {
    el.__resizable__ = new Resizable(window.document, el, binding.value)
  },
  componentUpdated (el, binding) {
    const instance = el.__resizable__
    instance.reset(binding.value)
  },
  unbind (el) {
    const instance = el.__resizable__
    instance.destroy()
  }
}
