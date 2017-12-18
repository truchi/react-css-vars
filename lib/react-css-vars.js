import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Classes from './classes/Classes'
import Attrs from './classes/Attrs'
import {
  name, get, create, getDisplayName, isObject, isFunction
} from './utils'

export default (WrappedComponent, updater, ...updaterArgs) => {
  WrappedComponent = isObject(WrappedComponent)
    ? create(WrappedComponent)
    : WrappedComponent

  if (!isObject(updater) && !isFunction(updater))
    return WrappedComponent

  let component = class extends Component {
    componentDidMount() {
      this.css.apply(this, [updater, ...updaterArgs])
    }

    componentDidUpdate() {
      this.css.apply(this, [updater, ...updaterArgs])
    }

    css(updater, ...updaterArgs) {
      const $ = findDOMNode(this)
      if (!$) return

      const _$ = {
        classes: new (Classes($))
      , attrs  : new (Attrs  ($))
      }

      let args    = [this.props, _$]
      updaterArgs = updaterArgs.map(arg => get.apply(null, [arg, ...args]))
      args        = [...args, ...updaterArgs]

      const vars = get.apply(null, [updater, ...args])
      if (!isObject(vars))
        return

      for (const v in vars) {
        const got = get.apply(null, [vars[v], ...args])

        if (v !== '$') {
          $.style.setProperty(name(v), got)
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
