<template>
  <el-row class="top-header">
    <el-col :span="10">
      <div class="top-header__logo">
        <img src="../../assets/logo.png">
      </div>
      <div class="top-header__title" v-show="showTitle">
        <span>系统管理后台</span>
      </div>
      <div class="top-header__nav" v-if="nav">
        <xdh-menu :data="nav" default-active="1" mode="horizontal"></xdh-menu>
      </div>
    </el-col>
    <el-col :span="14">
      <div class="top-header__tools">
        <search-input></search-input>
        <div class="tool-item">
          <el-dropdown>
            <div>
              <xdh-avatar :src="head">User</xdh-avatar>
              管理员
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息
                <el-badge :value="123"></el-badge>
              </el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="tool-item">
           <i class="el-icon-setting"></i>
        </div>
        <div class="tool-item">
          <i class="iconfont icon-play"></i>
        </div>
      </div>

    </el-col>
  </el-row>
</template>

<script>
  import XdhMenu from '../../widgets/xdh-menu'
  import XdhAvatar from '../../widgets/xdh-avatar'
  import SearchInput from './search-input.vue'

  const DEFAULT_HEAD = require('../../assets/images/head.jpg')
  export default {
    components: {
      XdhMenu,
      XdhAvatar,
      SearchInput
    },
    props: {
      showTitle: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        head: DEFAULT_HEAD,
        nav: [{
          id: '/home',
          icon: 'el-icon-upload',
          text: '云服务',
          group: null
        }]
      }
    }
  }
</script>
