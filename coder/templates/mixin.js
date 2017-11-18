const _ = require('lodash')
module.exports = _.template(`
/*! build time: <%=new Date().toLocaleString()%> */
// <%=importApiArray.join(', ')%>
import { <%=importApiArray.join(', ')%> } from '@/base/api/<%=name%>'
// mixin
export default {
  data() {
   return {
      <%=name%>: {
       <%_.each(customStateArray, function(state){ %>
          <%=state%>: null,
       <%})%>
        <%=list%>: [],
        <%=page%>: null,
        <%=limit%>: null,
        <%=total%>: 0,
        <%=model%>: null
      }
    }
  },
  methods: {
  
    <%_.each(items, function(item, i){%>
      <%if(i>0){%>,<%}%>
      
      <%if(item.methodType == 'fetch'){%>
         <%=item.name%>(
          <%_.each(item.params, function(param){%>
            <%=param%>,
          <%})%>
           <%=item.ajaxParam%>
         ) {
            return <%=item.name%>(
                <%_.each(item.params, function(param){%>
                   <%=param%>,
                <%})%>
                 <%=item.ajaxParam%>
            ).then(res => {
              this.<%=name%>.<%=list%> = res.<%=list%>
              this.<%=name%>.<%=page%> = Number.parseInt(res.<%=page%>)
              this.<%=name%>.<%=limit%> = Number.parseInt(res.<%=limit%>)
              this.<%=name%>.<%=total%> = Number.parseInt(res.<%=total%>)
              return res
            })
            
         } 
      <%}%>
      
      <%if(item.methodType == 'add'){%>
        <%=item.name%>(
           <%_.each(item.params, function(param){%>
            <%=param%>,
          <%})%>
           <%=item.ajaxParam%>,
           index
        ) {
           return <%=item.name%>(
             <%_.each(item.params, function(param){%>
               <%=param%>,
            <%})%>
             <%=item.ajaxParam%>,
             index
           ).then(res => {
              this.<%=name%>.model = Object.assign({}, <%=item.ajaxParam%>, res||{})
              
              if(index !== undefined) {
                this.<%=name%>.<%=list%>.splice(index, 0, this.<%=name%>.<%=model%>)
              }else {
                 this.<%=name%>.<%=list%>.push(this.<%=name%>.<%=model%>);
              }
              return res
           })
        }
        
      <%}%>
      
      <%if(item.methodType == 'update'){%>
          <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>,
               index
          ) {
             return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>,
               index
             ).then(res => {
                this.<%=name%>.model = Object.assign({}, <%=item.ajaxParam%>, res||{})
                if(index !== undefined) {
                  this.<%=name%>.<%=list%>.splice(index, 1, this.<%=name%>.model)
                }
                return res
             })
          }
          
          
      <%}%>
      
      <%if(item.methodType == 'remove'){%>
        <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              index
        ) {
            return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              index
            ).then(res => {
               if(index !== undefined) {
                 this.<%=name%>.<%=list%>.splice(index, 1)
               }
               return res
            
            })
        }
        
      <%}%>
      
      <%if(item.methodType == 'get'){%>
        <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>
        ) {
            return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>
            ).then(res => {
               this.<%=name%>.model = Object.assign({}, <%=item.ajaxParam%>, res||{})
               return res
            })
        }        
      <%}%>
      
      
      <%if(['fetch','get','add','update','remove'].indexOf(item.methodType)==-1){%>
        <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>
        ) {
            return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>
            ).then(res => {
               this.<%=name%>.<%=item.state%> = res
               return res
            })
        }
        
      <%}%>
      
    <%})%>
  }
}
`)
