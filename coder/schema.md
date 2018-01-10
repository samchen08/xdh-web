# Schema 配置说明

在schemas文件夹下新建js文件， 一个实体用一个文件表示。 可以再建文件夹细分。 文件格式如下：

```
module.exports = {
  vuex: true, // 是否生成store，如果设置false，不生成store，只会生成mixin
  model: {
    path: '/api/users', // 接口地址路径，必须
    prefix: '', // 接口地址前缀，可选，默认为空, 名称必须要在 src/config.js中定义，否则报错
    methods: ['fetch', 'get', 'add', 'update', 'remove'], // 生成请求方法，默认全部，如需要自定义，设置为false
    transform: 'userMap' // 响应数据转换函数，可选，函数名称必须要在 src/api/transformer.js 中定义，否则会报错
    options: {}, // ajax 参数选项，可选
    name:'', // 自定义方法名称，methods为false，必须要设置
    columns: {}, // 模拟数据字段mock模板，可选
    template: '' // Mock自定义模板函数名称, 名称必须在/src/mock/templates.js中能找到，设置了该值，columns将失效
    method: 'fetch', //自定义方法按那种方式生成store或mixin，可选， 在 methods为false时有效
    state: '' // 定义状态保存的名称，methods为false时并且method为空时，必须要设置state 和 name
  }
}
```
