# xdh-avatar 头像组件

用来代表用户或事物，支持图片、图标或字符展示。

- 头像有三种尺寸，两种形状可选。
- 支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。
- 对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。

## 用法

```
<xdh-avatar>U</xdh-avatar>
<xdh-avatar icon="el-icon-delete"></xdh-avatar>
<xdh-avatar :src="image"></xdh-avatar>
<xdh-avatar size="large">H</xdh-avatar>
<xdh-avatar size="small">H</xdh-avatar>
<xdh-avatar size="large" shape="square">H</xdh-avatar>
<xdh-avatar size="large" shape="square" :src="image"></xdh-avatar>
```

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|----|----|----|----|----|
| shape | 指定头像的形状，可选值为 circle、square | String | circle/square  | circle |
| size | 设置头像的大小，可选值为 large、small、default | String | large/small/default | default |
| src | 图片类头像的资源地址 | String | - | -|
| icon | 设置头像的图标样式名 | String | - | - |

## 方法

无

## 事件

无

## 更新日志

- 2017-11-05 新增 by：chenhuachun



