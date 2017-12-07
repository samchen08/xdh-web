<script>
  export default {
    props: {
      tree: Object
    },
    render (h) {
      return h('el-tree', {
        'class': 'xdh-tree-table__tree',
        ref: 'tree',
        props: {
          ...this.tree
        }
      })
    }
  }
</script>
