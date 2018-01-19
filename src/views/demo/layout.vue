<template>
  <xdh-layout
    :fixed="false"
    class="app-layout"
    :west="{width:asideWidth}"
    :footer-in-main="true"
    :east="false">
    <top-header slot="north"></top-header>
    <div class="app-layout__main" :class="classes">
      <nav-tabs></nav-tabs>
      <div class="app-layout__content">
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
  import XdhAffix from '../../widgets/xdh-affix'

  export default {
    components: {
      XdhLayout,
      TopHeader,
      Sidebar,
      Copyright,
      NavTabs,
      XdhAffix
    },
    data () {
      return {
        asideWidth: '250px',
        tabsStoreName: 'systemTabs'
      }
    },
    computed: {
      classes () {
        return {
          'has-nav-tabs': (this.$store.state[this.tabsStoreName] &&
            this.$store.state[this.tabsStoreName].list.length > 0)
        }
      }
    }
  }
</script>
