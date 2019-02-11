const isNull = (x) => (x === null || typeof x === 'undefined')

export const toString = (x) => {
  let t = !x.t ? null : `t${x.t}`
  let z = isNull(x.b) ? (x.t ? `z${x.t}` : null) : `z${x.b}`

  return t ? `${t} ${z}` : (z ? `${z}` : null)
}

export const toObject = (x) => {
  if (x === '') return { a: null, b: null, t: null }

  let sa = x.match(/(a|A)([0-9]{1,})/) 
  let sb = x.match(/(z|Z|b|B)([0-9]{1,})/) 
  let st = x.match(/(t|T)([0-9]{1,})/) 

  let a = sa ? parseInt(sa[2], 10) : null
  let t = st ? parseInt(st[2], 10) : null
  let b = sb ? parseInt(sb[2], 10) : (st ? t : null)

  return a ? { b, t } : { a, b, t }
}

export const resultAsString = (arr) => isNull(arr[0]) ? null : `T${arr[0]} z${arr[2]} ${arr[1]} ${arr[3]}`
