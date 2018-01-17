<template>
  <div>
    <xdh-nav-tabs label="测试" name="/test1" :closable="true"></xdh-nav-tabs>
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    <el-dialog
      v-draggable="{el:'.el-dialog',handle:'.el-dialog__header'}"
      title="提示"
      :visible.sync="dialogVisible"
      width="400px">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<style type="text/scss" lang="scss" scoped>
</style>

<script>
  import XdhNavTabs from '../widgets/xdh-nav-tabs'
  import VeHistogram from 'v-charts/lib/histogram'
  import VeLine from 'v-charts/lib/line'
  import Draggable from '../utils/directives/draggable'

  export default {
    components: {
      XdhNavTabs,
      VeHistogram,
      VeLine
    },
    directives: {
      Draggable
    },
    data () {
      return {
        dialogVisible: false
      }
    },
    created () {
      this.chartData = {
        columns: ['日期', '成本', '利润', '占比', '其他'],
        rows: [
          {'成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100},
          {'成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100},
          {'成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100},
          {'成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100}
        ]
      }
      this.chartSettings = {
        metrics: ['成本', '利润'],
        dimension: ['日期'],
        stack: {
          '单价': ['成本', '利润']
        },
        axisSite: {left: ['成本', '利润']},
        xAxisType: 'category',
        axisVisible: true
      }
    }
  }
</script>
