// source: any[] | null,
// propArr: string[],
// reversed?: Boolean

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
