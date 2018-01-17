/*
 ex:
 export const handleName = function (Mock, url, query){
 // return {code:0, data:[], message:''}
 }
 */

export const createTree = function (Mock, url, query) {
  let root = Mock.mock({
    'list|30': [{
      'id|+1': 1,
      'label': '@ctitle',
      'parentId': null
    }]
  })
  let data = Mock.mock({
    'list|100': [{
      'id|+1': 31,
      'label': '@ctitle',
      'parentId': function () { return Math.floor(Math.random() * 50) }
    }]
  })
  return {code: 0, data: {list: root.list.concat(data.list)}, message: ''}
}

export const mockMenus = function (Mock, url, query) {
  const menuData = [
    {
      id: '/home',
      icon: 'el-icon-upload',
      text: '云服务',
      group: null
    }, {
      id: '/test1',
      icon: 'iconfont icon-play',
      text: '云服务',
      group: null,
      children: [{
        id: '/test1',
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组一'
      }, {
        id: 3,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组一'
      }, {
        id: 4,
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组二'
      }, {
        id: 5,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组二'
      }]
    }, {
      id: 11,
      icon: 'el-icon-upload',
      text: '云服务二',
      group: null,
      children: [{
        id: 52,
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组一'
      }, {
        id: 53,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组一'
      }, {
        id: 54,
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组二'
      }, {
        id: 55,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组二'
      }]
    }, {
      id: 121,
      icon: 'el-icon-upload',
      text: '云服务三',
      group: null
    }]
  return {code: 0, data: menuData, message: ''}
}
