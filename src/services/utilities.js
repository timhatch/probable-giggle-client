// Parse the eGroupware competition name and return the host city
// Competition names are typically formatted like so:
// '3rd CISM World Winter Games - Sochi (RUS) 2017' or
// 'IFSC Climbing Worldcup (B) - Meiringen (SUI) 2017 '
// So we split by ' - ' (to avoid hyphens) and strip out numbers, nation codes and whitespace
//
export const truncateWCHostname = (name) => {
  return name.split(' - ')
    .pop()
    .replace(/[0-9]/g,'')
    .replace(/\([A-Za-z]{3,}\)/g, '') 
    .replace(/^\s+|\s+$/g,'')
    .replace('PROVISIONAL','')
}

// Force a name in to Sentence Case (from all capitals, or all lowercase)
// NOTE: This implementation uses an ES6 arrow function to recapitalise letters, it may be more
// efficient to expand this function so that the arrow function is not re-interpreted on each call
// NOTE: Doesn't work for names which include diacritic characters, as these are detected as 
// word boundaries (so the letter following the diacritic is capitalised)
export const sentenceCase = (name) => name.toLowerCase().replace(/\b([a-z])/g, (v) => v.toUpperCase())

// Simple comparator function to check that the passed object is not null
// For more robust handling, prefer _.isObject()
export const isObject = (obj) => obj !== null

// rankorder :: (a, b) -> int
// Comparator function to sort by rank, interleaving results from multiple starting groups
// 1) Sort by computed position (i.e. unranked last)
// 2) If computed position is equal, sort by starting group
// 3) If computed position is equal and starting group is equal, sort by PerId (this is purely to give
//    a stable sort, it confers no precedence to the results)
export const rankorder = (a, b) => {
  // Compute a position, assigning a value in the range >500 to climbers yet to start
  const aComputed = parseInt(a.result_rank, 10) || 500 + parseInt(a.start_order, 10)
  const bComputed = parseInt(b.result_rank, 10) || 500 + parseInt(b.start_order, 10)

  if (aComputed > bComputed) return 1
  if (aComputed < bComputed) return -1

  if (a.start_group > b.start_group) return 1
  if (a.start_group < b.start_group) return -1

  if (a.nation > b.nation) return 1
  if (a.nation < b.nation) return -1

  if (a.PerId > b.PerId) return 1
  if (a.PerId < b.PerId) return -1

  return 0
}

// qointOrder :: (a,  b) -> int
// Comparator function to sort by qualifying points (lowest best)
export const qointorder = (a, b) => a.qoints - b.qoints

// eGrouware GrpIds, each array is ordered F = a[0], M = a[1]
// TODO: Refactor for YOUTH - change for 6 GrpId/discipline
export const categories = {
  boulder:  [5, 6],
  lead:     [2, 1],
  speed:    [24, 23],
  combined: [288, 291],
  paraclimbing: [85, 86]
}

// Speed category for test competition == 64
export const disciplines = {
  2: 'lead', 1: 'lead',
  5: 'boulder', 6: 'boulder',
  24: 'speed', 23: 'speed',
  288: 'combined', 291: 'combined',
  85: 'paraclimbing', 86: 'paraclimbing'
}
