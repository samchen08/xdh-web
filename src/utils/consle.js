import * as config from '../config'

const DE_BUG = process.env.NODE_ENV === 'production' ? !!config.DE_BUG : true

function applyMethod (name, args) {
  if (DE_BUG && window.console) {
    const method = window.console[name]
    try {
      method.apply(method, args)
    } catch (e) {}
  }
}

export function log () {
  applyMethod('log', arguments)
}

export function warn () {
  applyMethod('warn', arguments)
}

export function error () {
  applyMethod('error', arguments)
}

export function dir () {
  applyMethod('dir', arguments)
}
