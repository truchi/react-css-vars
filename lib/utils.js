import React, { Component } from 'react'

export const isNull     = (o) => o === null
export const isObject   = (o) => !isNull(o) && typeof o === 'object'
export const isFunction = (o) =>               typeof o === 'function'

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

export const get = (obj, ...args) => isFunction(obj)
  ? obj(...args)
  : obj

export const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

export const create = (arg) => {
  let { tag, className, displayName } =
    typeof arg === 'string'
      ? {
        tag        : arg
      , className  : ''
      , displayName: 'Wrapped'
      }
      : {
        tag        : arg.tag         || 'div'
      , className  : arg.className   || ''
      , displayName: arg.displayName || arg.className || 'Wrapped'
      }

  let component = class extends Component {
    render() {
      let Tag = tag

      return <Tag className={className} {...this.props}>{this.props.children}</Tag>
    }
  }

  component.displayName = displayName

  return component
}
