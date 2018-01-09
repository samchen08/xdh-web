/**
 * 队列任务处理类
 *
 * 用法：
    let queue = new Queue(data => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
           resolve('ok')
          }, 1000)
        })
      }).start()
     queue.push(1)
     queue.push(2)
 */

import Events from './events'

const taskFunc = function (data) {
  return Promise.resolve(data)
}

class Queue extends Events {
  constructor (task) {
    super()
    this.__list__ = []
    this.waiting = false
    this.running = false
    this.task = task || taskFunc
  }

  push (data) {
    this.__list__.push(data)
    this.running && this.run()
    return this
  }

  run () {
    if (!this.running || this.waiting || this.__list__.length === 0) return
    this.waiting = true
    const data = this.__list__.shift()
    this.task(data).then(res => {
      this.waiting = false
      this.$emit('success', res)
      if (this.__list__.length > 0) {
        this.run()
      } else {
        this.$emit('complete')
      }
    }).catch(e => {
      this.waiting = false
      this.$emit('error', e, data)
    })
  }

  clear () {
    this.__list__ = []
    this.waiting = false
  }

  start () {
    this.running = true
    this.run()
    return this
  }

  stop () {
    this.running = false
    return this
  }
}

export default Queue
