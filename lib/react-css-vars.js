import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {
  name, get, create, getDisplayName, isObject, isFunction
} from './utils'


export default (WrappedComponent, updater) => {
  WrappedComponent = isObject(WrappedComponent)
    ? create(WrappedComponent)
    : WrappedComponent

  if (!isObject(updater) && !isFunction(updater))
    return WrappedComponent

  let component = class extends Component {
    componentDidMount() {
      this.postRender()
    }

    componentDidUpdate() {
      this.postRender()
    }

    postRender() {
      const $ = findDOMNode(this)
      if (!$) return

      const _$ = {
        classes: {
          add     : $.classList.add.bind($.classList)
        , remove  : $.classList.remove.bind($.classList)
        , item    : $.classList.item.bind($.classList)
        , toggle  : $.classList.toggle.bind($.classList)
        , contains: $.classList.contains.bind($.classList)
        , replace : $.classList.replace.bind($.classList)
        }
      , attrs: {
          get   : $.getAttribute.bind($)
        , set   : $.setAttribute.bind($)
        , has   : $.hasAttribute.bind($)
        , have  : $.hasAttributes.bind($)
        , remove: $.removeAttribute.bind($)
        }
      }

      const vars = get(updater, this.props, _$)
      if (!isObject(vars))
        return

      for (const v in vars) {
        if (v === '$') {
          get(vars[v], this.props, _$)
        } else {
          $.style.setProperty(name(v), get(vars[v], this.props))
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  component.displayName = `RCV(${getDisplayName(WrappedComponent)})`

  return component
}
