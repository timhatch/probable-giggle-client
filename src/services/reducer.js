// Test to see whether an object is undefined or null (but not a 0 value)
export const isNull = (x) => (x === null || typeof x === 'undefined')

// Filter out any object properties with a null value
// e.g. { a: 1, b: null, t: null } returns { a: 1 }
// e.g. { p1: { a: 1, b: 1 }, p2: null } returns { p1: { a: 1, b: 1 } }
//
// sig: (Hash o) -> (Hash)
const parseObject = (o) => Object.entries(o)
  .filter(([k, v]) => !isNull(v))
  .reduce((a, c) => {(a[c[0]] = c[1]); return a }, {})

// Given a string representation of a result, return the corresponding object
// representation
//
// sig: (String x) -> (Hash)
export const resultStringToHash = (x) => {
  // Handle blank/null inputs
  if (x === '' || isNull(x)) return { a: null, b: null, t: null }

  // Test the contents of the string
  let string_a = x.match(/(a|A)([0-9]{1,})/)
  let string_b = x.match(/(z|Z|b|B)([0-9]{1,})/)
  let string_t = x.match(/(t|T)([0-9]{1,})/)

  // If a match exists, parse the match object and set the relevant return values
  let a = string_a ? parseInt(string_a[2], 10) : null
  let t = string_t ? parseInt(string_t[2], 10) : null
  let b = string_b ? parseInt(string_b[2], 10) : (string_t ? t : null)

  // Return the resulting object`
  return parseObject({a, b, t})
}

// Parse a result object { a: value, b: value, t: value }, and return a string
// representation in the form tx zy | zx | null
//
// sig: (Hash x) -> (String?)
export const cellResultAsString = (x) => {
  let t = !x.t ? null : `t${x.t}`
  let z = isNull(x.b) ? (x.t ? `z${x.t}` : null) : `z${x.b}`

  return t ? `${t} ${z}` : (z ? `${z}` : null)
}

// Parses the `sort_values` array to return the general result as a string 
//
// sig: (Array[Integer?]) -> (String?)
// TODO: Rename this heatResultAsString
export const heatResultAsString = (arr) => isNull(arr[0])
  ? null 
  : `T${arr[0]} z${arr[2]} ${arr[1]} ${arr[3]}`

export const resultAsString = cellResultAsString
export const toString       = heatResultAsString
export const toObject       = resultStringToHash
