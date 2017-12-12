<template>
  <div class="xdh-echarts"></div>
</template>

<style scoped>
</style>

<script>
  import echarts from 'echarts'
  import charts from './charts'
  import loader from './map/loader'
  import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'

  export default {
    name: 'XdhEcharts',
    props: {
      option: {
        type: Object,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        validator: function (value) {
          return !!charts[value]
        }
      },
      data: [Object, Array],
      mapCode: {
        type: String
      }
    },
    data () {
      return {
        chart: null,
        chartOption: null
      }
    },
    watch: {
      chartOption (val) {
        if (this.chart) {
          this.chartOption ? this.chart.setOption(val) : this.chart.clear()
        }
      },
      loading (val) {
        val ? this.chart.showLoading() : this.chart.hideLoading()
      },
      option: {
        deep: true,
        handler: function () {
          this.data && this.optionRender(this.data).then(opt => {
            this.chartOption = opt
          })
        }
      },
      data (val) {
        val && this.optionRender(val).then(opt => {
          this.chartOption = opt
        })
      },
      type () {
        this.data && this.optionRender(this.data).then(opt => {
          this.chartOption = opt
        })
      }
    },
    methods: {
      resize () {
        this.chart && this.chart.resize()
      },
      registerMap () {
        let map = echarts.getMap(this.mapCode)
        if (map) {
          return Promise.resolve(map)
        } else {
          return loader(this.mapCode).then(json => {
            echarts.registerMap(this.mapCode, json)
            return json
          })
        }
      },
      optionRender () {
        return new Promise((resolve, reject) => {
          // 是否有设置图表类型
          if (this.type) {
            let promise = charts[this.type]
            promise().then(module => {
              resolve(module.default(this.data, this.option))
            })
          } else {
            // 无图表类型，默认采用option参数来创建图表
            resolve(this.option)
          }
        })
      }
    },
    mounted () {
      this.chart = echarts.init(this.$el)
      this.loading ? this.chart.showLoading() : this.chart.hideLoading()
      if (this.type && this.mapCode) {
        this.registerMap().then(res => {
          this.data && this.optionRender(this.data, this.option).then(opt => {
            this.chartOption = opt
          })
        })
      } else {
        this.data && this.optionRender(this.data, this.option).then(opt => {
          this.chartOption = opt
        })
      }
      addResizeListener(this.$el, this.resize)
      this.$emit('init', this.chart)
    },
    beforeDestroy () {
      removeResizeListener(this.$el, this.resize)
      this.chart && this.chart.dispose()
      this.$el.remove()
    }
  }
</script>
