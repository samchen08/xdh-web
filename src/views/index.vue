<template>
  <xdh-layout :fixed="false" :aside-width="asideWidth" class="app-layout">
    <h1 slot="header">Header</h1>

    <div ref="main">
      <div style="padding: 20px;">

        <xdh-tree-table :data="treeData" :show-checkbox="true" @node-click="handleClick" highlight-current>
          <xdh-tree-table-column prop="id" label="ID"></xdh-tree-table-column>
          <xdh-tree-table-column prop="label" label="标签" width="120px">
            <template slot-scope="scope">
              {{scope.label}}
            </template>
          </xdh-tree-table-column>
          <xdh-tree-table-column prop="id" label="ID" width="100px"></xdh-tree-table-column>
        </xdh-tree-table>
      </div>
      <div style="padding: 20px">
        <xdh-tree-select :data="treeData" node-key="id" v-model="treeValue" :width="300">
          <template slot-scope="scope">
            <el-input :value="scope.nodes.map(n=>n.label)" readonly  suffix-icon="el-icon-caret-bottom"></el-input>
          </template>
        </xdh-tree-select>
      </div>

      <xdh-echarts :option="option" type="line" :data="chartData" style="width: 100%; height: 300px;"></xdh-echarts>

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

</style>


<script>
  import XdhLayout from '../widgets/xdh-layout'
  import XdhMenuToggle from '../widgets/xdh-menu-toggle'
  import XdhTreeTable from '../widgets/xdh-tree-table'
  import XdhTreeTableColumn from '../widgets/xdh-tree-table-column'
  import XdhEcharts from '../widgets/xdh-echarts'
  import XdhTreeSelect from '../widgets/xdh-tree-select'
  import { log } from '../utils/consle'

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
    {name: '衬衫', value: 5},
    {name: '羊毛衫', value: 25},
    {name: '雪纺衫', value: 15},
    {name: '裤子', value: 20},
    {name: '高跟鞋', value: 10},
    {name: '高跟鞋', value: 5}
  ]

  const treeData = [
    {
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]

  export default {
    components: {
      XdhLayout,
      XdhMenuToggle,
      XdhTreeTable,
      XdhTreeTableColumn,
      XdhEcharts,
      XdhTreeSelect
    },
    data () {
      return {
        treeData: treeData,
        menus: menuData,
        collapse: false,
        asideWidth: '250px',
        chartData: chartData,
        option: {
          color: ['#000'],
          title: {
            text: 'my title'
          }
        },
        testIndex: 2,
        testValue: 10,
        treeValue: [5]
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
      }
    },
    created () {
      setTimeout(_ => {
//        this.option.title.text = 'dddd'
        this.chartData.push({
          name: '达到',
          value: 30
        })
      }, 5000)
      log('abc', arguments)
    }
  }
</script>
