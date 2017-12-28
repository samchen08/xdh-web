<template>
  <xdh-layout :fixed="false" :aside-width="asideWidth" class="app-layout">
    <h1 slot="header">Header</h1>

    <div ref="main">

      <div v-draggable="{clone:true, disabled:disabled, group:'one'}"
           style="height: 50px; width: 50px; position: absolute; background: blue"></div>

      <xdh-dropbox accept="one" @on-drop="handleClick"
                   :put="['group1']"
                   style="height: 200px; width: 500px; border: 1px solid red; position: relative; top:80px; margin-bottom: 80px; ">
      </xdh-dropbox>


      <div class="box" ref="box" style="padding: 20px">

        <xdh-grid v-model="chartData" direction="column" wrap="wrap" justify="space-between"
                  @on-move="handleMove"
                  :sortable="{sort:false, animation: 150, group:{name:'group1', put:['group2'],pull:'clone'} }"
                  style="width: 300px;height: 200px;">
          <template slot-scope="scope">
            <el-card>
              {{scope.item.name}}
            </el-card>
          </template>
        </xdh-grid>

        <xdh-grid v-model="chartData2" direction="column" wrap="wrap" justify="space-between"
                  :sortable="{sort:true, animation: 150, group:{name:'group2', put:['group1']} }"
                  style="width: 300px;height: 200px; margin-top: 30px">
          <template slot-scope="scope">
            <el-card>
              {{scope.item.name}}
            </el-card>
          </template>
        </xdh-grid>


        <div style="padding: 20px">
          <p v-for="item in chartData">{{item.name}}</p>
        </div>


      </div>


      <xdh-window
        title="我的标题"
        icon="iconfont icon-lock"
        :collapsible="true"
        :maximizable="true"
        :minimizable="true"
        width="400px"
        height="200px">
        <div>
          <div>我是内容</div>
        </div>

      </xdh-window>

      <!--<div style="padding: 20px;">-->

      <!--<xdh-tree-table :data="treeData" :show-checkbox="true" @node-click="handleClick" highlight-current>-->
      <!--<xdh-tree-table-column prop="id" label="ID"></xdh-tree-table-column>-->
      <!--<xdh-tree-table-column prop="label" label="标签" width="120px">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.label}}-->
      <!--</template>-->
      <!--</xdh-tree-table-column>-->
      <!--<xdh-tree-table-column prop="id" label="ID" width="100px"></xdh-tree-table-column>-->
      <!--</xdh-tree-table>-->
      <!--</div>-->
      <!--<div style="padding: 20px">-->
      <!--<xdh-tree-select :data="treeData" node-key="id" v-model="treeValue" :width="300">-->
      <!--<template slot-scope="scope">-->
      <!--<el-input :value="scope.nodes.map(n=>n.label).join(',')" readonly-->
      <!--suffix-icon="el-icon-caret-bottom"></el-input>-->
      <!--</template>-->
      <!--</xdh-tree-select>-->
      <!--</div>-->


      <!--<div style="padding: 20px;">-->
      <!--<xdh-grid :list="chartData" direction="row" wrap="wrap" justify="space-between" align-items="stretch"-->
      <!--align-content="stretch"-->
      <!--:draggable="true"-->
      <!--style="border: 1px solid red; height: 300px;">-->
      <!--<template slot-scope="scope">-->
      <!--<el-card>{{scope.item.name}}-->
      <!--<el-button size="small" @click="chartData.splice(scope.index,1)">remove</el-button>-->
      <!--</el-card>-->
      <!--&lt;!&ndash;<div style="height: 100%; width: 100%;background: #ccc">{{scope.item.name}}</div>&ndash;&gt;-->
      <!--</template>-->
      <!--</xdh-grid>-->
      <!--</div>-->


      <!--<div style="padding: 20px">-->
      <!--<draggable :list="chartData" :options="{draggable:'.item'}">-->

      <!--<div v-for="(item,index) in chartData" :key="index" class="item">to:-->
      <!--<div>{{item.name}}-->
      <!--<el-button size="small" @click="chartData.splice(index,1)">remove</el-button>-->
      <!--</div>-->
      <!--</div>-->

      <!--</draggable>-->
      <!--</div>-->

    </div>
    <xdh-menu-toggle
      ref="aside"
      slot="aside"
      :data="menus"
      :collapse="collapse"></xdh-menu-toggle>
  </xdh-layout>
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
  import XdhEcharts from '../widgets/xdh-echarts'
  import XdhTreeSelect from '../widgets/xdh-tree-select'
  import { listToTree } from '../utils/convert'
  //  import { log } from '../utils/consle'
  import Draggable from 'vuedraggable'
  import vDraggable from '../utils/directives/draggable'
  import resizable from '../utils/directives/resizable'
  import droppable from '../utils/directives/droppable'
  import XdhDropbox from '../widgets/xdh-dropbox'
  import XdhWindow from '../widgets/xdh-window'

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
  export default {
    components: {
      XdhScroll,
      XdhLayout,
      XdhMenuToggle,
      XdhTreeTable,
      XdhTreeTableColumn,
      XdhEcharts,
      XdhTreeSelect,
      XdhGrid,
      Draggable,
      XdhDropbox,
      XdhWindow
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
        disabled: false
      }
    },
    watch: {
      collapse (val) {
        this.asideWidth = val ? '65px' : '250px'
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
      }, 500)
    }
  }
</script>
