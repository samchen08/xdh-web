<template>
  <div class="xdh-title" :class="classes">
    <div class="xdh-title__wrapper">
      <div class="xdh-title__content">
        <i v-if="icon" :class="icon"></i>
        <slot name="title">{{title}}</slot>
      </div>
      <div class="xdh-title__tool">
        <slot name="tool"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'XdhTitle',
    props: {
      // 标题文字
      title: {
        type: String
      },
      // 是否显示底部边框线
      border: {
        type: Boolean,
        default: false
      },
      // 标题文字前的icon
      icon: {
        type: String
      },
      // 是否简洁模式
      simple: {
        type: Boolean,
        default: true
      },
      // 主题颜色
      theme: {
        type: String,
        default: 'primary',
        validator: function (val) {
          return ['primary', 'success', 'warning', 'danger', 'info'].includes(val)
        }
      }
    },
    computed: {
      classes () {
        return [{
          'is-border': this.border,
          'has-icon': !!this.icon,
          'has-body': !!this.$slots.default,
          'is-simple': this.simple
        }, `xdh-title--${this.theme}`]
      }
    }
  }
</script>
