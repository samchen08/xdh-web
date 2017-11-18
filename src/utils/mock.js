import Mock from 'mockjs'
import pathToRegex from 'path-to-regexp'
import { parse, getParams } from './url'

// 模拟请求延时时间
Mock.setup({
  timeout: '50-300'
})

function getBody (body) {
  if (!body) return null

  const regex = /^\{[\W\w]*\}$/
  return regex.test(body) ? JSON.parse(body) : parse(body)
}

/**
 * 根据mock配置，拦截请求返回模拟数据
 * @param item {title:String, url:string, params:Object, template:Object|Function}
 */
export default function (item) {
  // 匹配的请求url
  let oRegex = pathToRegex(item.url)
  // 只匹配path，忽略参数
  let regex = new RegExp(oRegex.source.replace('(?:\\/)?$', '($|\\?)'), 'i')
  // 设置拦截请求url
  Mock.mock(regex, function (options) {
    let result
    // 把GET、POST请求的参数对象与默认的参数进行合并组成新的对象
    let query = Object.assign({},
      item.params || {},
      getParams(item.url, options.url),
      parse(options.url || ' '),
      getBody(options.body)
    )
    if (typeof item.template === 'function') {
      result = item.template(Mock, options.url, query, options)
    } else {
      // 把模拟数据模板字转换成字符串，因为需要对模板插入自定义参数
      let templateString = JSON.stringify(item.template)

      // 替换在模板中的参数标识
      for (let key in query) {
        templateString = templateString.replace(new RegExp('{{' + key + '}}', 'g'), query[key])
      }
      // 返回模拟数据
      result = Mock.mock(JSON.parse(templateString))
    }
    // 打印模拟请求日志
    console.info('【Mock】' + item.title + ' :', options, result, '\n----------------------')
    return result
  })
}
