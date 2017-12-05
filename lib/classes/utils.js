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
