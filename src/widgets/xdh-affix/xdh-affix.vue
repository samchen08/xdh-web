<template>
  <div>
    <div :class="classes" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { on, off } from 'element-ui/lib/utils/dom'
  import { getScroll, getOffset } from '../../utils/dom'

  const prefixCls = 'xdh-affix'
  export default {
    name: 'XdhAffix',
    props: {
      offsetTop: {
        type: Number,
        default: 0
      },
      offsetBottom: {
        type: Number
      }
    },
    data () {
      return {
        affix: false,
        styles: {}
      }
    },
    computed: {
      offsetType () {
        let type = 'top'
        if (this.offsetBottom >= 0) {
          type = 'bottom'
        }
        return type
      },
      classes () {
        return [
          {
            [`${prefixCls}`]: this.affix
          }
        ]
      }
    },
    mounted () {
      on(window, 'scroll', this.handleScroll)
      on(window, 'resize', this.handleScroll)
    },
    beforeDestroy () {
      off(window, 'scroll', this.handleScroll)
      off(window, 'resize', this.handleScroll)
    },
    methods: {
      handleScroll () {
        const affix = this.affix
        const scrollTop = getScroll(window, true)
        const elOffset = getOffset(this.$el)
        const windowHeight = window.innerHeight
        const elHeight = this.$el.getElementsByTagName('div')[0].offsetHeight

        // Fixed Top
        if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType === 'top' && !affix) {
          this.affix = true
          this.styles = {
            top: `${this.offsetTop}px`,
            left: `${elOffset.left}px`,
            width: `${this.$el.offsetWidth}px`
          }

          this.$emit('change', true)
        } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType === 'top' && affix) {
          this.affix = false
          this.styles = null

          this.$emit('change', false)
        }

        // Fixed Bottom
        if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType === 'bottom' && !affix) {
          this.affix = true
          this.styles = {
            bottom: `${this.offsetBottom}px`,
            left: `${elOffset.left}px`,
            width: `${this.$el.offsetWidth}px`
          }

          this.$emit('change', true)
        } else if ((elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType === 'bottom' && affix) {
          this.affix = false
          this.styles = null

          this.$emit('change', false)
        }
      }
    }
  }
</script>
