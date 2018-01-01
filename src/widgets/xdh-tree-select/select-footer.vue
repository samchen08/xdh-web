<template>
  <div class="xdh-select-footer">
    <slot></slot>
    <el-button v-if="clear" type="text" size="mini" @click="handleClear">清空</el-button>
    <el-button v-if="submit" size="mini" type="primary" @click="handleSubmit">确定</el-button>
  </div>
</template>

<script>
  export default {
    props: {
      clear: {
        type: Boolean,
        default: true
      },
      submit: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      handleClear () {
        this.$emit('on-clear')
      },
      handleSubmit () {
        this.$emit('on-submit')
      }
    }
  }
</script>
