import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import css from './react-css-vars'

// let WrappedComponent = class extends Component {
//   constructor(props) {
//     super(props)
//   }
//
//   render() {
//     return <h1>{this.props.children}</h1>
//   }
// }

let WrappedComponent = {
  tag: 'h1'
, className: 'className megalol'
}

// let WrappedComponent = 'h1'

let El = css(WrappedComponent, (props, $) => {
  return {
    '--h1-color': props.color
  , h1Aaa11Bbb222Ccccc33: props.color
  , h2Aaa11Bbb222Ccccc33: props.color
  , h1: props.color
  , H2: props.color
  , $: (props, $) => $.attrs.set('lol', 1)
  }
})

class App extends Component {
  render() {
    return (
      <El></El>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
