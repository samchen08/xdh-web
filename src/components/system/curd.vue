<template>
  <div class="curd">
    <filter-panel v-if="filter"
                  :title="filterTitle"
                  :icon="filterIcon"
                  :collapsible="collapsible"
                  :collapsed="collapsed"
                  :filterHeaderHeight="filterHeaderHeight"
                  :filterFooterHeight="filterFooterHeight"
                  :model.sync="query"
                  @on-query="handleQuery"
                  @reset-expand-fields="handleResetExpandFields">
      <slot name="filter-tool" slot="tool"></slot>
      <slot name="filter-items"></slot>
      <slot name="filter-items-expand" slot="expand"></slot>
      <slot name="filter-footer" slot="footer"></slot>
    </filter-panel>
  </div>
</template>

<script>
  import FilterPanel from './filter-panel.vue'
  import ListPanel from './list-panel.vue'
  import ModelDialog from './model-dialog.vue'

  export default {
    components: {
      FilterPanel,
      ListPanel,
      ModelDialog
    },
    props: {
      filter: {
        type: Boolean,
        default: true
      },
      filterTitle: {
        type: String,
        default: '查询条件'
      },
      filterIcon: {
        type: String
      },
      // 能否折叠
      collapsible: {
        type: Boolean,
        default: false
      },
      // 是否折叠
      collapsed: {
        type: Boolean,
        default: true
      },
      // 头部标题栏目的高度
      filterHeaderHeight: {
        type: String,
        default: '36px'
      },
      // 底部的高度
      filterFooterHeight: {
        type: String,
        default: '40px'
      },
      query: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        filterModel: {...this.query}
      }
    },
    watch: {
      filterModel (val) {
        console.log('filterModel', val)
      }
    },
    methods: {
      handleResetExpandFields (fields) {
        console.log(this.filterModel)
      },
      handleQuery () {
//        console.log(this.query)
      }
    }
  }
</script>
