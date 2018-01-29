<template>
  <xdh-layout
    :fixed="true"
    class="app-layout"
    :west="{width:asideWidth}"
    :footer-in-main="true"
    :east="false">
    <top-header slot="north" :show-title="asideWidth==='250px'"></top-header>
    <div ref="main" class="app-layout__main" :class="classes">
      <nav-tabs :style="navTabsStyle"></nav-tabs>
      <div class="app-layout__content" ref="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <sidebar slot="west" :width.sync="asideWidth"></sidebar>
    <copyright slot="south"></copyright>
  </xdh-layout>
</template>


<script>
  import XdhLayout from '../../widgets/xdh-layout'
  import TopHeader from '../../components/system/top-header.vue'
  import Sidebar from '../../components/system/sidebar.vue'
  import Copyright from '../../components/system/copyright.vue'
  import NavTabs from '../../components/system/nav-tabs.vue'
  import { on, off } from 'element-ui/lib/utils/dom'
  import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'
  import Emitter from 'element-ui/lib/mixins/emitter'

  export default {
    componentName: 'Layout',
    components: {
      XdhLayout,
      TopHeader,
      Sidebar,
      Copyright,
      NavTabs
    },
    mixins: [Emitter],
    data () {
      return {
        asideWidth: '250px',
        tabsStoreName: 'systemTabs',
        scrollLeft: 0
      }
    },
    computed: {
      hasNavTabs () {
        return (this.$store.state[this.tabsStoreName] &&
          this.$store.state[this.tabsStoreName].list.length > 0)
      },
      classes () {
        return {
          'has-nav-tabs': this.hasNavTabs
        }
      },
      navTabsStyle () {
        return this.hasNavTabs ? {
          left: `${parseInt(this.asideWidth) - this.scrollLeft}px`,
          width: `calc(100% + ${this.scrollLeft}px)`
        } : null
      }
    },
    methods: {
      handleScroll () {
        this.scrollLeft = document.body.scrollLeft
        this.broadcast('ListPanel', 'layout-scroll', this.$refs.main.parentNode)
      },
      handleLayoutScroll (e) {
        this.broadcast('ListPanel', 'layout-scroll', e.target)
      },
      proxyLayoutResize () {
        this.broadcast('ListPanel', 'layout-resize', this.$refs.main.parentNode)
      }
    },
    created () {
      this.proxyScroll = this.handleScroll.bind(this)
      this.proxyLayoutScroll = this.handleLayoutScroll.bind(this)
      this.proxyLayoutResize = this.proxyLayoutResize.bind(this)
    },
    mounted () {
      const parentNode = this.$refs.main.parentNode
      on(window, 'scroll', this.proxyScroll)
      on(parentNode, 'scroll', this.proxyLayoutScroll)
      addResizeListener(parentNode, this.proxyLayoutResize)
    },
    beforeDestroy () {
      off(window, 'scroll', this.proxyScroll)
      off(this.$refs.main.parentNode, 'scroll', this.proxyLayoutScroll)
      removeResizeListener(this.$refs.main.parentNode, this.proxyLayoutResize)
    }
  }
</script>
