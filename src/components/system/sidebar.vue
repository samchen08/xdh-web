<template>
  <div class="sidebar">
    <div class="sidebar__toggle" @click="toggle">
      <div :class="icon">
        <i class="iconfont icon-collapsed"></i>
      </div>
    </div>
    <xdh-menu-toggle
      v-if="demoNav.menus"
      class="sidebar__nav"
      :data="demoNav.menus"
      :props="props"
      :router="false"
      :default-active="$route.path"
      @select="handleSelect"
      :collapse="collapsed"></xdh-menu-toggle>
  </div>
</template>


<script>
  import XdhMenuToggle from '../../widgets/xdh-menu-toggle'
  import navMixin from '../../base/mixin/demo-nav'

  const findItem = function (array, path) {
    let result = null
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i]
      if (item.path === path) {
        result = item
        break
      } else if (item.children && item.children.length > 0) {
        result = findItem(item.children, path)
        if (result) break
      }
    }
    return result
  }
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
        path: this.$route.path,
        props: {
          id: 'path',
          text: 'text',
          icon: 'icon',
          children: 'children',
          group: 'group',
          route: 'route'
        }
      }
    },
    watch: {
      collapsed (val) {
        this.$emit('update:width', val ? '65px' : '250px')
      }
    },
    computed: {
      icon () {
        return this.collapsed ? 'toggle--collapsed' : 'toggle--expand'
      }
    },
    methods: {
      toggle () {
        this.collapsed = !this.collapsed
      },
      handleSelect (index) {
        const item = findItem(this.demoNav.menus || [], index)
        if (item) {
          switch (item.type) {
            case 'window':
              const regex = /^(http|https):\/\//
              if (regex.test(item.path)) {
                window.open(item.path)
              } else {
                window.open(`${window.location.pathname}#${item.path}`)
              }
              break
            case 'iframe':
              this.$router.push({
                path: '/demo/frame',
                query: {
                  url: item.path
                }
              })
              break
            default:
              this.$router.push(item.path)
              break
          }
        }
      },
      findItem (path) {
      }
    },
    created () {
      this.getMenus()
    }
  }
</script>
