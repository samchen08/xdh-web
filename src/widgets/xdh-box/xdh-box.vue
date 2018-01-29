<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'XdhBox',
    props: {
      theme: {
        type: String,
        default: 'info'
      }
    },
    computed: {
      classes () {
        return ['xdh-box', `xdh-box--${this.theme}`]
      }
    }
  }
</script>
