/*! build time: 2018-1-4 18:34:15 */
function fixIconfont(array) {
  return array.map(item => {
    return 'iconfont icon-' + item
  })
}
export default fixIconfont(['full', 'mini', 'mid', 'stop', 'play', 'copy', 'save', 'download', 'detail', 'reset', 'export', 'change', 'bar', 'location', 'line', 'lock', 'user', 'wait', 'undo'])
