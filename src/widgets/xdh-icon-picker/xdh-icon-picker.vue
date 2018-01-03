<template>
  <xdh-image-picker
    class="xdh-icon-picker"
    :data="data"
    :size="size"
    :width="width"
    v-model="currentValue"
    :showClearBtn="showClearBtn"
    :showOkBtn="showOkBtn"
  >
    <template slot-scope="scope">
      <i class="xdh-icon-picker__icon" :class="scope.item"></i>
    </template>
    <template slot="reference">
      <avatar v-if="currentValue" class="xdh-image-picker__value" :icon="currentValue" shape="square"
              :size="size"></avatar>
      <avatar v-else class="xdh-image-picker__empty" icon="el-icon-close" shape="square" :size="size"></avatar>
    </template>
  </xdh-image-picker>
</template>


<script>
  import XdhImagePicker from '../xdh-image-picker'
  import Avatar from '../xdh-avatar'

  export default {
    name: 'XdhIconPicker',
    components: {
      XdhImagePicker,
      Avatar
    },
    props: {
      ...XdhImagePicker.props
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    watch: {
      currentValue (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>
