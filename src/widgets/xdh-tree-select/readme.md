# xdh-tree-select 下拉树选择器

在 el-tree 的基础上扩展的下拉树选择，组件参数与集成 el-tree。

## 用法

```
    <xdh-tree-table :data="treeData" :show-checkbox="true">
      <xdh-tree-table-column prop="id" label="ID" ></xdh-tree-table-column>
      <xdh-tree-table-column prop="label" label="标签" width="120px">
        <template slot-scope="scope">
          {{scope.label}}
        </template>
      </xdh-tree-table-column>
    </xdh-tree-table>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| data | 展示数据 | array| - | - |
| empty-text | 内容为空的时候展示的文本 | String | - | - |
| node-key | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | String | - | - |
| props | 配置选项，具体看下表 | object | - | - |
| load | 加载子树数据的方法 | function(node, resolve) | - | - |
| highlight-current | 是否高亮当前选中节点，默认值是 false。 | boolean | - | false |
| default-expand-all | 是否默认展开所有节点 | boolean | - | false |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 |boolean | - | true |
| auto-expand-parent | 展开子节点的时候是否自动展开父节点 | boolean | - | true |
| default-expanded-keys | 默认展开的节点的 key 的数组 | array | - | - |
| show-checkbox | 节点是否可被选择 | boolean | - | false |
| check-strictly | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false | boolean | - | false |
| default-checked-keys | 默认勾选的节点的 key 的数组 | array | - | - |
| filter-node-method | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | Function(value, data, node) | - | - |
| accordion | 是否每次只打开一个同级树节点展开 | boolean | - | false |
| indent | 相邻级节点间的水平缩进，单位为像素 | number | - | 16 |
| width | 下拉框的宽度 | number | - | - |
| value | 选中节点值 | Array | - | - |
| showClearBtn | 是否显示清空按钮 | Boolean | - | true |
| showOkBtn | 是否显示确定按钮 | Boolean | - | true |


## 插槽
| name | 说明 |
|-----|-----|
| - | 自定义选择器内容，作用域插槽，参数：value（选中的值数组），nodes（选中的节点数组） |
| footer | 定义下拉框底部内容 |


### props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| label | 指定节点标签为节点对象的某个属性值 | string, function(data, node) | - | - |
| children | 指定子树为节点对象的某个属性值 | string, function(data, node) | - | - |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值 | 	boolean, function(data, node) | - | - |
| isLeaf | 指定节点是否为叶子节点 | boolean, function(data, node) | - | - |



## 方法

无

## 事件

| 事件名称 | 说明 | 回调参数 |
|-----|-----|----|
| on-selected | 确定选择 | nodes: 选中的结点数组 |

## 更新日志

- 2017-11-07 新增 by：chenhuachun
