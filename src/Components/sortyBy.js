// source: any[] | null,
// prop: string,
// reversed?: Boolean

export const reorder = (source, prop, reversed = false) => {
  if (!source) return
  const tempOrder = [...source]
  const newOrder = sortBy(tempOrder, el => el[prop])
  if (reversed) {
    newOrder.reverse()
  }
  return newOrder
}

export const sortBy = (oldArray, matchFunc) => {
  const array = [...oldArray]
  for (let i = array.length; i; ) {
    const o = array[--i]
    array[i] = [].concat(matchFunc.call(o, o, i), o)
  }
  array.sort((a, b) => {
    for (let i = 0, len = a.length; i < len; ++i) {
      if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1
    }
    return 0
  })
  for (let i = array.length; i; ) {
    array[--i] = array[i][array[i].length - 1]
  }
  return array
}
