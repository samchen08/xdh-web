# xdh-timeline 时间轴组件

对一系列信息进行时间排序时，垂直地展示。

## 用法

```
    <xdh-timeline>
        <xdh-timeline-item color="green">发布1.0版本</xdh-timeline-item>
        <xdh-timeline-item color="green">发布2.0版本</xdh-timeline-item>
        <xdh-timeline-item color="red">严重故障</xdh-timeline-item>
        <xdh-timeline-item color="blue">发布3.0版本</xdh-timeline-item>
    </xdh-timeline
```

## xdh-timeline 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| pending | 指定是否最后一个节点为幽灵节点 | Boolean | - | false |

## xdh-timeline-item 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| color | 圆圈颜色，可选值为blue、red、green，或自定义色值 | String | - | blue |

## xdh-timeline-item 插槽

| name | 说明 |
|-----|-----|
| dot | 自定义时间轴点内容 |
| - | 基本内容 |

## 方法

无

## 事件

无

## 更新日志

- 2017-11-06 新增 by：chenhuachun
