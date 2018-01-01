<template>
  <el-popover v-model="visible"
              placement="bottom"
              trigger="click"
              :width="popoverWidth"
              popper-class="xdh-tree-select__popover">
    <div class="xdh-tree-select__bd">
      <el-scrollbar>
        <el-tree
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
          :default-checked-keys="value"
          :filter-node-method="filterNodeMethod"
          :accordion="accordion"
          :indent="indent"
          ref="tree"></el-tree>
      </el-scrollbar>
      <select-footer
        :clear="showClearBtn"
        :submit="showOkBtn"
        @on-clear="clearChecked"
        @on-submit="handleSelected">
        <slot name="footer"></slot>
      </select-footer>
    </div>
    <div class="xdh-tree-select__reference" slot="reference" ref="reference">
      <slot :value="value" :nodes="currentCheckedNodes">
        <el-input :value="(value||[]).join(',')" readonly suffix-icon="el-icon-caret-bottom"></el-input>
      </slot>
    </div>
  </el-popover>
</template>


<script>
  import { Tree } from 'element-ui'
  import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'
  import throttle from 'lodash.throttle'
  import SelectFooter from './select-footer.vue'

  const treeProps = Object.assign({}, Tree.props)

  export default {
    name: 'XdhTreeSelect',
    components: {
      SelectFooter
    },
    props: {
      ...treeProps,

      // 重写默认显示checkbox
      showCheckbox: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number
      },
      value: {
        type: Array
      },
      showClearBtn: {
        type: Boolean,
        default: true
      },
      showOkBtn: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      data (val) {
        this.$nextTick(() => {
          let nodes = this.$refs.tree.getCheckedNodes()
          this.currentCheckedNodes = nodes
        })
      }
    },
    data () {
      return {
        popoverWidth: 'auto',
        visible: false,
        currentCheckedNodes: []
      }
    },
    methods: {
      setPopoverWidth () {
        let width = this.width ? this.width : this.$refs.reference.getBoundingClientRect().width - 25
        this.popoverWidth = width
      },
      clearChecked () {
        this.$refs.tree.setCheckedNodes([])
      },
      handleSelected () {
        let nodes = this.$refs.tree.getCheckedNodes()
        this.currentCheckedNodes = nodes
        this.visible = false
        this.$emit('on-selected', nodes)
        if (this.nodeKey) {
          let keys = nodes.map(node => node[this.nodeKey])
          this.$emit('input', keys)
        }
      }
    },
    created () {
      this.handleSetPopoverWidth = throttle(this.setPopoverWidth, 150, {leading: false})
    },
    mounted () {
      if (this.value) {
        let nodes = this.$refs.tree.getCheckedNodes()
        this.currentCheckedNodes = nodes
      }
      this.setPopoverWidth()
      addResizeListener(this.$refs.reference, this.handleSetPopoverWidth)
    },
    beforeDestroy () {
      removeResizeListener(this.$refs.reference, this.handleSetPopoverWidth)
    }
  }
</script>
