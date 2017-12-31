# xdh-layout 布局组件

用于后台管理系统上下、左右布局

## 用法

```
<xdh-layout fixed>
  <div slot="header">Header</div>
  <div slot="aside">Aside</div>
  <div slot="footer">Footer</div>
  <div>Main</div>
</xdh-layout>

```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|-----|----|----|----|
| header | 是否包含头部 | Boolean | - | true |
| aside | 是否包含侧边栏 | Boolean | - | true |
| footer | 是否包含底部 | Boolean | - | true |
| header-height | 头部高度 | String | - | 60px |
| footer-height | 底部高度 | String | - | 40px |
| aside-width | 侧边栏宽度 | String | - | 250px |
| fixed | 是否固定定位头部和底部 | Boolean | - | false |

## 插槽

| name | 说明 |
|-----|-----|
| header | 定义头部内容 |
| aside | 定义侧边栏内容 |
| footer | 定义底部内容 |
| - | 定义主体内容 |

## 方法

无

## 事件

无

## 更新日志

- 2017-11-04 新建组件 (by: chenhuachun )

