/**
 * 把列表数据转换成树结构, 列表数据必须有父节点标识
 * 如列表：[{id, parentId}, ...]
 * 转换成：[{id, parentId, level, children:[{id, parentId, level}, ...]}, ...]
 * @param list 原始列表数据
 * @param parentId 从哪个父节点的标识开始查找
 * @param level 制定第一层的标识
 * @param prop  属性map
 * @returns {Array.<*>}
 */
export function listToTree (list, parentId, level = 0, prop = {
  id: 'id',
  parentId: 'parentId',
  children: 'children',
  level: 'level',
  order: 'order'
}) {
  let temp, result = []
  list.forEach(item => {
    if (item[prop.parentId] === parentId) {
      let obj = Object.assign({}, item)
      obj[prop.level] = level
      temp = listToTree(list, obj[prop.id], level + 1, prop)
      if (temp.length > 0) {
        obj[prop.children] = temp
      }
      result.push(obj)
    }
  })
  // 有排序字段
  if (result[0] && result[0][prop.order]) {
    return result.sort((a, b) => {
      return a[prop.order] - b[prop.order]
    })
  } else {
    // 无排序
    return result
  }
}

/**
 * 列表数据转换成表格数结构
 * @param list
 * @param parentId
 * @param level
 * @param prop
 * @param idPath
 * @returns {Array.<*>}
 */
export function listToTableTree (list, parentId, level = 0, prop = {
  id: 'id',
  parentId: 'parentId',
  children: 'children',
  level: 'level',
  order: 'order'
}, idPath) {
  let temp, result = []
  list.forEach(item => {
    if (item[prop.parentId] === parentId) {
      let obj = Object.assign({}, item)
      obj[prop.level] = level
      obj.idPath = (idPath || '') + '_' + item[prop.id]
      result.push(obj)
      temp = listToTableTree(list, obj[prop.id], level + 1, prop, obj.idPath)
      if (temp.length > 0) {
        result = result.concat(temp)
      }
    }
  })
  return result.sort((a, b) => {
    return a[prop.order] - b[prop.order]
  })
}

/**
 * 深度拷贝对象或数组
 * @param obj
 */
export function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 判断数据类型
 * @param obj
 * @returns {*}
 */
export function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/**
 * 深度拷贝对象或数据
 * @param data
 * @returns {*}
 */
export function deepCopy (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}
