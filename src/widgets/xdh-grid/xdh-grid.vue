<template>
  <div ref="container"
       class="xdh-grid__container"
       :class="classes">
    <div class="xdh-grid__item"
         v-for="(item,index) in originalList"
         :data-id="index"
         :key="index"
         :style="styles(item)">
      <slot :index="index" :item="item" :props="props">{{index}}</slot>
    </div>
  </div>

</template>

<script>
  import Sortable from 'sortablejs'
  import { insertAfter } from '@/utils/dom'

  export default {
    name: 'XdhGrid',
    props: {
      // sortablejs 实例化参数选项
      sortable: {
        type: [Boolean, Object],
        default: false
      },
      // 列表数据
      list: {
        type: Array
      },
      // 列表数据，双向绑定，list 和 value 只能设置一个
      value: {
        type: Array
      },
      // 在添加前回调，如返回false，即阻止添加
      beforeAdd: {
        type: Function
      },
      // 列表项目数据字段映射
      props: {
        type: Object,
        default () {
          return {
            // 定义item在容器中的排列顺序，数值越小，排列越靠前， 默认值0
            order: 'order',

            // 定义在分配多余空间之前，item占据的主轴空间，浏览器器根据这个属性，计算主轴是否有多余空间
            basis: 'basis',

            // 定义item的放大比例
            grow: 'grow',

            // 定义item的缩小比例
            shrink: 'shrink',

            //  允许单个item有与其他item不一样的对齐方式， 设置值与align-items 一样
            align: 'align'
          }
        }
      },
      // 决定主轴得分方向，即item的排列方向
      direction: {
        type: String,
        validator (value) {
          return ['row', 'row-reverse', 'column', 'column-reverse'].includes(value)
        }
      },
      // 确定容器内item是否可换行
      wrap: {
        type: String,
        validator (value) {
          return ['nowrap', 'wrap', 'wrap-reverse'].includes(value)
        }
      },
      // 定义item在主轴的对齐方式
      justify: {
        type: String,
        validator (value) {
          return ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'].includes(value)
        }
      },
      // 定义item在交叉轴上的对其方式
      alignItems: {
        type: String,
        validator (value) {
          return ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'].includes(value)
        }
      },
      // 定义多根轴线的对齐方式，如果items只有一根轴线，该设置将不起作用
      alignContent: {
        type: String,
        validator (value) {
          return ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'].includes(value)
        }
      }
    },
    data () {
      return {
        sortInstance: null,
        currentValue: null
      }
    },
    watch: {
      originalList (val) {
        this.$refs.container.__list__ = val
      }
    },
    computed: {
      originalList () {
        return (this.list || this.value).slice(0)
      },
      sortOptions () {
        if (!this.sortable) {
          return null
        }
        return Object.assign({
          animation: 150
        }, this.sortable, {
          onUpdate: (e) => {
            this.sortValue(e.oldIndex, e.newIndex)
            this.$emit('on-update', e)
          },
          onAdd: (e) => {
            this.addValue(e.from.__list__, e.item, e.oldIndex, e.newIndex)
            this.$emit('on-add', e)
          },
          onRemove: (e) => {
            this.removeValue(e.item, e.oldIndex)
            this.$emit('on-remove', e)
          },
          onChoose: (e) => {
            this.$emit('on-choose', e)
          },
          onStart: (e) => {
            this.$emit('on-start', e)
          },
          onEnd: (e) => {
            this.$emit('on-end', e)
          },
          onSort: (e) => {
            this.$emit('on-sort', e)
          },
          onFilter: (e) => {
            this.$emit('on-filter', e)
          },
          onMove: (e) => {
            this.$emit('on-move', e)
          },
          onClone: (e) => {
            this.$emit('on-clone', e)
          }
        })
      },
      classes () {
        return {
          [`xdh-grid--direction-${this.direction}`]: !!this.direction,
          [`xdh-grid--wrap-${this.wrap}`]: !!this.wrap,
          [`xdh-grid--justify-${this.justify}`]: !!this.justify,
          [`xdh-grid--align-items-${this.alignItems}`]: !!this.alignItems,
          [`xdh-grid--align-content-${this.alignContent}`]: !!this.alignContent,
          'xdh-grid--sortable': !!this.sortOptions
        }
      }
    },
    methods: {
      styles (item) {
        let style = {}
        if (item[this.props.order]) {
          style.order = item[this.props.order]
        }
        if (item[this.props.basis]) {
          style['flex-basis'] = item[this.props.basis]
        }
        if (item[this.props.grow]) {
          style['flex-grow'] = item[this.props.grow]
        }
        if (item[this.props.shrink]) {
          style['flex-shrink'] = item[this.props.shrink]
        }
        if (item[this.props.align]) {
          style['align-self'] = item[this.props.align]
        }
        return style
      },
      resetOrder (list) {
        let order = list.map((n, index) => {
          return index.toString()
        })
        this.sortInstance && this.sortInstance.sort(order)
      },
      removeItem (item) {
        Array.from(this.$refs.container.children).forEach(el => {
          if (el === item) {
            this.$refs.container.removeChild(el)
          }
        })
      },
      addItem (item, index) {
        let nodes = this.$refs.container.children
        if (nodes.length > 0) {
          if (index > 0) {
            insertAfter(item, nodes[index - 1])
          } else {
            this.$refs.container.insertBefore(item, nodes[0])
          }
        } else {
          this.$refs.container.appendChild(item)
        }
      },
      sortValue (oldIndex, newIndex) {
        if (!this.value) return
        let list = this.currentValue || this.originalList.slice(0)
        let oldTemp = list[oldIndex]
        list.splice(oldIndex, 1)
        list.splice(newIndex, 0, oldTemp)
        this.currentValue = list
        this.resetOrder(list)
        this.$emit('input', list)
      },
      addValue (fromList, item, oldIndex, newIndex) {
        if (!this.value) return
        if (this.beforeAdd && this.beforeAdd(fromList, item, oldIndex, newIndex) === false) {
          return
        }
        let list = this.currentValue || this.originalList.slice(0)
        let newItem = fromList[oldIndex]
        list.splice(newIndex, 0, newItem)
        this.currentValue = list
        this.removeItem(item)
        this.$emit('input', list.slice())
      },
      removeValue (item, oldIndex) {
        if (!this.value) return
        if (this.sortOptions && this.sortOptions.group && this.sortOptions.group.pull === 'clone') {
          return
        }
        let list = this.currentValue || this.originalList.slice(0)
        list.splice(oldIndex, 1)
        this.currentValue = list
        this.addItem(item, oldIndex)
        this.$emit('input', list.slice())
      },
      initSortable () {
        this.sortInstance = new Sortable(this.$el, this.sortOptions)
      }
    },
    mounted () {
      this.sortOptions && this.initSortable()
    },
    beforeDestroy () {
      this.$refs.container.__list__ = null
      this.sortInstance && this.sortInstance.destroy()
    }
  }
</script>
