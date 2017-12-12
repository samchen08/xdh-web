# xdh-echarts 图表组件

封装简化ECharts调用

## 用法

```
 <xdh-echarts :option="option" type="line" :data="data" style="width: 100%; height: 300px;"></xdh-echarts>


  const chartData = [
    {name: '衬衫', value: 5},
    {name: '羊毛衫', value: 25},
    {name: '雪纺衫', value: 15},
    {name: '裤子', value: 20},
    {name: '高跟鞋', value: 10},
    {name: '高跟鞋', value: 5}
  ]


  option: {
          title: {
            text: 'my title'
          }
        }
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| option | echarts 配置项 | Object | - | null |
| type | 指定图表类型 | line/bar/pie/radar/map | - | null |
| data | 图表数据 | Array/Object | - | null |
| map-code | 地图文件编码 | String | - | - |
| loading| 是否显示loading效果 | Boolean | - | false |

## 方法
无

## 事件
无

## 更新日志

- 2017-11-12 新增 by：chenhuachun
