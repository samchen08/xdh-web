const _ = require('lodash')
module.exports = _.template(`
/*! build time: <%=new Date().toLocaleString()%> */
// <%=importTypeArray.join(', ')%>
import { <%=importTypeArray.join(', ')%> } from '@/store/types'
// <%=importApiArray.join(', ')%>
import { <%=importApiArray.join(', ')%> } from '@/base/api/<%=kebabCaseName%>'
// store module
export default {
  state: {
   <%_.each(customStateArray, function(state){ %>
      <%=state%>: null,
   <%})%>
    <%=list%>: [],
    <%=page%>: null,
    <%=limit%>: null,
    <%=total%>: 0,
    <%=model%>: null
  },
  mutations: {
    <%_.each(items, function(item, i){%>
      <%if(i>0){%>,<%}%>
      
      <%if(item.methodType == 'fetch'){%>
        [<%=item.NAME%>](state, payload) {
          state.<%=list%> = payload.<%=list%>;
          state.<%=page%> = payload.<%=page%>;
          state.<%=limit%> = payload.<%=limit%>;
          state.<%=total%> = payload.<%=total%>;
        }
      <%}%>
      
      <%if(item.methodType == 'add'){%>
        [<%=item.NAME%>](state, payload) {
          if(payload.index !== undefined) {
            state.<%=list%>.splice(payload.index, 0, payload.<%=model%>)
          }else {
            state.<%=list%>.push(payload.<%=model%>);
          }
        }
      <%}%>
      
      <%if(item.methodType == 'update'){%>
        [<%=item.NAME%>](state, payload) {
          if(payload.index !== undefined) {
            state.<%=list%>.splice(payload.index, 1, payload.<%=model%>)
          }
        }
      <%}%>
      
      <%if(item.methodType == 'remove'){%>
        [<%=item.NAME%>](state, payload) {
          if(payload.index !== undefined) {
            state.<%=list%>.splice(payload.index, 1)
          }
        }
      <%}%>
      
      <%if(item.methodType == 'get'){%>
        [<%=item.NAME%>](state, payload) {
          state.<%=model%> = payload.<%=model%>
        }
      <%}%>
      
      <%if(['fetch','get','add','update','remove'].indexOf(item.methodType)==-1){%>
       [<%=item.NAME%>](state, payload) {
          state.<%=item.state%> = payload.<%=item.state%>
        }
      <%}%>
      
    <%})%>
    
  },
  actions: {
  
    <%_.each(items, function(item, i){%>
      <%if(i>0){%>,<%}%>
      
      <%if(item.methodType == 'fetch'){%>
        [<%=item.NAME%>]({commit}, {
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>
        } = {}) {
          return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>
          ).then(res => {
            commit({
              type: <%=item.NAME%>,
              <%=list%>: res.<%=list%>,
              <%=page%>: Number.parseInt(res.<%=page%>),
              <%=limit%>: Number.parseInt(res.<%=limit%>),
              <%=total%>: Number.parseInt(res.<%=total%>)
            })
            return res
          })
        }
      <%}%>
      
      <%if(item.methodType == 'add'){%>
        [<%=item.NAME%>]({commit}, {
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              index
        } = {}) {
          return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>
          ).then(res => {
            commit({
              type: <%=item.NAME%>,
              <%=model%>: Object.assign({}, <%=item.ajaxParam%>, res),
              index: index
            })
            return res
          })
        }
      <%}%>
      
      <%if(item.methodType == 'update'){%>
        [<%=item.NAME%>]({commit, state}, {
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>,
               index
        }={}) {
          return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>
          ).then(res => {
            commit({
              type: <%=item.NAME%>,
              index: index,
              <%=model%>: Object.assign({}, state.<%=list%>[index], <%=item.ajaxParam%>, res)
            })
            return res
          })
        }
      <%}%>
      
      <%if(item.methodType == 'remove'){%>
        [<%=item.NAME%>]({commit}, {
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
               <%=item.ajaxParam%>,
               index
        }={}) {
          return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>
          ).then(res => {
            commit({
              type: <%=item.NAME%>,
              index: index
            })
            return res
          })
        }
      <%}%>
      
      <%if(item.methodType == 'get'){%>
        [<%=item.NAME%>]({commit}, {
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>
        }={}) {
          return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
               <%=item.ajaxParam%>
          ).then(res => {
            commit({
              type: <%=item.NAME%>,
              <%=model%>: res
            })
            return res
          })
        }
      <%}%>
      
      
      <%if(['fetch','get','add','update','remove'].indexOf(item.methodType)==-1){%>
        [<%=item.NAME%>]({commit}, {
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
              <%=item.ajaxParam%>
        }={}) {
          return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
              <%=item.ajaxParam%>
          ).then(res => {
            commit({
              type: <%=item.NAME%>,
              <%=item.state%>: res
            })
            return res
          })
        }
      <%}%>
      
    <%})%>
  }
}
`)
