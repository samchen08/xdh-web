<template>
  <xdh-layout :fixed="false" :aside-width="asideWidth" class="app-layout">
    <top-header slot="header"></top-header>
    <div ref="main" class="app-main">
      <router-view></router-view>
    </div>
    <sidebar slot="aside" :width.sync="asideWidth"></sidebar>
    <copyright slot="footer"></copyright>
  </xdh-layout>
</template>


<script>
  import XdhLayout from '../widgets/xdh-layout'
  import TopHeader from '../components/system/top-header.vue'
  import Sidebar from '../components/system/sidebar.vue'
  import Copyright from '../components/system/copyright.vue'

  export default {
    components: {
      XdhLayout,
      TopHeader,
      Sidebar,
      Copyright
    },
    data () {
      return {
        asideWidth: '250px'
      }
    }
  }
</script>
