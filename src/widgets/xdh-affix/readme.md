# xdh-affix 图钉组件

使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。
注意，offset-top和offset-bottom只可以设置一个，如果都设置，会使用offset-top。

## 用法

```
<xdh-affix :offset-top="100">
  <span class="demo-affix">Fix the position at the top of 100px at the top</span>
</xdh-affix>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| offset-top | 距离窗口顶部达到指定偏移量后触发 | Number | -  | 0 |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | Number | - | - |

## 插槽

| name | 说明 |
|-----|-----|
| - | 定义需要固定的内容 |

## 方法

无

## 事件

| 事件名称 | 说明 | 回调参数 |
|----|----|----|
| change | 在固定状态发生改变时触发 | true/false |

## 更新日志

- 2017-11-05 新增 by：chenhuachun



