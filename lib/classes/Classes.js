import { sync as _sync, args2arr } from './utils.js'

const Classes = ($) => {
  let   value, length
  const that = $.classList
  const sync = () => {
    value  = that.value
    length = that.length
  }

  sync()

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

    contains(...tokens) {
      tokens = args2arr(tokens)

      return tokens.every(token => that.contains(token))
    }

    containsSome(...tokens) {
      tokens = args2arr(tokens)

      return tokens.some(token => that.contains(token))
    }

    replace(oldToken, newToken) {
      that.replace(oldToken, newToken)

      sync()
      return this
    }

    toggle(...tokens) {
      let force   = null
      let results = null
      const l     = tokens.length

      const last =
                  tokens[l - 1] === null
        || typeof tokens[l - 1] === 'boolean'
      const beforeLast =
                  tokens[l - 2] === null
        || typeof tokens[l - 2] === 'boolean'

      if (beforeLast && last) {
        results = tokens.pop()
        force   = tokens.pop()
      } else if (last) {
        force = tokens.pop()
      }

      force === null && (force = undefined)
      tokens    = args2arr(tokens)
      const ret = tokens.map(token => that.toggle(token, force))

      sync()
      return results ? ret : this
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
