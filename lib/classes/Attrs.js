import { sync as _sync, args2arr } from './utils.js'

const Attrs = ($) => {
  let length
  const that = $.attributes
  const sync = () => {
    length = that.length
  }

  sync()

  console.log('Original attributes', that);
  window.that2 = that

  return class {
    names() {
      return $.getAttributeNames()
    }

    get(name) {
      return $.getAttribute(name)
    }

    // TODO multiple?
    has(name) {
      if (typeof name === 'undefined')
        return $.hasAttributes()

      return $.hasAttribute(name)
    }

    // TODO multiple?
    set(name, value) {
      $.setAttribute(name, value)

      sync()
      return this
    }

    // TODO multiple?
    remove(name) {
      $.removeAttribute(name, value)

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
