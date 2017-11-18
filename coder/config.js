module.exports = {
  // 架构配置文件目录
  schemasDir: './schemas/',

  // 模板文件目录
  templatesDir: './templates/',

  // api请求地址前缀
  pathPrefix: '',

  // api支持的请求方法
  methods: [
    'fetch', // 获取列表数据，响应数据含有分页信息，如：总数、当前页码、页大小
    'get', // 获取单条实体数据， 响应数据是对象形式
    'add', // 新增实体数据
    'update', // 更新实体数据
    'remove' // 删除实体
  ],

  // 数据请求类型对应http请求方法的映射
  methodTypeMap: {
    fetch: 'get',
    get: 'get',
    add: 'post',
    update: 'post',
    remove: 'get'
  },

  // 数据请求类型对应api地址的后缀映射
  methodSuffixMap: {
    fetch: '/list',
    get: '/info/:id',
    add: '/save',
    update: '/update',
    remove: '/delete/:id'
  },

  // store 或 mixin 状态保存列表的字段名称，和接口响应数据对应， 默认：list
  stateListName: 'list',

  // store 或 mixin 状态保存单个实体字段名称，默认：model
  stateModelName: 'model',

  // store 或 mixin 状态保当前页码的字段名称，和接口响应数据对应， 默认：page
  statePageName: 'page',

  // store 或 mixin 状态保存页大小的字段名称，和接口响应数据对应，默认：limit
  statePageSizeName: 'limit',

  // store 或 mixin 状态保存数据总条数字段名称，和接口响应数据对应，默认：total
  stateTotalName: 'total',

  // Mock响应数据字段名称，默认：data
  mockDataName: 'data',

  // Mock响应状态字段名称，默认：code
  mockCodeName: 'code',

  // Mock响应信息说明字段名称，默认：message
  mockMsgName: 'message',

  // Mock响应成功时的code值，默认：0
  successCodeValue: 0,

  // Mock新增接口响应mock信息
  addMockData: true,

  // Mock更新接口响应mock信息
  updateMockData: true,

  // Mock删除接口响应mock信息
  removeMockData: true,

  // iconfont css文件路径
  iconCssFile: '../src/assets/icons/iconfont.css',

  // 生成api文件路径
  outApiPath: '../src/base/api/',

  // 生成mock文件路径
  outMockPath: '../src/base/mock/',

  // 生成mock配置文件路径
  outMockConfig: '../src/mock/',

  // 生成store文件路径
  outStorePath: '../src/base/store/',

  // 生成store配置文件路径
  outStoreType: '../src/store/',

  // 生成mixin文件路径
  outMixinPath: '../src/base/mixin/',

  // 生成icon文件路径
  outIconFile: '../src/helper/icons.js'

}
