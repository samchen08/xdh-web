<template>
  <div :class="prefixCls">
    <table-header :columns="columns" :width-array="headerWidthArray"></table-header>
    <el-tree
      class="xdh-tree-table__tree"
      :data="data"
      :empty-text="emptyText"
      :node-key="nodeKey"
      :props="props"
      :render-after-expand="renderAfterExpand"
      :load="load"
      :render-content="renderContent"
      :highlight-current="highlightCurrent"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :auto-expand-parent="autoExpandParent"
      :default-expanded-keys="defaultExpandedKeys"
      :show-checkbox="showCheckbox"
      :check-strictly="checkStrictly"
      :default-checked-keys="defaultCheckedKeys"
      :filter-node-method="filterNodeMethod"
      :accordion="accordion"
      :indent="indent"
      ref="tree"></el-tree>

    <div style="display: none;" :class="`${prefixCls}__hidden`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { Tree } from 'element-ui'
  import TableHeader from './components/table-header.vue'

  const BORDER_WIDTH = 1
  const ARROW_WIDTH = 24
  const CHECKBOX_WIDTH = 22
  const INDENT_DEFAULT = 16
  const EVENTS = ['node-click', 'check-change', 'current-change', 'node-expand', 'node-collapse']
  const treeProps = Object.assign({}, Tree.props)
  delete treeProps.renderContent

  export default {
    name: 'XdhTreeTable',
    components: {
      TableHeader
    },
    props: {
      ...treeProps
    },
    data () {
      return {
        prefixCls: 'xdh-tree-table',
        columns: []
      }
    },
    computed: {
      tree () {
        return this.$refs.tree
      },
      tableWidth () {
        // 判断是否有checkbox
        if (this.showCheckbox) {
          return `calc(100% - ${CHECKBOX_WIDTH + ARROW_WIDTH}px)`
        } else {
          return `calc(100% - ${ARROW_WIDTH}px)`
        }
      },
      headerWidthArray () {
        // 没有设置宽度的列总数
        const noWidthCount = this.columns.filter(n => !n.width).length
        // 已分配了多少像素宽度
        let assignedWidthPx = 0
        // 已分配了百分比宽度
        let assignedWidthPercent = 0
        // 计算已分配了多少宽度
        this.columns.forEach(n => {
          if (n.width) {
            if (typeof n.width === 'number' || n.width.includes('px')) {
              assignedWidthPx += (Number.parseInt(n.width) + BORDER_WIDTH)
            } else if (n.width.includes('%')) {
              assignedWidthPercent += (Number.parseInt(n.width) + BORDER_WIDTH)
            }
          }
        })
        // 是否有checkbox的偏移值
        let diff = CHECKBOX_WIDTH
        // 有checkbox，加上checkbox占用的宽度
        if (this.showCheckbox) {
          assignedWidthPx += (CHECKBOX_WIDTH + ARROW_WIDTH)
        } else {
          assignedWidthPx += ARROW_WIDTH
          diff = 0
        }
        // 计算每列应该展示的宽度
        return this.columns.map((column, index) => {
          // 有制定宽度
          if (column.width) {
            if (index === 0) {
              // 第一列需要加上箭头和checkbox占用的宽度
              return `calc(${column.width} + ${diff + ARROW_WIDTH}px)`
            } else {
              // 最后一列需要减去每列的边框线宽度
              if (index === this.columns.length - 1) {
                return `calc(${column.width} - ${this.columns.length}px)`
              } else {
                return `calc(${column.width})`
              }
            }
          } else {
            if (index === 0) {
              // 第一列需要加上箭头和checkbox占用的宽度
              return `calc((100% - ${assignedWidthPercent}% - ${(assignedWidthPx)}px) / ${noWidthCount} + ${diff + ARROW_WIDTH}px)`
            } else {
              if (index === this.columns.length - 1) {
                // 最后一列需要减去每列的边框线宽度
                return `calc((100% - ${assignedWidthPercent}% - ${(assignedWidthPx)}px) / ${noWidthCount} - ${this.columns.length}px)`
              } else {
                return `calc((100% - ${assignedWidthPercent}% - ${(assignedWidthPx)}px) / ${noWidthCount})`
              }
            }
          }
        })
      }
    },
    methods: {
      getColumnWidthArray (level) {
        // 没有设置宽度的列总数
        const noWidthCount = this.columns.filter(n => !n.width).length
        // 已分配了多少像素宽度
        let assignedWidthPx = 0
        // 已分配了百分比宽度
        let assignedWidthPercent = 0

        // 当前层级缩进的宽度
        let indent = (level - 1) * (this.indent || INDENT_DEFAULT)

        // 计算已分配了多少宽度
        this.columns.forEach(n => {
          if (n.width) {
            if (typeof n.width === 'number' || n.width.includes('px')) {
              assignedWidthPx += (Number.parseInt(n.width) + BORDER_WIDTH)
            } else if (n.width.includes('%')) {
              assignedWidthPercent += (Number.parseInt(n.width) + BORDER_WIDTH)
            }
          }
        })
        // 计算每列应该展示的宽度
        return this.columns.map((column, index) => {
          // 如果属性指定了宽度
          if (column.width) {
            // 第一列需要减去树层级缩进的宽度
            if (index === 0) {
              return `calc(${column.width} - ${indent}px )`
            } else {
              return column.width
            }
          } else {
            // 如果列没有制定宽度，没宽度的列平均分配剩余的宽度，第一列需要减去树层级缩进的宽度
            if (index === 0) {
              return `calc((100% - ${assignedWidthPercent}% - ${(assignedWidthPx - indent)}px) / ${noWidthCount} -  ${indent}px)`
            } else {
              return `calc((100% - ${assignedWidthPercent}% - ${(assignedWidthPx - indent)}px) / ${noWidthCount})`
            }
          }
        })
      },
      renderContent (h, {node}) {
        let widthArray = this.getColumnWidthArray(node.level)
        const columns = this.columns.map((column, index) => {
          return column.renderCell.call(this._renderProxy, h, {node}, widthArray[index])
        })
        return h('span', {
          'class': `${this.prefixCls}__tr`,
          style: {
            width: this.tableWidth
          }
        }, columns)
      },
      bindEvents () {
        EVENTS.forEach(name => {
          this.tree.$on(name, (data, node, vm) => {
            this.$emit(name, data, node, vm)
          })
        })
      }
    },
    mounted () {
      this.bindEvents()
    },
    beforeDestroy () {
      this.tree.$off(EVENTS)
    }
  }
</script>
