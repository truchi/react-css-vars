import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import css from './react-css-vars'
import './index.css'

// let Wrapped = class extends Component {
//   render() {
//     return <h1>{this.props.children}</h1>
//   }
// }

let Wrapped = {
  tag: 'h1'
, className: 'Title'
, displayName: 'Title'
}

// let Wrapped = 'h1'

let El = css(Wrapped, (props, $) => {
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
      <El>React CSS Vars</El>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
