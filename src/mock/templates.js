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
