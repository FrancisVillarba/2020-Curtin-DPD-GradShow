// source: any[] | null,
// propArr: string[],
// reversed?: Boolean

export const reorder = (source, propArr, reversed = false) => {
  if (!source) return
  const tempOrder = [...source]
  const newOrder = sortBy(tempOrder, el => {
    let x = el
    propArr.forEach(prop => {
      x = x[prop]
    })
    return x
  })
  if (reversed) {
    newOrder.reverse()
  }
  return newOrder
}

export const reorderAlpha = (source, propArr, reversed = false) => {
  if (!source) return
  const temp = source.map((el, i) => {
    return { i, value: getProp(el, propArr) }
  })
  temp.sort((a, b) => {
    if (a.value > b.value) return 1
    if (a.value < b.value) return -1
    return 0
  })
  const out = temp.map(el => {
    return source[el.i]
  })
  if (reversed) {
    out.reverse()
  }
  return out
}

const getProp = (el, propArr) => {
  let x = el
  propArr.forEach(prop => {
    x = x[prop]
  })
  return x
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
