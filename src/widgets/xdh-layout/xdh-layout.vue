<template>
  <el-container :class="wrapperClasses">
    <el-header v-if="northOptions"
               class="xdh-layout__north"
               :height="northOptions.height"
               v-resizable="northOptions.resizable">
      <slot name="north"></slot>
    </el-header>

    <el-container class="xdh-layout__wrapper">
      <el-aside
        v-if="westOptions"
        class="xdh-layout__west"
        :width="westOptions.width"
        v-resizable="westOptions.resizable">
        <slot name="west"></slot>
      </el-aside>

      <el-main v-if="!footerInMain" class="xdh-layout__main">
        <slot></slot>
      </el-main>

      <el-container v-if="footerInMain">
        <el-main class="xdh-layout__main">
          <slot></slot>
        </el-main>
        <el-footer v-if="southOptions"
                   class="xdh-layout__south"
                   :height="southOptions.height"
                   v-resizable="southOptions.resizable">
          <slot name="south"></slot>
        </el-footer>
      </el-container>

      <el-aside
        v-if="eastOptions"
        class="xdh-layout__east"
        :width="eastOptions.width"
        v-resizable="eastOptions.resizable">
        <slot name="east"></slot>
      </el-aside>

    </el-container>

    <el-footer v-if="!footerInMain && southOptions"
               class="xdh-layout__south"
               :height="southOptions.height"
               v-resizable="southOptions.resizable">
      <slot name="south"></slot>
    </el-footer>

  </el-container>
</template>

<script>
  import Resizable from '../../utils/directives/resizable'

  export default {
    name: 'XdhLayout',
    directives: {
      Resizable
    },
    props: {
      // header 配置
      north: {
        type: [Boolean, Object],
        default: true
      },
      // footer 配置
      south: {
        type: [Boolean, Object],
        default: true
      },
      // 左aside配置
      west: {
        type: [Boolean, Object],
        default: true
      },
      // 右aside配置
      east: {
        type: [Boolean, Object],
        default: true
      },
      // footer是否放到main里面
      footerInMain: {
        type: Boolean,
        default: false
      },
      // 是否固定头部和底部
      fixed: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      northOptions () {
        return this.north
          ? {resizable: this.north.resizable ? {handles: 's'} : false, height: '60px', ...this.north}
          : false
      },
      southOptions () {
        return this.south
          ? {resizable: this.south.resizable ? {handles: 'n'} : false, height: '40px', ...this.south}
          : false
      },
      westOptions () {
        return this.west
          ? {resizable: this.west.resizable ? {handles: 'e'} : false, width: '30%', ...this.west}
          : false
      },
      eastOptions () {
        return this.east
          ? {resizable: this.east.resizable ? {handles: 'w'} : false, width: '30%', ...this.east}
          : false
      },
      wrapperClasses () {
        return {
          'xdh-layout': true,
          'xdh-layout--fixed': this.fixed
        }
      }
    }
  }
</script>
