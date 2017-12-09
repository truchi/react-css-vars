import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Classes from './classes/Classes'
import Attrs from './classes/Attrs'
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
      this.css()
    }

    componentDidUpdate() {
      this.css()
    }

    css(localUpdater) {
      const $ = findDOMNode(this)
      if (!$) return

      const _$ = {
        classes: new (Classes($))
      , attrs  : new (Attrs($))
      }

      const vars = get(localUpdater || updater, this.props, _$)
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
