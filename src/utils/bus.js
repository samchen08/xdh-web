/**
 * 组件之间的消息总线，用作组件间消息传递，用法：
 * A组件：
 *  import bus from './util/bus'
 *  // 触发事件
 *  bus.$emit('message', data)
 *
 *  B组件：
 *  import bus from './util/bus'
 *
 *  // 侦听事件
 *  bus.$on('message', data => {
 *    // 收到A组件发送过来的消息
 *  })
 *
 */
import Vue from 'vue';
export default new Vue({});
