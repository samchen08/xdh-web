<template>
  <div>
    <xdh-nav-tabs label="首页" name="/home" :closable="false"></xdh-nav-tabs>

    <xdh-image-picker :data="imageList" v-model="imageValue" size="small"></xdh-image-picker>
    <xdh-icon-picker :data="icons" v-model="iconValue" size="small"></xdh-icon-picker>
    <xdh-tree-select :data="treeData" v-model="treeValue" node-key="id" :showClearBtn="true">
      <div slot-scope="scope">
        <el-input :value="`已选中 ${scope.nodes.length} 个`" readonly
                  suffix-icon="el-icon-caret-bottom" size="small"></el-input>
        <!--<el-input :value="scope.nodes.map(n=>n.label).join(',')" readonly-->
        <!--suffix-icon="el-icon-caret-bottom"></el-input>-->
      </div>
    </xdh-tree-select>
    <xdh-nav-tabs label="首页33" name="/home" :closable="false" store="hello"></xdh-nav-tabs>
  </div>
</template>

<style type="text/scss" lang="scss" scoped>
  @import "../style/vars";

  .aside-collapse {
    width: 64px;
  }

  .sortable-chosen .el-card {
    background: #00ff00;
  }

  .sortable-ghost .el-card {
    background: #00ffff;
  }

  .xdh-droppable--enter {
    background: #b3e19d;
  }
</style>


<script>
  import treeMixin from '../base/mixin/tree'
  import XdhScroll from '../widgets/xdh-scroll'
  import XdhGrid from '../widgets/xdh-grid'
  import XdhLayout from '../widgets/xdh-layout'
  import XdhMenuToggle from '../widgets/xdh-menu-toggle'
  import XdhTreeTable from '../widgets/xdh-tree-table'
  import XdhTreeTableColumn from '../widgets/xdh-tree-table-column'
  import XdhTreeSelect from '../widgets/xdh-tree-select'
  import { listToTree } from '../utils/convert'
  //  import { log } from '../utils/consle'
  import Draggable from 'vuedraggable'
  import vDraggable from '../utils/directives/draggable'
  import resizable from '../utils/directives/resizable'
  import droppable from '../utils/directives/droppable'
  import XdhDropbox from '../widgets/xdh-dropbox'
  import XdhWindow from '../widgets/xdh-window'
  import XdhImagePicker from '../widgets/xdh-image-picker'
  import XdhIconPicker from '../widgets/xdh-icon-picker'
  import icons from '../helper/icons'
  import XdhAvatar from '../widgets/xdh-avatar'
  import XdhNavTabs from '../widgets/xdh-nav-tabs'

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
  const chartData = [
    {name: '衬衫1', value: 5},
    {name: '羊毛衫2', value: 25},
    {name: '雪纺衫3', value: 15},
    {name: '裤子4', value: 20},
    {name: '高跟鞋5', value: 10},
    {name: '高跟鞋6', value: 5}
  ]
  const images = ['事务安排', '人事统计', '人员管理', '修改密码', '关键项管理', '事务安排', '人事统计', '人员管理', '修改密码', '关键项管理', '事务安排', '人事统计', '人员管理', '修改密码', '关键项管理', '事务安排', '人事统计', '人员管理', '修改密码', '关键项管理', '事务安排', '人事统计', '人员管理', '修改密码', '关键项管理']
  export default {
    components: {
      XdhScroll,
      XdhLayout,
      XdhMenuToggle,
      XdhTreeTable,
      XdhTreeTableColumn,
      XdhTreeSelect,
      XdhGrid,
      Draggable,
      XdhDropbox,
      XdhWindow,
      XdhImagePicker,
      XdhIconPicker,
      XdhAvatar,
      XdhNavTabs
    },
    mixins: [treeMixin],
    directives: {
      draggable: vDraggable,
      resizable,
      droppable
    },
    data () {
      return {
        treeData: [],
        menus: [],
        collapse: false,
        asideWidth: '250px',
        chartData: [],
        chartData2: [{name: '7777', value: 5}],
        option: {
          color: ['#000'],
          title: {
            text: 'my title'
          }
        },
        testIndex: 2,
        testValue: 10,
        treeValue: [1],
        disabled: false,
        images: images,
        imageValue: '',
        icons: icons,
        iconValue: '',
        closed: false
      }
    },
    computed: {
      imageList () {
        return this.images.map(item => {
          return 'static/icons/' + item + '.png'
        })
      }
    },
    watch: {
      collapse (val) {
        this.asideWidth = val ? '65px' : '250px'
      },
      closed (val) {
        console.log('closed', val)
      }
    },
    methods: {
      handleClick () {
        console.log(arguments)
      },
      handleMove (e) {
//        console.log(e)
        return true
      }
    },
    created () {
      this.fetchTree().then(r => {
        this.treeData = listToTree(this.tree.list, null, 1)
//        console.log(this.treeData)
      })

      setTimeout(() => {
        this.menus = menuData
//        this.disabled = true
        this.chartData = chartData
        this.imageValue = 'static/icons/人事统计.png'
        this.iconValue = 'iconfont icon-user'
      }, 500)
    }
  }
</script>
