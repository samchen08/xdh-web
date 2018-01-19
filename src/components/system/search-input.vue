<template>
  <div class="tool-search" @mouseleave="handleLeave" @keyup.13="handleSubmit">
    <transition name="slide-right" mode="out-in">
      <el-input v-model="value" ref="input" v-show="showInput" size="small" suffix-icon="el-icon-search"></el-input>
    </transition>
    <transition name="el-fade-in" mode="out-in">
      <div v-show="!showInput" class="tool-search__icon" @mouseenter="handleEnter"><i class="el-icon-search"></i></div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showInput: false,
        value: ''
      }
    },
    methods: {
      handleEnter () {
        this.showInput = true
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      },
      handleLeave () {
        if (!this.value) {
          this.showInput = false
        }
      },
      handleSubmit () {
        this.$emit('search', this.value)
      }
    }
  }
</script>
