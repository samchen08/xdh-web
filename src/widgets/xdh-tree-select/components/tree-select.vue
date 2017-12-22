<script>
  export default {
    props: {
      tree: Object
    },
    render (h) {
      return h('el-tree', {
        ref: 'tree',
        props: {
          ...this.tree
        }
      })
    }
  }
</script>
