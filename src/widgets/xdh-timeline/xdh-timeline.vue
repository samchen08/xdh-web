<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
  const prefixCls = 'xdh-timeline'

  export default {
    name: 'XdhTimeline',
    props: {
      pending: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-pending`]: this.pending
          }
        ]
      }
    }
  }
</script>
