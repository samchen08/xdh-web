<template>
  <div class="pager" v-if="total>0">
    <el-pagination
      :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="sizes"
      :page-size="size"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      sizes: {
        type: Array,
        default () {
          return [10, 20, 50, 100]
        }
      },
      layout: {
        type: String,
        default: 'total,sizes, ->, prev, pager, next, jumper'
      },
      size: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      },
      page: {
        type: Number,
        default: 1
      }
    },
    methods: {
      handleSizeChange (val) {
        this.$emit('size-change', val)
      },
      handleCurrentChange (val) {
        this.$emit('current-change', val)
      }
    }
  }
</script>
