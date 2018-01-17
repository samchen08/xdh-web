<template>
  <div class="sidebar">
    <div class="sidebar__toggle" @click="toggle"><i :class="icon"></i></div>
    <xdh-menu-toggle
      v-if="nav.menus"
      class="sidebar__nav"
      :data="nav.menus"
      :router="true"
      :default-active="$route.path"
      :collapse="collapsed"></xdh-menu-toggle>
  </div>
</template>


<script>
  import XdhMenuToggle from '../../widgets/xdh-menu-toggle'
  import navMixin from '../../base/mixin/nav'

  export default {
    mixins: [navMixin],
    components: {
      XdhMenuToggle
    },
    props: {
      width: {
        type: String,
        default: '250px'
      }
    },
    data () {
      return {
        collapsed: false,
        path: this.$route.path
      }
    },
    watch: {
      collapsed (val) {
        this.$emit('update:width', val ? '65px' : '250px')
      }
    },
    computed: {
      icon () {
        return this.collapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
      }
    },
    methods: {
      toggle () {
        this.collapsed = !this.collapsed
      }
    },
    created () {
      this.getMenus()
    }
  }
</script>
