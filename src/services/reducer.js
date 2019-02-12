// Test to see whether an object is undefined or null (but not a 0 value
const isNull = (x) => (x === null || typeof x === 'undefined')


// toString :: (a) -> (b)
// Parse a result object { a: value, b: value, t: value }, and return a string
// representation in the form tx zy | zx | null
export const toString = (x) => {
  let t = !x.t ? null : `t${x.t}`
  let z = isNull(x.b) ? (x.t ? `z${x.t}` : null) : `z${x.b}`

  return t ? `${t} ${z}` : (z ? `${z}` : null)
}

// toObject :: (a) -> (b)
// Given a string representation of a result, return the corresponding object
// representation
export const toObject = (x) => {
  // Handle blank/null inputs
  if (x === '' || isNull(x)) return { a: null, b: null, t: null }

  // Test the contents of the string
  let sa = x.match(/(a|A)([0-9]{1,})/)
  let sb = x.match(/(z|Z|b|B)([0-9]{1,})/)
  let st = x.match(/(t|T)([0-9]{1,})/)

  // If a match exists, parse the match object and set the relevant return values
  let a = sa ? parseInt(sa[2], 10) : null
  let t = st ? parseInt(st[2], 10) : null
  let b = sb ? parseInt(sb[2], 10) : (st ? t : null)

  return a ? { b, t } : { a, b, t }
}

// resultString :: ([]) -> (a)
// Parse the sort_values array to return the general result as a string 
export const resultAsString = (arr) => isNull(arr[0])
  ? null 
  : `T${arr[0]} z${arr[2]} ${arr[1]} ${arr[3]}`
