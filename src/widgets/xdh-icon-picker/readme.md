# xdh-icon-picker 图片选择器

用于单选图片

## 用法

```
 <xdh-icon-picker :data="icons" v-model="iconValue" size="small"></xdh-icon-picker>
```

## 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| data | 图片src数组| Array | - | - |
| size | 选择器尺寸 | String | 'large', 'small', 'default' | default |
| width | 下拉框的宽度 | Number | - | 260 |
| value | 选中项的值 | String | - | - |
| showClearBtn | 是否显示清除按钮 | Boolean | - | true |
| showOkBtn | 是否显示确定按钮 | Boolean | - | true |

## 插槽
无

## 事件
无

## 更新日志

- 2018-01-01 新建组件 (by: chenhuachun )

