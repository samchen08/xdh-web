<template>
  <div :class="`${prefixCls}__header`">
    <span v-for="(item,index) in columns" :class="`${prefixCls}__th`" :style="{width:`${widthArray[index]}`}">
      <span>{{item.label}}</span>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'XdhTreeTableHeader',
    props: {
      columns: Array,
      widthArray: Array
    },
    data () {
      return {
        prefixCls: 'xdh-tree-table'
      }
    }
  }
</script>
