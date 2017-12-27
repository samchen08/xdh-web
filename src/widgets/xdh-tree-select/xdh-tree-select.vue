<template>
  <el-popover v-model="visible" placement="bottom" trigger="click" :width="popoverWidth"
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
      <div class="xdh-tree-select__btns">
        <el-button type="text" size="mini" @click="clearChecked">清空</el-button>
        <el-button size="mini" type="primary" @click="handleSelected">确定</el-button>
      </div>
    </div>
    <div class="xdh-tree-select__reference" slot="reference" :style="{width:width+'px'}" ref="reference">
      <slot :value="value" :nodes="currentCheckedNodes">
        <el-input :value="value.join(',')" readonly suffix-icon="el-icon-caret-bottom"></el-input>
      </slot>
    </div>
  </el-popover>
</template>


<script>
  import { Tree } from 'element-ui'
  import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'
  import throttle from 'lodash.throttle'

  const treeProps = Object.assign({}, Tree.props)

  export default {
    name: 'XdhTreeSelect',
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
        let width = this.width ? this.width : this.$refs.reference.getBoundingClientRect().width
        this.popoverWidth = width - 25
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
