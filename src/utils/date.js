/**
 * 日期格式转换
 * @param dateStr {String|Date} 日期时间对象或字符串
 * @param format {String} 输出格式，yyyy-MM-dd hh:mm:ss
 * @param options {Object} 时间偏移对象，可选 {y,M,d,h,m,s}
 * @returns {String|Date}
 * @example
 * // 当前时间减少一天, 并转换格式
 *  date(new Date(), 'yyyy-MM-dd', {d: -1})
 */
export default function date (dateStr, format, options) {
  if (!dateStr) {
    return (new Date())
  }
  let obj = typeof dateStr === 'string' ? new Date(dateStr.replace(/-/g, '/')) : dateStr
  const setting = {
    y: 0, // 年
    M: 0, // 月
    d: 0, // 日
    h: 0, // 时
    m: 0, // 分
    s: 0 // 秒
  }
  Object.assign(setting, options || {})

  obj = new Date(setting.y + obj.getFullYear(),
    setting.M + obj.getMonth(),
    setting.d + obj.getDate(),
    setting.h + obj.getHours(),
    setting.m + obj.getMinutes(),
    setting.s + obj.getSeconds())
  let o = {
    'M+': obj.getMonth() + 1,
    'd+': obj.getDate(),
    'h+': obj.getHours(),
    'm+': obj.getMinutes(),
    's+': obj.getSeconds(),
    'q+': Math.floor((obj.getMonth() + 3) / 3),
    'S': obj.getMilliseconds()
  }
  if (format) {
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1,
        RegExp.$1.length === 4 ? obj.getFullYear() : (obj.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  } else {
    return obj
  }
}
