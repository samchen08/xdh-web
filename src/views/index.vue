<template>
  <xdh-layout :fixed="false" :aside-width="asideWidth" class="app-layout">
    <h1 slot="header">Header</h1>

    <div ref="main">
    </div>
    <xdh-menu-toggle
      ref="aside"
      slot="aside"
      :data="menus"
      @change="handleChange"
      :collapse="collapse"></xdh-menu-toggle>
  </xdh-layout>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../style/vars";

  .aside-collapse {
    width: 64px;
  }

</style>


<script>
  import XdhLayout from '../widgets/xdh-layout'
  import XdhMenuToggle from '../widgets/xdh-menu-toggle'

  const menuData = [
    {
      id: 101,
      icon: 'el-icon-upload',
      text: '云服务',
      group: null
    }, {
      id: 1,
      icon: 'el-icon-upload',
      text: '云服务',
      group: null,
      children: [{
        id: 2,
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组一'
      }, {
        id: 3,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组一'
      }, {
        id: 4,
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组二'
      }, {
        id: 5,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组二'
      }]
    }, {
      id: 11,
      icon: 'el-icon-upload',
      text: '云服务二',
      group: null,
      children: [{
        id: 52,
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组一'
      }, {
        id: 53,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组一'
      }, {
        id: 54,
        icon: 'el-icon-upload',
        text: '选项一',
        group: '分组二'
      }, {
        id: 55,
        icon: 'el-icon-upload',
        text: '选项二',
        group: '分组二'
      }]
    }, {
      id: 121,
      icon: 'el-icon-upload',
      text: '云服务三',
      group: null
    }]

  export default {
    components: {
      XdhLayout,
      XdhMenuToggle
    },
    data () {
      return {
        menus: menuData,
        collapse: false,
        asideWidth: '250px'
      }
    },
    watch: {
      collapse (val) {
        this.asideWidth = val ? '65px' : '250px'
      }
    },
    methods: {},
    created () {
    }
  }
</script>
