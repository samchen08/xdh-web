<template>
  <xdh-panel class="list-panel"
             :title="title"
             :icon="icon"
             :header-height="headerHeight"
             :footer-height="footerHeight">
    <slot slot="tool" name="tool">
    </slot>
    <div class="list-panel__body">
      <loading v-show="loading"></loading>
      <slot :list="list" v-if="!loading"></slot>
    </div>
    <pager
      v-if="pager"
      slot="footer"
      ref="footer"
      class="list-panel__pager"
      :style="footerStyle"
      v-show="!loading"
      :total="total"
      :page="currentPage"
      :size="pageSize"
      :sizes="sizes"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"></pager>

  </xdh-panel>
</template>


<script>
  import Pager from './pager.vue'
  import XdhPanel from '@/widgets/xdh-panel'
  import Loading from './loading.vue'
  import Emitter from 'element-ui/lib/mixins/emitter'

  export default {
    componentName: 'ListPanel',
    components: {
      XdhPanel,
      Pager,
      Loading
    },
    mixins: [Emitter],
    props: {
      // 标题文字
      title: {
        type: String,
        default: '列表'
      },
      // 标题文字前面的图标样式名称
      icon: {
        type: String,
        default: 'el-icon-tickets'
      },
      // 分页每页显示记录条数
      size: {
        type: Number,
        default: 10
      },
      // 显示分页每页的记录数选项
      sizes: {
        type: Array,
        default () {
          return [10, 20, 50, 100]
        }
      },
      // 头部标题栏目的高度
      headerHeight: {
        type: String,
        default: '50px'
      },
      // 底部的高度
      footerHeight: {
        type: String,
        default: '40px'
      },
      // 列表的state, 必须包含 list 和 total 如：{total:0, list:[]}
      state: {
        type: Object,
        default () {
          return {
            total: 0,
            list: []
          }
        }
      },
      // store 属性映射
      stateProps: {
        type: Object,
        default () {
          return {
            total: 'total',
            list: 'list'
          }
        }
      },
      // 加载数据函数，传入参数：page，size，必须要返回Promise
      load: {
        type: Function,
        default: null
      },
      // 是否显示分页
      pager: {
        type: Boolean,
        default: true
      },
      // 是否固定底部
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentPage: 1,
        pageSize: this.size,
        loading: false,
        footerStyle: {},
        view: null
      }
    },
    computed: {
      list () {
        return this.state[this.stateProps.list] || []
      },
      total () {
        return this.state[this.stateProps.total] || 0
      }
    },
    methods: {
      loadData () {
        if (!this.load || this.loading) return
        this.loading = true
        this.load(this.currentPage, this.pageSize)
          .then(() => {
            this.loading = false
            this.proxyScroll(this.view)
          })
          .catch(() => {
            this.loading = false
            this.proxyScroll(this.view)
          })
      },
      handlePageChange (page) {
        this.currentPage = page
        this.loadData()
      },
      handleSizeChange (size) {
        this.currentPage = 1
        this.pageSize = size
        this.loadData()
      },
      reload () {
        this.currentPage = 1
        this.loadData()
      },
      handleScroll (target) {
        if (!target) return null
        this.view = target
        const viewRect = target.getBoundingClientRect()
        const footerHeight = parseInt(this.footerHeight)
        const elRect = this.$el.getBoundingClientRect()
        const top = viewRect.height + viewRect.top - footerHeight

        this.footerStyle = {
          top: `${top}px`,
          width: `${elRect.width - 22}px`,
          left: `${elRect.left + 1}px`,
          position: elRect.bottom - footerHeight <= top ? 'static' : 'fixed'
        }
      }
    },
    created () {
      this.proxyScroll = function (target) {
        this.$nextTick(() => {
          this.handleScroll(target)
        })
      }.bind(this)
      this.loadData()
    },
    mounted () {
      if (this.pager && this.fixed) {
        this.$on('layout-scroll', this.proxyScroll)
        this.$on('layout-resize', this.proxyScroll)
      }
    },
    activated () {
      if (this.pager && this.fixed) {
        this.proxyScroll(this.view)
      }
    }
  }
</script>
