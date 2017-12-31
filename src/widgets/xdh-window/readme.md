# xdh-window 窗体组件

用来做弹窗或容器展示内容


## 用法

```
<xdh-window
  title="标题"
  icon="iconfont icon-lock"
  :collapsible="true"
  :maximizable="true"
  :minimizable="true"
  :shadow="true"
  width="300px"
  height="200px"
  :inline="false">
  <div>
    <div>我是内容</div>
  </div>
</xdh-window>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| title | 标题文字, 为null时即不显示头部 | String | - | - |
| icon | 标题旁边的图标样式名称 | String | - | - |
| width | 窗体宽度 | String | - | auto |
| height | 窗体高度 | String | - | auto |
| left | 窗体左位置，inline为true是无效， left、top同时为null时，自动居中 | String | - | null |
| top | 窗体顶位置，inline为true是无效， left、top同时为null时，自动居中 | String | - | null |
| closable | 是否显示关闭按钮 | Boolean | - | true |
| collapsible | 是否显示折叠按钮 | Boolean | - | false |
| maximizable | 是否显示最大化按钮 | Boolean | - | false |
| minimizable | 是否显示最小化按钮 | Boolean | - | false |
| closed | 是否关闭状态，支持sync修饰符进行双向绑定 | Boolean | - | false |
| collapsed | 是否折叠收起状态，支持sync修饰符进行双向绑定 | Boolean | - | false |
| minimized | 是否最小化状态，支持sync修饰符进行双向绑定 | Boolean | - | false |
| maximized | 是否最大化状态，支持sync修饰符进行双向绑定 | Boolean | - | false |
| modal | 是否显示遮罩层，inline为true是无效 | Boolean | - | true |
| draggable | 窗体支持拖拽配置参数, 参数对象参考v-draggable | Boolean/Object | - | false |
| resizable | 窗体支持改变尺寸配置参数, 参数对象参考v-resizable | Boolean/Object | - | false |
| headerHeight | 头部高度 | String | - | 40px |
| footerHeight | 底部高度 | String | - | 60px |
| z-index | 窗体层级 | Number | - | 1000 |
| shadow | 是否显示窗体阴影 | Boolean | - | true |
| inline | 是否以内联方式显示 | Boolean | - | false |

## 插槽

| name | 说明 |
|-----|-----|
| - | 窗体内容 |
| title | 定义标题内容，设置了改插槽，参数title将无效 |
| tools | 定义操作按钮 |
| footer | 定义底部内容 |

## 方法
无

##  事件

| 事件名称 | 说明 | 回调参数 |
|-----|-----|----|
| on-collapsed | 折叠状态改变时触发 | collapsed： true 收起/false 展开|
| on-minimized | 最小化时触发 | - |
| on-maximized | 最大化状态改变时触发 | maximized： true 最大化/false 恢复默认 |
| on-closed | 关闭时触发 | - |
| on-start-drag | 开始拖拽时触发 | e：拖拽对象 |
| on-stop-drag | 停止拖拽时触发 | e：拖拽对象 |
| on-drag | 拖拽时触发 | e：拖拽对象 |
| on-start-resize | 开始改变尺寸时触发 | e：resize对象 |
| on-stop-resize | 停止改变尺寸时触发 | e：resize对象 |
| on-resize | 改变尺寸时触发 | e：resize对象 |

## 更新日志

- 2017-12-29 新建组件 (by: chenhuachun )





