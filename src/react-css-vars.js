import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { name, get, create } from './utils'

export default (WrappedComponent, updater) => {
  WrappedComponent = typeof WrappedComponent === 'object'
    ? create(WrappedComponent)
    : WrappedComponent

  let component = class extends Component {
    componentDidMount() {
      this.postRender()
    }

    componentDidUpdate() {
      this.postRender()
    }

    postRender() {
      let $ = findDOMNode(this)
      if ( !$ ) return

      let _$ = {
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

      let vars = get(updater, this.props, _$)
      for (let v in vars) {
        if ( v === '$' ) {
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

  // TODO displayName
  component.displayName = 'LOL2'

  return component
}
