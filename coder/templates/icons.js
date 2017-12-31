const _ = require('lodash')

module.exports = _.template(`
/*! build time: <%=new Date().toLocaleString()%> */

function fixIconfont (array) {
  return array.map(item => {
    return 'iconfont icon-' + item
  })
}
export default fixIconfont(<%=items%>)
`)
