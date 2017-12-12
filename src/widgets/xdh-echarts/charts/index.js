function async (path) {
  return function () {
    return import(`@/widgets/xdh-echarts/charts/${path}`)
  }
}

export default {
  line: async('line/base')
}
