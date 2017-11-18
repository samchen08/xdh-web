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
