<template>
  <div class="xdh-menu-toggle" :class="{'is-collapse': collapse}">
    <el-scrollbar class="xdh-menu-toggle--expand">
      <xdh-menu :data="data"
                :props="props"
                :collapse="false"
                :backgroundColor="backgroundColor"
                :textColor="textColor"
                :activeTextColor="activeTextColor"
                :defaultActive="currentIndex"
                :defaultOpeneds="defaultOpeneds"
                :uniqueOpened="uniqueOpened"
                :menuTrigger="menuTrigger"
                :router="router"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"></xdh-menu>
    </el-scrollbar>

    <xdh-menu :data="data"
              class="xdh-menu-toggle--collapse"
              :props="props"
              :collapse="true"
              :backgroundColor="backgroundColor"
              :textColor="textColor"
              :activeTextColor="activeTextColor"
              :defaultActive="currentIndex"
              :defaultOpeneds="defaultOpeneds"
              :uniqueOpened="uniqueOpened"
              :menuTrigger="menuTrigger"
              :router="router"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect"></xdh-menu>

  </div>
</template>

<script>
  import XdhMenu from '../xdh-menu/xdh-menu.vue'

  export default {
    name: 'XdhMenuToggle',
    components: {
      XdhMenu
    },
    props: {
      // 菜单数据
      data: {
        type: Array,
        default () {
          return []
        }
      },
      // 数据字段名称映射
      props: {
        type: Object,
        default () {
          return {
            id: 'id',
            text: 'text',
            icon: 'icon',
            children: 'children',
            group: 'group'
          }
        }
      },
      // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
      collapse: Boolean,

      // 菜单的背景色（仅支持 hex 格式）
      backgroundColor: String,

      // 菜单的文字颜色（仅支持 hex 格式）
      textColor: String,

      // 当前激活菜单的文字颜色（仅支持 hex 格式）
      activeTextColor: String,

      // 当前激活菜单的 index
      defaultActive: String,

      // 当前打开的sub-menu的 key 数组
      defaultOpeneds: Array,

      // 是否只保持一个子菜单的展开
      uniqueOpened: Boolean,

      // 子菜单打开的触发方式(只在 mode 为 horizontal 时有效)
      menuTrigger: String,

      // 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
      router: Boolean
    },
    data () {
      return {
        currentIndex: this.defaultActive
      }
    },
    watch: {
      collapse (val) {
        this.$emit('change', val)
      }
    },
    methods: {
      handleSelect (index, indexPath) {
        this.currentIndex = index
        this.$emit('select', index, indexPath)
      },
      handleOpen (index, indexPath) {
        this.$emit('open', index, indexPath)
      },
      handleClose (index, indexPath) {
        this.$emit('close', index, indexPath)
      }
    }
  }
</script>
