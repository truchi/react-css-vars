import { sync as _sync, args2arr } from './utils.js'

const Classes = ($) => {
  const that = $.classList
  let value  = that.value
  let length = that.length
  const sync = () => {
    value  = that.value
    length = that.length
  }

  console.log('Original classList', that);
  window.that = that

  return class {
    has(token) {
      return that.contains(token)
    }

    add(...tokens) {
      tokens = args2arr(tokens)
      tokens.forEach(token => that.add(token))

      sync()
      return this
    }

    remove(...tokens) {
      tokens = args2arr(tokens)
      tokens.forEach(token => that.remove(token))

      sync()
      return this
    }

    get value() {
      return value
    }

    set value(value) {
      that.value = value

      sync()
    }

    get length() {
      return length
    }

    set length(length) {
      console.error('DOMTokenList: length is read-only')
    }
  }
}

export default Classes
