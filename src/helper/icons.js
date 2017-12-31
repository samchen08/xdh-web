/*! build time: 2017-12-31 13:11:20 */
function fixIconfont(array) {
  return array.map(item => {
    return 'iconfont icon-' + item
  })
}
export default fixIconfont(['full', 'mini', 'mid', 'stop', 'play', 'copy', 'save', 'download', 'detail', 'reset', 'export', 'change', 'bar', 'location', 'line', 'lock', 'user', 'wait', 'undo'])
