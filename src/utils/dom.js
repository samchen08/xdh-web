/**
 * 获取元素 offsetLeft, 建议用 el.getBoundingClientRect().left
 * @param el
 * @returns {*}
 */
export function offsetLeft (el) {
  return el.offsetParent ? el.offsetLeft + offsetLeft(el.offsetParent) : el.offsetLeft
}

/**
 * 获取元素 offsetTop,  建议用 el.getBoundingClientRect().top
 * @param el
 * @returns {*}
 */
export function offsetTop (el) {
  return el.offsetParent ? el.offsetTop + offsetTop(el.offsetParent) : el.offsetTop
}

/**
 * 获取的窗体的滚动距离
 * @param target
 * @param top
 * @returns {*}
 */
export function getScroll (target, top) {
  if (target === window) {
    const prop = top ? 'pageYOffset' : 'pageXOffset'
    const method = top ? 'scrollTop' : 'scrollLeft'

    let ret = target[prop]

    if (typeof ret !== 'number') {
      ret = window.document.documentElement[method]
    }

    return ret
  } else {
    const method = top ? 'scrollTop' : 'scrollLeft'
    return target[method]
  }
}

/**
 * 获取元素的 offset
 * @param element
 * @returns {{top: number, left: number}}
 */
export function getOffset (element) {
  const rect = element.getBoundingClientRect()

  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)

  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

// scrollTop animation
export function scrollTop (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) return

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}

export function insertAfter (newEl, targetEl) {
  const parentEl = targetEl.parentNode
  if (parentEl.lastChild === targetEl) {
    parentEl.appendChild(newEl)
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling)
  }
}
