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

export const points = {b: 3, Z: 6, t: 25}

// Given a string representation of a result, return the corresponding object
// representation
//
// sig: (String x) -> (Hash)
export const resultStringToHash = (x) => {
  // Handle blank/null inputs
  if (x === '' || isNull(x)) return { a: null, b: null, t: null }

  // Test the contents of the string
  let string_a = x.match(/(a)([0-9]{1,})/)    // try x.match(/(a)(\d+)/)
  let string_b = x.match(/(z|b)([0-9]{1,})/)
  let string_Z = x.match(/(Z)([0-9]{1,})/)
  let string_t = x.match(/(t)([0-9]{1,})/)
  let string_h = x.match(/(h)(\d*\.?\d*)/)

  // If a match exists, parse the match object and set the relevant return values
  let a = string_a ? parseInt(string_a[2], 10) : null
  let t = string_t ? parseInt(string_t[2], 10) : null
  let b = string_b ? parseInt(string_b[2], 10) : null
  let Z = string_Z ? parseInt(string_Z[2], 10) : null
  let h = string_h ? parseInt(string_h[2], 10) : null

  // Return the resulting object`
  return parseObject({a, b, Z, t, h})
}

// Parse a result object { a: value, b: value, t: value }, and return a string
// representation in the form tx zy | zx | null
//
// sig: (Hash x) -> (String?)
export const cellResultAsString = (x) => {
  let string = !x.t ? '' : `t${x.t} `
  string += isNull(x.Z) ? '' : `Z${x.Z} `
  string += isNull(x.b) ? '' : `z${x.b}`

  // console.log(x)
  // console.log(!x.n)
  return !!string.length ? string : !!x.n ? x.n : null 
}

// Parses the `sort_values` array to return the general result as a string 
//
// sig: (Array[Integer?]) -> (String?)
// TODO: Rename this heatResultAsString
export const heatResultAsString = (arr) => isNull(arr[0]) ? null : `${(arr[0] / 10).toFixed(1)}`

// Function aLiases (check for redundancy)
export const resultAsString = cellResultAsString
export const toString       = heatResultAsString
export const toObject       = resultStringToHash
