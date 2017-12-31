# xdh-menu 导航菜单组件

在el-menu组件基础上扩展支持传递数据动态生成菜单项，使用方法与el-menu一样，增加了data 和 props 参数

## 用法
```
<xdh-menu :data="data"></xdh-menu>

data: [{
           id: 101,
           icon: 'el-icon-upload',
           text: '云服务',
           group: null,
           children: []
         }]

```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|-----|----|----|----|
| data | 菜单数据，数据项对象字段包含 id, icon, text, group, children。 可通过props属性配置 | Array | - | - |
| props | 菜单数据项的字段映射 | Object | - | { id: 'id', text: 'text', icon: 'icon', children: 'children', group: 'group' } |
| mode | 模式 | string | horizontal / vertical | vertical |
| collapse | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）| boolean | - | false |
| background-color | 菜单的背景色（仅支持 hex 格式）| string | - | #ffffff |
| text-color | 菜单的文字颜色（仅支持 hex 格式）| string | - | #2d2f33 |
| active-text-color | 当前激活菜单的文字颜色（仅支持 hex 格式） | string | - | #409EFF |
| default-active | 当前激活菜单的 index | string | - | - |
| default-openeds | 当前打开的sub-menu的 key 数组 | Array | - | - |
| unique-opened | 是否只保持一个子菜单的展开 | boolean | - | false |
| menu-trigger | 子菜单打开的触发方式(只在 mode 为 horizontal 时有效) | string | - | hover |
| router | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean | - | false |

### data 对象说明

| 字段名称 | 说明 | 类型 |
|-----|-----|----|
| id | 数据项的标识，必须要唯一 | String/Number |
| icon | 菜单图标的样式名称 | String |
| text | 菜单的名称| String |
| group | 分组名称，相同分组名称的菜在同一个分组展示  | String |
| children | 子菜单 | Array |


# 插槽

无

## 方法

| 方法名称 | 说明 | 参数 |
|-----|-----|----|
| open | 展开指定的 sub-menu | 	index: 需要打开的 sub-menu 的 index |
| close | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

## 事件

| 事件名称 | 说明 | 回调参数 |
|-----|-----|----|
| select | 菜单激活回调 | index: 选中菜单项的 indexPath: 选中菜单项的 index path |
| open | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path |
| close | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path |

## 更新日志

- 2017-11-04 新建组件 (by: chenhuachun )
