<template>
  <div>
    <xdh-nav-tabs label="测试" name="/test1" :closable="true"></xdh-nav-tabs>
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>

</template>

<style type="text/scss" lang="scss" scoped>
</style>

<script>
  import XdhNavTabs from '../widgets/xdh-nav-tabs'
  import VeHistogram from 'v-charts/lib/histogram'
  import VeLine from 'v-charts/lib/line'

  export default {
    components: {
      XdhNavTabs,
      VeHistogram,
      VeLine
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
//        yAxisType: 'value',
        axisVisible: true
      }
    }
  }
</script>
