<template>
  <xdh-layout :fixed="false" :aside-width="asideWidth" class="app-layout">
    <h1 slot="header">Header</h1>
    <div ref="main" style="padding: 10px">
      <router-view></router-view>
    </div>
    <div slot="aside" style="height: 100%">
      <div class="collapse-btn" @click="toggle"><i :class="icon"></i></div>
      <xdh-menu-toggle
        :data="menus"
        :router="true"
        :default-active="$route.path"
        :collapse="collapsed"></xdh-menu-toggle>
    </div>

  </xdh-layout>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../style/vars";

  .collapse-btn {
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 20px;
    padding: 5px 0;
    background: $--color-primary-light-8;
    cursor: pointer;
    color: $--color-primary-light-1;
    &:hover {
      background: $--color-primary-light-9;
    }
  }
</style>

<script>
  import XdhLayout from '../widgets/xdh-layout'
  import XdhMenuToggle from '../widgets/xdh-menu-toggle'

  const menuData = [
    {
      id: '/home',
      icon: 'el-icon-upload',
      text: '云服务',
      group: null
    }, {
      id: '/test1',
      icon: 'iconfont icon-play',
      text: '云服务',
      group: null,
      children: [{
        id: '/test1',
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
        collapsed: false,
        path: this.$route.path
      }
    },
    computed: {
      icon () {
        return this.collapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
      },
      asideWidth () {
        return this.collapsed ? '65px' : '250px'
      }
    },
    methods: {
      toggle () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>
