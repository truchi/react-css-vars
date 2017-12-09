const flatten = (arr) =>
  arr.reduce(
    (flat, toFlatten) =>
      flat.concat(
        Array.isArray(toFlatten)
          ? flatten(toFlatten)
          : toFlatten
        )
  , []
  )

const uniquify = (arr) => arr.filter((v, i, a) => a.indexOf(v) === i)

export const args2arr = (args) =>
  uniquify(
    flatten(
      flatten(args)
      .map(str => str.split(' '))
    )
  )

export const args2pairs = (args) => {
  let pairs = []

  if (!args.length) return pairs

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

  return pairs
}
