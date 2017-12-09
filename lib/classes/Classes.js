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

    // Examples:
    // replace([['old1', 'new1'], ['old2', 'new2']])
    // replace('old', 'new')
    // replace(['old1', 'old2'], ['new1', 'new2'])
    replace(...args) {
      let pairs = []

      if (!args.length) return this

      if (args.length === 1) {
        pairs = args[0]
      } else {
        const olds = typeof args[0] === 'string' ? [args[0]] : args[0]
        const news = typeof args[1] === 'string' ? [args[1]] : args[1]
        const l    = Math.min(olds.length, news.length)

        for(let i = 0; i < l; ++i) {
          pairs.push([olds[i], news[i]])
        }
      }

      pairs.forEach(pair => that.replace.apply(that, pair))

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
