<template>
  <div class="xdh-echarts"></div>
</template>

<style scoped>
</style>

<script>
  import echarts from 'echarts'
  import { addResizeListener, removeResizeListener } from 'element-ui/lib/utils/resize-event'

  export default {
    name: 'XdhEcharts',
    props: {
      option: Object,
      loading: Boolean
    },
    data () {
      return {
        chart: null
      }
    },
    watch: {
      option (val) {
        if (this.chart) {
          this.option ? this.chart.setOption(val) : this.chart.clear()
        }
      },
      loading (val) {
        val ? this.chart.showLoading() : this.chart.hideLoading()
      }
    },
    methods: {
      resize () {
        this.chart && this.chart.resize()
      }
    },
    mounted () {
      this.chart = echarts.init(this.$el)
      this.option && this.chart.setOption(this.option)
      this.loading ? this.chart.showLoading() : this.chart.hideLoading()
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
