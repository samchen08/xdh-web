# xdh-dropbox 可放置容器组件

用于放置接收v-draggable 或 xdh-gird 拖拽的元素

## 用法

```
<xdh-dropbox accept="one"
             @on-drop="handleDrop"
             :put="['group1']">
</xdh-dropbox>
```

## 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| accept | 可放置的v-draggable 分组名称 | String/Array | - | - |
|  put | 可放置的xdh-grid 的 sortable 分组名称 | Boolean/Array | - | - |
| enterClass | 拖拽元素进入放置区时的样式名称，只对v-draggable有效 | String | - | xdh-dropbox--enter |


## 事件
| 事件名称 | 说明 | 回调参数 |
|-----|-----|----|
| on-drop | 放置时触发 | e: v-draggable或sortable放置项 |
| on-enter | 拖拽元素进入放置区时触发，只对v-draggable有效 | e: v-draggable放置项 |
| on-leave | 拖拽元素离开放置区时触发，只对v-draggable有效 | e: v-draggable放置项 |

## 更新日志

- 2017-12-28 新建组件 (by: chenhuachun )
