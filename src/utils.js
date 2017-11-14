import React, { Component } from 'react'

export const name = (str) => {
  if(str.startsWith('--')) return str

  let isUpper = str[0] === str[0].toUpperCase()
  str = str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`).toString()

  if (isUpper) {
    str    = str.substr(1)
    str    = str.split('')
    str[0] = str[0].toUpperCase()
    str    = str.join('')
  }

  return `--${str}`
}

export const get = (obj, ...args) => typeof obj === 'function'
  ? obj(...args)
  : obj

export const create = (arg) => {
  let { tag, className } = typeof arg === 'string'
    ? { tag: arg    , className: ''            }
    : { tag: arg.tag, className: arg.className }

  let component = class extends Component {
    render() {
      let Tag = tag

      return <Tag className={className}>{this.props.children}</Tag>
    }
  }

  // TODO displayName
  component.displayName = 'LOL1'

  return component
}
