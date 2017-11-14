# React CSS Vars

Control CSS properties from JS
```js
--Element-foo: (props) => fooify(props.bar)
```

## Install

```sh
npm i -S truchi/react-css-vars
```

## Usage

CSS:
```css
h1 {
  --Title-color: blue;
  color: var(--Title-color);
}
```
JS:
```js
import React, { Component } from 'react'
import css from 'react-css-vars'

let Wrapped = 'h1'

// or

let Wrapped = {
  tag        : 'h1'    // Defaults to 'div'
, className  : 'Title' // Defaults to ''
, displayName: 'Title' // Defaults to 'Wrapped'
}

// or

let Wrapped = class extends Component {
  render() {
    return <h1>{this.props.children}</h1>
  }
}

// **Magic happens here**
let Title = css(Wrapped, (props, $) => {
  /*
    $ = {
      classes: {
        add     : $el.classList.add.bind($el.classList)
      , remove  : $el.classList.remove.bind($el.classList)
      , item    : $el.classList.item.bind($el.classList)
      , toggle  : $el.classList.toggle.bind($el.classList)
      , contains: $el.classList.contains.bind($el.classList)
      , replace : $el.classList.replace.bind($el.classList)
      }
    , attrs: {
        get   : $el.getAttribute.bind($el)
      , set   : $el.setAttribute.bind($el)
      , has   : $el.hasAttribute.bind($el)
      , have  : $el.hasAttributes.bind($el)
      , remove: $el.removeAttribute.bind($el)
      }
    }
  */
  return {
    '--Title-color': (props) => props.color
  , '--title-foo'  : 'bar'   // CSS vars are case sensitive
  , 'titleStuff'   : 'thing' // Also case sensitive
  , 'TitleColor'   : 'red'   // Overrides aboves
  , $: (props, $) => ...     // So you can pass an object to css()
  }
})

// As usual
class App extends Component {
  render() {
    return (
      <Title color="green">React CSS Vars</Title>
    )
  }
}
```

## Also

- [react-css-variables](https://github.com/jide/react-css-variables): Another way to do it
- [Yet another way](https://codepen.io/Mannaio/pen/eWzyoK) on CodePen
- [CSS properties browser support](https://caniuse.com/#feat=css-variables) from CanIUse
