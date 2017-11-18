export const SESSION = sessionStorage
export const LOCAL = localStorage

/**
 * 保存缓存
 * @param key
 * @param value
 * @param storage
 */
export function save (key, value, storage = SESSION) {
  const str = typeof value === 'object' ? JSON.stringify(value) : value
  storage.setItem(key, str)
}

/**
 * 获取缓存
 * @param key
 * @param storage
 * @returns {null}
 */
export function get (key, storage = SESSION) {
  const info = storage.getItem(key)
  return info ? JSON.parse(info) : null
}

/**
 * 删除缓存
 * @param key
 * @param storage
 */
export function remove (key, storage = SESSION) {
  storage.removeItem(key)
}

/**
 * 删除全部缓存
 * @param storage
 */
export function clear (storage = SESSION) {
  storage.clear()
}
