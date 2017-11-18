const _ = require('lodash')
module.exports = _.template(`
/*! create time: <%=new Date().toLocaleString()%> */
<%if(configKeys.length>0){%>
// <%=configKeys.join(', ')%>
import { <%=configKeys.join(', ')%>} from '@/config'
<%}%>

<%if(transforms.length>0){%>
// ajax
import ajax, { transformHandler } from '@/utils/ajax'

// transformer
import { <%=transforms.join(', ')%> } from '@/api/transformer'
<%}else{%>
// ajax
import ajax from '@/utils/ajax'
<%}%>

<%_.each(items, function(item, i){%>
/**
 * <%=item.URL%>
 * @type {string}
 */
export const <%=item.URL%> = <%if(item.prefix){%> <%=item.prefix%> + <%}%>'<%=item.url%>'

/**
 * <%=item.camelCaseName%>
 <%_.each(item.params, function(param){%> 
 * @param <%=param%>
 <%})%>
 * @param <%=item.ajaxParam%>
 * @returns {promise}
 */
export const <%=item.camelCaseName%> = function (

<%=item.params.join(', ')%>

<%if(item.params.length>0){%>,<%}%>

 <%=item.ajaxParam%>

) {
  return ajax({
        <%if(item.options){%>
          <%_.each(item.options, function(value, key){%>
              <%=key%>: <%if(typeof value=='string'){%> '<%=value%>' <%}else{%> <%=value%> <%}%>,
          <%})%>
        <%}%>
        
      <%if(item.params.length>0){%>
          params:{<%=item.params.join(', ')%>}, 
      <%}%>
      
      <%if(item.transform && item.transform.length>0){%>
          transformResponse: [transformHandler(<%=item.transform%>)],
      <%}%>
      
      <%=item.ajaxParam%>:<%=item.ajaxParam%>,
      
      
      url: <%=item.URL%>
  })
}
<%})%>
`)
