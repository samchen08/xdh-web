<template>
  <xdh-panel class="filter-panel"
             :title="title"
             :icon="icon"
             :header-height="headerHeight"
             :footer-height="footerHeight">
    <div slot="tool">
      <slot name="tool"></slot>
      <i v-if="collapsible" @click="toggleCollapsed" :class="toggleClass"></i>
    </div>
    <div @keyup.13="handleQuery">
      <el-form inline size="small" ref="filterForm">
        <slot></slot>
        <slot name="expand" v-if="!isShowCollapsed"></slot>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button native-type="reset" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="filter-panel__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>

  </xdh-panel>
</template>


<script>
  import XdhPanel from '@/widgets/xdh-panel'

  export default {
    components: {
      XdhPanel
    },
    props: {
      title: {
        type: String,
        default: '查询条件'
      },
      icon: {
        type: String,
        default: 'iconfont icon-filter'
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
      headerHeight: {
        type: String,
        default: '36px'
      },
      // 底部的高度
      footerHeight: {
        type: String,
        default: '40px'
      },
      // 查询模型对象， 支持sync修饰符
      model: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        isCollapsed: this.collapsed,
        defaultModel: {...this.model}
      }
    },
    computed: {
      toggleClass () {
        return {
          'el-icon-caret-bottom': this.isCollapsed,
          'el-icon-caret-top': !this.isCollapsed
        }
      },
      isShowCollapsed () {
        return this.collapsible && this.isCollapsed && this.$slots.expand
      }
    },
    methods: {
      toggleCollapsed () {
        this.isCollapsed = !this.isCollapsed
        this.$nextTick(() => {
          this.resetExpandFields()
          this.$emit('toggle', this.isCollapsed)
        })
      },
      handleQuery () {
        this.$emit('on-query', {...this.model})
      },
      handleReset () {
        this.$emit('update:model', {...this.defaultModel})
      },
      resetExpandFields () {
        if (!this.$slots.expand) return
        let model = {...this.model}
        let expandFields = []
        this.$slots.expand.forEach(vnode => {
          const propsData = vnode.componentOptions.propsData
          if (propsData && propsData.prop) {
            expandFields.push(propsData.prop)
            model[propsData.prop] = this.defaultModel[propsData.prop]
          }
        })
        expandFields.length > 0 && this.$emit('reset-expand-fields', expandFields)
        this.$emit('update:model', model)
      }
    }
  }
</script>
