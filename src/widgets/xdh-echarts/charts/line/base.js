import defaultsDeep from 'lodash/defaultsDeep'

const option = {
  title: {
    text: ''
  },
  tooltip: {},
  xAxis: {
    data: []
  },
  yAxis: {},
  series: [{
    type: 'line',
    data: []
  }]
}

export default function (data, options) {
  let xAxis = []
  let serieData = []
  data.forEach(item => {
    xAxis.push(item.name)
    serieData.push(item.value)
  })
  var result = defaultsDeep({
    xAxis: {
      data: xAxis
    },
    series: [{
      data: serieData
    }]
  }, options, option)
  return result
}
