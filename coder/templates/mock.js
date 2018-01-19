const _ = require('lodash')
module.exports = _.template(`
/*! create time: <%=new Date().toLocaleString()%> */
<% if(importApiArray.length>0){%>
// <%=importApiArray.join(', ')%>
import { <%=importApiArray.join(', ')%> } from '@/base/api/<%=kebabCaseName%>'
<%}%>
<%if(templateArray.length>0){%>
// <%=templateArray.join(', ')%>
import { <%=templateArray.join(', ')%>} from '@/mock/templates'
<%}%>
// Mock
export default [
<%_.each(mocks, function(item, i){%>
  <%if(i>0){%>,<%}%>
  <%if(item.methodType == 'fetch'){%>
    {
      title: '<%=item.URL%>',
      url: <%=item.URL%>,
      params: {
        <%=item.page%>: 1,
        <%=item.limit%>: 10
      },
     <%if(item.template){%>
        template: <%=item.template%> }
     <%} else {%>
        template: {
          <%=code%>: <%=codeValue%>,
          <%=data%>: {
            <%=item.page%>: '{{<%=item.page%>}}',
            <%=item.limit%>: '{{<%=item.limit%>}}',
            <%=item.total%>: 1000,
            '<%=item.list%>|{{<%=item.limit%>}}': [<%=item.columns%>]
          }
        }
      }
      
      <%}%>
  <%}%>
  
  <%if(item.methodType == 'update'){%>
    {
      title: '<%=item.URL%>',
      url: <%=item.URL%>,
      params: {},
     <%if(item.template){%>
        template: <%=item.template%>
     <%} else {%>
      template: {
        <%=code%>: <%=codeValue%>,
        <%=message%>: '更新成功',
        <%=data%>: <%=updateData%>
      }
      <%}%>
    }
  <%}%>
  
  <%if(item.methodType == 'get'){%>
    {
      title: '<%=item.URL%>',
      url: <%=item.URL%>,
      params: {},
     <%if(item.template){%>
        template: <%=item.template%>
     <%} else {%>
      template: {
        <%=code%>: <%=codeValue%>,
        <%=message%>: '',
        <%=data%>: <%=item.columns%>
      }
      <%}%>
    }
  <%}%>
  
  <%if(item.methodType == 'add'){%>
    {
      title: '<%=item.URL%>',
      url: <%=item.URL%>,
      params: {},
     <%if(item.template){%>
        template: <%=item.template%>
     <%} else {%>
      template: {
        <%=code%>: <%=codeValue%>,
        <%=message%>: '添加成功',
        <%=data%>: <%=addData%>
      }
      <%}%>
    }
  <%}%>
  
    <%if(item.methodType == 'remove'){%>
    {
      title: '<%=item.URL%>',
      url: <%=item.URL%>,
      params: {},
     <%if(item.template){%>
        template: <%=item.template%>
     <%} else {%>
      template: {
        <%=code%>: <%=codeValue%>,
        <%=message%>: '删除成功',
        <%=data%>: <%=removeData%>
      }
    <%}%>
    }
  <%}%>
  
  <%if(['fetch','get','update','remove','add'].indexOf(item.methodType)==-1){%>
    {
      title: '<%=item.URL%>',
      url: <%=item.URL%>,
      params: {},
     <%if(item.template){%>
        template: <%=item.template%>
    <%} else {%>
      template: {
        <%=code%>: <%=codeValue%>,
        <%=message%>: '',
        <%=data%>: <%=item.columns%>
      }
     <%}%>
    }
  <%}%>
  
  
<%})%>
]
`)
