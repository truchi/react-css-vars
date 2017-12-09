import { sync as _sync, args2arr, args2pairs } from './utils.js'

const Attrs = ($) => {
  let   length
  const that = $.attributes
  const sync = () => {
    length = that.length
  }

  sync()

  console.log('Original attributes', that);
  window.that2 = that

  return class {
    all() {
      return $.getAttributeNames()
    }

    get(name) {
      return $.getAttribute(name)
    }

    has(...names) {
      if (!names.length)
        return $.hasAttributes()

      names = args2arr(names)

      return names.every(name => $.hasAttribute(name))
    }

    hasSome(...names) {
      names = args2arr(names)

      return names.some(name => $.hasAttribute(name))
    }

    // Examples:
    // add([['name1', 'value1'], ['name2', 'value2']])
    // add('name', 'value')
    // add(['name1', 'name2'], ['value1', 'value2'])
    add(...args) {
      const pairs = args2pairs(args)

      pairs.forEach(pair => $.setAttribute.apply($, pair))

      sync()
      return this
    }

    remove(...names) {
      names = args2arr(names)
      names.forEach(name => $.removeAttribute(name))

      sync()
      return this
    }

    get length() {
      return length
    }

    set length(length) {
      console.error('NamedNodeMap: length is read-only')
    }
  }
}

export default Attrs
