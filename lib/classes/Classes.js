import { sync as _sync, args2arr, args2pairs } from './utils.js'

const Classes = ($) => {
  let   length
  const that = $.classList
  const sync = () => {
    length = that.length
  }

  sync()

  return class {
    all() {
      return that.value.split(' ')
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

    has(...tokens) {
      if (!tokens.length)
        return length !== 0

      tokens = args2arr(tokens)

      return tokens.every(token => that.contains(token))
    }

    hasSome(...tokens) {
      tokens = args2arr(tokens)

      return tokens.some(token => that.contains(token))
    }

    // Examples:
    // replace([['old1', 'new1'], ['old2', 'new2']])
    // replace('old', 'new')
    // replace(['old1', 'old2'], ['new1', 'new2'])
    replace(...args) {
      const pairs = args2pairs(args)

      pairs.forEach(pair => that.replace.apply(that, pair))

      sync()
      return this
    }

    // Examples
    // toggle('a b c') or toggle(['a', ['b', 'c']])
    // toggle('a', true|false) // force, returns this
    // toggle('a', null, true) // dont force, returns results
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

    get length() {
      return length
    }

    set length(length) {
      console.error('DOMTokenList: length is read-only')
    }
  }
}

export default Classes
