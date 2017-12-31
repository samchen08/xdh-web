<template>
  <el-container :class="{'xdh-layout':true, 'xdh-layout__fixed':fixed}">
    <el-header v-if="header" class="xdh-layout--header" :height="headerHeight">
      <slot name="header"></slot>
    </el-header>
    <el-container class="xdh-layout--wrapper">
      <el-aside v-if="aside" class="xdh-layout--aside" :width="asideWidth">
        <slot name="aside"></slot>
      </el-aside>
      <el-container>
        <el-main class="xdh-layout--main">
          <slot></slot>
        </el-main>
        <el-footer v-if="footer" class="xdh-layout--footer" :height="footerHeight">
          <slot name="footer"></slot>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'XdhLayout',
    props: {
      // 是否有头部
      header: {
        type: Boolean,
        default: true
      },
      // 是否有侧边栏
      aside: {
        type: Boolean,
        default: true
      },
      // 是否有底部
      footer: {
        type: Boolean,
        default: true
      },
      // 头部高度
      headerHeight: {
        type: String,
        default: '60px'
      },
      // 侧边栏宽度
      asideWidth: {
        type: String,
        default: '250px'
      },
      // 底部高度
      footerHeight: {
        type: String,
        default: '40px'
      },
      // 是否固定头部和底部
      fixed: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
