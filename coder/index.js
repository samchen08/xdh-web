const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const rm = require('rimraf')
const beautify = require('js-beautify').js_beautify
const pathToRegexp = require('path-to-regexp')
const config = require('./config')

const templatePath = path.join(__dirname, config.templatesDir)
const apiRender = getRender('api.js')
const mockRender = getRender('mock.js')
const storeRender = getRender('store.js')
const mixinRender = getRender('mixin.js')
const typesRender = getRender('types.js')
const iconsRender = getRender('icons.js')

/**
 * 读取模板渲染函数
 * @param file
 */
function getRender (file) {
  return require(path.join(templatePath, file))
}

/**
 * 转换成规范的js命名，如：sys_log.js 转换成 sysLog
 * @param name
 */
function toSchemaName (name) {
  return _.camelCase(name.replace('.js', ''))
}

/**
 * 获取架构配置文件列表
 * @param root 从那个路径开始查找
 * @param parent 当前的目录名称，可选
 * @returns {Array}
 */
function getSchemaFiles (root, parent) {
  let fileList = []
  let files = fs.readdirSync(root)
  _.each(files, function (file) {
    if (file.indexOf('.js') > 0) {
      let filePath = path.join(root, file)
      let stat = fs.lstatSync(filePath)
      if (stat.isDirectory()) {
        fileList = fileList.concat(getSchemaFiles(filePath, file))
      } else {
        fileList.push({
          name: toSchemaName(parent ? [parent, file].join('_') : file),
          path: filePath
        })
      }
    }
  })
  return fileList
}

/**
 * 根据配置文件生成配置JSON
 * @param files
 * @returns {{}}
 */
function getSchemaInfo (files) {
  let models = {}
  _.each(files, function (file) {
    models[file.name] = require(file.path)
  })
  return models
}

/**
 * 创建文件
 * @param path
 * @param fileName
 * @param content
 */
function writeFile (path, fileName, content) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  fs.writeFileSync(path + fileName + '.js', content, {encoding: 'utf8'})
}

function toUpperCase (name) {
  return name.toUpperCase()
}

/**
 * Foo Bar | --foo-bar | __foo_bar__ => fooBar
 * @param name
 */
function toCamelCase (name) {
  return _.camelCase(name)
}

/**
 * Foo Bar | fooBar | --foo-bar => foo_bar
 * @param name
 */
function toSnakeCase (name) {
  return _.snakeCase(name)
}

function toUpperSnakeCaseName (name) {
  return toUpperCase(toSnakeCase(name))
}

/**
 * 格式化js代码
 * @param content
 * @returns {*}
 */
function beautifyJs (content) {
  content = content.replace(/(\r\n|\n)\s*/g, '\n')
    .replace(/\(\n/g, '(')
    .replace(/,\n/g, ',')
    .replace(/\/\*\*/g, '\n/**')
    .replace(/\n\/\//g, '\n\n//')

  return beautify(content, {
    indent_with_tabs: false,
    indent_size: 2,
    jslint_happy: true,
    end_with_newline: true,
    space_after_anon_function: true
  })
}

/**
 * JSON转换成字符串，并把双引号转换成单引号
 * @param json
 */
function stringify (json) {
  let str = JSON.stringify(json)
  return str.replace(/'/g, '\\\'').replace(/"/g, '\'')
}

/**
 * 解析models
 * @param models
 * @returns {{}}
 */
function parseSchemas (schemas) {
  let result = {}
  _.each(schemas, function (schema, name) {
    result[name] = parseModel(schema.model, name)
  })
  return result
}

/**
 * 解析单个model
 * @param model
 * @param name
 * @returns {Array}
 */
function parseModel (model, name) {
  let result = []
  if (_.isArray(model)) {
    _.each(model, function (item) {
      if (item.disabled !== true && item.path) {
        result = result.concat(parseModel(item, name))
      }
    })
  } else {
    if (model.disabled !== true && model.path) {
      if (model.methods === false) {
        if ((!model.state && !model.method) || !model.name) {
          throw Error('methods为false时，必须要设置state 和 name')
        }
        let options = _.extend({}, {method: 'post'}, model.options || {})
        result.push({
          path: model.path,
          prefix: model.prefix || config.pathPrefix,
          transform: model.transform,
          options: options,
          columns: model.columns,
          methodType: model.method || model.name,
          httpMethod: options.method,
          suffix: '',
          upperSnakeCaseName: toUpperSnakeCaseName(model.name),
          camelCaseName: toCamelCase(model.name),
          template: model.template,
          name: model.name,
          state: model.state
        })
      } else {
        let methods = model.methods || config.methods
        _.each(methods, function (method) {
          // ajax请求类型
          let httpMethod = config.methodTypeMap[method] || 'get'
          // vue-resource options
          let options = _.extend({}, {method: httpMethod}, method.options || {})
          result.push({
            path: model.path,
            transform: model.transform,
            prefix: model.prefix || config.pathPrefix,
            suffix: config.methodSuffixMap[method] || '',
            options: options,
            columns: model.columns,
            methodType: method,
            httpMethod: httpMethod,
            upperSnakeCaseName: toUpperSnakeCaseName(method + '_' + name),
            camelCaseName: toCamelCase(method + '_' + name),
            template: model.template
          })
        })
      }
    }
  }
  return result
}

/**
 * 生成api文件
 */
function writeApi (json) {
  _.each(json, function (model, name) {
    let items = [], configKeys = [], transforms = []
    _.each(model, function (item) {
      if (item.prefix) {
        configKeys.push(item.prefix)
      }
      if (item.transform) {
        transforms.push(item.transform)
      }
      let url = item.path + item.suffix
      let keys = []
      pathToRegexp(url, keys)

      // 去重，在数组中已存在的URL不加进去
      if (!items.some(n => n.URL === item.upperSnakeCaseName)) {
        items.push({
          URL: item.upperSnakeCaseName,
          url: item.path + item.suffix,
          prefix: item.prefix,
          params: keys.map(n => n.name),
          camelCaseName: item.camelCaseName,
          options: item.options,
          ajaxParam: 'data',
          transform: item.transform
        })
      }
    })
    // 去重
    configKeys = _.uniq(configKeys)
    transforms = _.uniq(transforms)
    const outPath = path.join(__dirname, config.outApiPath)
    writeFile(outPath, name, beautifyJs(apiRender({
      transforms: transforms,
      configKeys: configKeys,
      items: items
    })))
  })
}

/**
 * 生成mock文件
 */
function writeMock (json) {
  let dbConfig = [], extendsArray = [],
    outPath = path.join(__dirname, config.outMockPath)
  _.each(json, function (model, name) {
    dbConfig.push(`import ${name} from '@/base/mock/${name}'`)
    extendsArray.push(`...${name}`)
    let mocks = [], importApiArray = [], templateArray = []
    _.each(model, function (item) {
      if (item.columns || item.template) {
        importApiArray.push(item.upperSnakeCaseName)
      }
      if (item.template) {
        templateArray.push(item.template)
      }
      if (item.columns || item.template) {
        mocks.push({
          URL: item.upperSnakeCaseName,
          page: config.statePageName || 'page',
          limit: config.statePageSizeName || 'limit',
          total: config.stateTotalName || 'total',
          list: config.stateListName || 'list',
          httpMethod: item.httpMethod,
          methodType: item.methodType,
          columns: stringify(item.columns || {}, '', '\t'),
          template: item.template
        })
      }
    })
    importApiArray = _.uniq(importApiArray)
    templateArray = _.uniq(templateArray)
    writeFile(outPath, name, beautifyJs(mockRender({
      importApiArray: importApiArray,
      name: name,
      mocks: mocks,
      code: config.mockCodeName || 'code',
      data: config.mockDataName || 'data',
      message: config.mockMsgName || 'message',
      templateArray: templateArray,
      codeValue: config.successCodeValue,
      addData: stringify(config.addMockData),
      updateData: stringify(config.updateMockData),
      removeData: stringify(config.removeMockData)
    })))
  })
  dbConfig.push(`export default [${extendsArray.join(', ')}]`)
  writeFile(path.join(__dirname, config.outMockConfig), 'rules', dbConfig.join('\n') + '\n')
}

/**
 * 生成mixin文件
 */
function writeMixin (json, info) {
  let extendsArray = []
  _.each(json, function (model, name) {
    if (info[name].vuex) {
      return
    }
    extendsArray.push(name)
    let importTypeArray = [],
      importApiArray = [],
      customStateArray = [],
      items = []
    _.each(model, function (item) {
      importTypeArray.push(item.upperSnakeCaseName)
      importApiArray.push(item.camelCaseName)
      if (item.state) {
        customStateArray.push(item.state)
      }
      let url = item.path + item.suffix
      let keys = []
      pathToRegexp(url, keys)

      items.push({
        NAME: item.upperSnakeCaseName,
        name: item.camelCaseName,
        state: item.state,
        params: keys.map(n => n.name),
        httpMethod: item.httpMethod,
        methodType: item.methodType,
        ajaxParam: 'data'
      })
    })
    importTypeArray = _.uniq(importTypeArray)
    importApiArray = _.uniq(importApiArray)
    customStateArray = _.uniq(customStateArray)
    const outPath = path.join(__dirname, config.outMixinPath)
    writeFile(outPath, name, beautifyJs(mixinRender({
      name: name,
      importTypeArray: importTypeArray,
      importApiArray: importApiArray,
      customStateArray: customStateArray,
      page: config.statePageName || 'page',
      limit: config.statePageSizeName || 'limit',
      total: config.stateTotalName || 'total',
      list: config.stateListName || 'list',
      model: config.stateModelName || 'model',
      items: items
    })))
  })
}

/**
 * 生成store文件
 */
function writeStore (json, info) {
  let types = {}
  let modules = [], extendsArray = []
  _.each(json, function (model, name) {
    if (!info[name].vuex) {
      return
    }
    modules.push(`import ${name} from '@/base/store/${name}'`)
    extendsArray.push(name)

    let importTypeArray = [],
      importApiArray = [],
      customStateArray = [],
      items = []
    types[name] = []
    _.each(model, function (item) {
      types[name].push({
        name: item.upperSnakeCaseName
      })
      importTypeArray.push(item.upperSnakeCaseName)
      importApiArray.push(item.camelCaseName)
      if (item.state) {
        customStateArray.push(item.state)
      }
      let url = item.path + item.suffix
      let keys = []
      pathToRegexp(url, keys)

      items.push({
        NAME: item.upperSnakeCaseName,
        name: item.camelCaseName,
        state: item.state,
        params: keys.map(n => n.name),
        httpMethod: item.httpMethod,
        methodType: item.methodType,
        ajaxParam: 'data'
      })
    })
    importTypeArray = _.uniq(importTypeArray)
    importApiArray = _.uniq(importApiArray)
    customStateArray = _.uniq(customStateArray)
    const outPath = path.join(__dirname, config.outStorePath)
    writeFile(outPath, name, beautifyJs(storeRender({
      name: name,
      importTypeArray: importTypeArray,
      importApiArray: importApiArray,
      customStateArray: customStateArray,
      page: config.statePageName || 'page',
      limit: config.statePageSizeName || 'limit',
      total: config.stateTotalName || 'total',
      list: config.stateListName || 'list',
      model: config.stateModelName || 'model',
      items: items
    })))
  })
  const outStore = path.join(__dirname, config.outStoreType)
  writeFile(outStore, 'types', beautifyJs(typesRender({types: types})))
  modules.push(`export default {${extendsArray.join(', ')}}`)
  writeFile(outStore, 'modules', modules.join('\n') + '\n')
}

function writeIconData () {
  const content = fs.readFileSync(path.join(__dirname, config.iconCssFile), {encoding: 'utf-8'})
  const regex = /.icon-[\w-_]+:/g
  const matches = content.match(regex)
  const result = matches.map(function (item) {
    return item.replace('.icon-', '').replace(':', '')
  })
  const fileContent = iconsRender({items: stringify(result)})
  fs.writeFileSync(path.join(__dirname, config.outIconFile), beautifyJs(fileContent), {
    encoding: 'utf-8'
  })
}

const schemaFiles = getSchemaFiles(path.join(__dirname, config.schemasDir))
const schemaInfo = getSchemaInfo(schemaFiles)
const schemaJSON = parseSchemas(schemaInfo)

console.log('开始生成代码.....')
rm(path.join(__dirname, '../src/base/'), function (err) {
  if (err) throw err

  fs.mkdirSync(path.join(__dirname, '../src/base/'))
  writeApi(schemaJSON)
  writeMock(schemaJSON)
  writeStore(schemaJSON, schemaInfo)
  writeMixin(schemaJSON, schemaInfo)
  writeIconData()
  console.log('代码生成完成！')
})

// console.log(schemaJSON)
