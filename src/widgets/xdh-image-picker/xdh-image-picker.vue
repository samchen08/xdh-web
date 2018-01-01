<template>
  <el-popover :width="width" v-model="visible">
    <div class="xdh-image-picker__bd">
      <el-scrollbar>
        <xdh-grid :list="data" wrap="wrap">
          <template slot-scope="scope">
            <span class="xdh-image-picker__item"
                  :class="{'is-selected':scope.item===selectedItem}"
                  @click="handleItemClick(scope.item, scope.index)">
              <slot :item="scope.item" :index="scope.index">
                <img :src="scope.item"/>
              </slot>
            </span>
          </template>
        </xdh-grid>
      </el-scrollbar>
      <select-footer
        :clear="showClearBtn"
        :submit="showOkBtn"
        @on-clear="clearSelected"
        @on-submit="handleSelected">
        <slot name="footer"></slot>
      </select-footer>
    </div>
    <div slot="reference" class="xdh-image-picker">
      <slot name="reference">
        <avatar v-if="value" class="xdh-image-picker__value" :src="value" shape="square" :size="size"></avatar>
        <avatar v-else class="xdh-image-picker__empty" icon="el-icon-close" shape="square" :size="size"></avatar>
      </slot>
    </div>
  </el-popover>

</template>

<script>
  import Avatar from '../xdh-avatar'
  import XdhScroll from '../xdh-scroll'
  import XdhGrid from '../xdh-grid'
  import SelectFooter from '../xdh-tree-select/select-footer.vue'

  export default {
    name: 'XdhImagePicker',
    components: {
      Avatar,
      XdhScroll,
      XdhGrid,
      SelectFooter
    },
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      size: {
        type: String,
        default: 'default',
        validator: function (val) {
          return ['large', 'small', 'default'].includes(val)
        }
      },
      width: {
        type: Number,
        default: 260
      },
      value: {
        type: String
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
    data () {
      return {
        selectedItem: this.value,
        visible: false
      }
    },
    computed: {
      selectedClass () {
        return this.selectedItem === this.value ? 'is-selected' : ''
      }
    },
    methods: {
      handleItemClick (item) {
        this.selectedItem = item
        this.$emit('click', item)
      },
      clearSelected () {
        this.selectedItem = null
        this.$emit('on-clear')
      },
      handleSelected () {
        this.visible = false
        this.$emit('input', this.selectedItem)
        this.$emit('on-ok', this.selectedItem)
      }
    }
  }
</script>
