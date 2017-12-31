<template>
  <transition name="el-fade-in">
    <div v-if="!currentClosed"
         v-show="!currentMinimized"
         class="xdh-window__wrapper"
         :class="wrapperClasses"
         :style="wrapperStyles">
      <div class="xdh-window__modal" v-if="modal && !inline"></div>
      <el-container class="xdh-window"
                    :class="classes"
                    :style="styles"
                    v-draggable="draggableOptions"
                    v-resizable="resizableOptions">
        <el-header class="xdh-window__header" :height="headerHeight" v-if="hasHeader">
          <div class="xdh-window__icon" v-if="icon"><i :class="`${icon}`"></i></div>
          <div class="xdh-window__title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="xdh-window__tools">
            <slot name="tools"></slot>
            <span class="xdh-window__tool" v-if="collapsible" @click="handleCollapsed">
            <i v-if="currentCollapsed" class="el-icon-caret-bottom"></i>
            <i v-else class="el-icon-caret-top"></i>
          </span>

            <span class="xdh-window__tool" v-if="minimizable" @click="handleMinimized"><i
              class="iconfont icon-mini"></i></span>

            <span class="xdh-window__tool" v-if="maximizable" @click="handleMaximized">
            <i v-if="currentMaximized" class="iconfont icon-mid"></i>
            <i v-else class="iconfont icon-full"></i>
          </span>

            <span class="xdh-window__tool" v-if="closable" @click="handleClosed"><i class="el-icon-close"></i></span>
          </div>
        </el-header>
        <el-main class="xdh-window__body">
          <slot></slot>
        </el-main>
        <el-footer class="xdh-window__footer" :height="footerHeight" v-if="$slots.footer">
          <slot name="footer"></slot>
        </el-footer>
      </el-container>
    </div>
  </transition>
</template>

<script>
  import draggable from '../../utils/directives/draggable'
  import resizable from '../../utils/directives/resizable'
  //    const prefixCls = 'xdh-window'
  export default {
    name: 'XdhWindow',
    directives: {
      draggable,
      resizable
    },
    props: {
      // 标题
      title: {
        type: String
      },
      // 标题图标
      icon: {
        type: String
      },
      // 宽度
      width: {
        type: [String, Number],
        default: 'auto'
      },
      // 高度
      height: {
        type: [String, Number],
        default: 'auto'
      },
      // 左位置
      left: {
        type: [String, Number],
        default: null
      },
      // 上位置
      top: {
        type: [String, Number],
        default: null
      },
      // 能否关闭
      closable: {
        type: Boolean,
        default: true
      },
      // 能否折叠
      collapsible: {
        type: Boolean,
        default: false
      },
      // 能否最大化
      maximizable: {
        type: Boolean,
        default: false
      },
      // 能否最小化
      minimizable: {
        type: Boolean,
        default: false
      },
      // 是否关闭
      closed: {
        type: Boolean,
        default: false
      },
      // 是否折叠
      collapsed: {
        type: Boolean,
        default: false
      },
      // 是否最小化
      minimized: {
        type: Boolean,
        default: false
      },
      // 是否最大化
      maximized: {
        type: Boolean,
        default: false
      },
      // 是否需要遮罩层
      modal: {
        type: Boolean,
        default: true
      },
      // 是否开启拖拽
      draggable: {
        type: [Boolean, Object],
        default: false
      },
      // 是否能改变尺寸
      resizable: {
        type: [Boolean, Object],
        default: false
      },
      // 头部高度
      headerHeight: {
        type: String,
        default: '40px'
      },
      // 底部高度
      footerHeight: {
        type: String,
        default: '60px'
      },
      // 层级
      zIndex: {
        type: Number,
        default: 1000
      },
      // 边框是否需要阴影
      shadow: {
        type: Boolean,
        default: true
      },
      // 是否以内联方式显示
      inline: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentCollapsed: this.collapsed,
        currentMinimized: this.minimized,
        currentMaximized: this.maximized,
        currentClosed: this.closed
      }
    },
    watch: {
      collapsed (val) {
        this.currentCollapsed = val
      },
      minimized (val) {
        this.currentMinimized = val
      },
      maximized (val) {
        this.currentMaximized = val
      },
      closed (val) {
        this.currentClosed = val
      }
    },
    computed: {
      hasHeader () {
        return this.title !== null
      },
      wrapperClasses () {
        return {
          'is-inline': this.inline
        }
      },
      wrapperStyles () {
        return {
          'z-index': this.zIndex,
          height: this.inline ? this.height : 'auto'
        }
      },
      classes () {
        return {
          'is-center': !this.inline && this.left === null && this.top === null,
          'is-minimized': this.currentMinimized,
          'is-maximized': this.currentMaximized,
          'is-collapsed': this.currentCollapsed,
          'is-shadow': this.shadow,
          'is-inline': this.inline
        }
      },
      styles () {
        let style = {}
        if (this.currentMaximized) {
          style = {
            left: 0,
            top: 0
          }
          if (this.currentCollapsed) {
            style.height = this.headerHeight
          }
          return style
        }
        style = {
          width: this.width,
          height: this.currentCollapsed ? this.headerHeight : this.height
        }
        if (this.left !== null) style.left = this.left
        if (this.top !== null) style.top = this.top
        return style
      },
      draggableOptions () {
        if (this.title === null || this.inline) {
          return false
        }
        return Object.assign({
          handle: '.xdh-window__header',
          onStartDrag: (e) => {
            this.$emit('on-start-drag', e)
          },
          onStopDrag: (e) => {
            this.$emit('on-stop-drag', e)
          },
          onDrag: (e) => {
            this.$emit('on-drag', e)
          }
        }, this.draggable)
      },
      resizableOptions () {
        return Object.assign({
          minWidth: 250,
          minHeight: 200,
          onStartResize: (e) => {
            this.$emit('on-start-resize', e)
          },
          onStopResize: (e) => {
            this.$emit('on-stop-resize', e)
          },
          onResize: (e) => {
            this.$emit('on-resize', e)
          }
        }, this.resizable)
      }
    },
    methods: {
      handleCollapsed () {
        this.currentCollapsed = !this.currentCollapsed
        this.$emit('update:collapsed', this.currentCollapsed)
        this.$emit('on-collapsed', this.currentCollapsed)
      },
      handleMinimized () {
        this.currentMinimized = true
        this.$emit('update:minimized', this.currentMinimized)
        this.$emit('on-minimized')
      },
      handleMaximized () {
        this.currentMaximized = !this.currentMaximized
        this.$emit('update:maximized', this.currentMaximized)
        this.$emit('on-maximized', this.currentMaximized)
      },
      handleClosed () {
        this.currentClosed = true
        this.$emit('update:closed', this.currentClosed)
        this.$emit('on-closed')
      }
    }
  }
</script>
