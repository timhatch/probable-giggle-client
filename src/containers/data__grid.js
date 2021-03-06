import React                from 'react'
import ReactDataGrid        from 'react-data-grid'

import {observer, inject}   from 'mobx-react'

import {heatResultAsString} from '../services/reducer'
import {cellResultAsString} from '../services/reducer'
import {resultStringToHash} from '../services/reducer'

// Titles for display columns
const TITLE = { per_id: 'ID', start_order: 'Order', result_rank: 'Rank' }

// Constant defining core cells for display
const personalia = (param) => ([
  { width: 60, key: param,       name: TITLE[param] },
  { width: 96, key: 'lastname',  name: 'Lastname' },
  { width: 96, key: 'firstname', name: 'Firstname' },
  { width: 60, key: 'nation',    name: 'IOC' },
])

// Parse results data returned from the server
//
// Returns an array of results containing, in addition to the original properties, a 'result'
// property representing the result as a string, e.g. 'T4 z4 6 4' and individual results for
// each boulder, e.g. 'p1' = 't1 z1', respectively parsed from the 'sort_values' and 
// 'result_jsonb' properties
//
// sig: (Array[Result]) -> (Array[EnhancedResult])
const resultsParser = (route) => route.map((person) => {
  let array  = Object.entries(person.result_jsonb || {})
                     .map(([k, v]) => ({ [k]: cellResultAsString(v) }))
  let result = heatResultAsString(person.sort_values || [])

  return Object.assign({result}, person, ...array)
})

// byStarter :: (a, b) -> (a, b)
// Lambda/block to order array in place by start-order, then lastname and finally
// (if no start-order or same names, by per_id (which must be unique)
const sortBy = (param) => (a, b) => {
  if (a[param] > b[param]) return 1
  if (a[param] < b[param]) return -1

  if (a.lastname > b.lastname) return 1
  if (a.lastname < b.lastname) return -1

  return a.per_id - b.per_id
}

// dataMapper :: ([{a}]) -> ([{a*}])
// Parse data received from the server to convert object-based results representations
// into string based representations
const dataMapper = (results) => {
  let arr = [...results.keys()].sort().map((x) => results.get(x))
                               .map(resultsParser)
  return [].concat(...arr)
}

// Class definition
// NOTE: Styling is all achieved by overring global styles for the data-grid
// This is an anti-pattern but there's no obvious means to style the base component
class DataGrid extends React.Component {
  componentDidMount() {
    this.props.rootStore.fetchResults()
  }

  // render an array of results. Set the width of the enclosing element from the 
  // numebr of boulders
  render() {
    // TODO: Read this from a competition definition
    let numResults = this.props.rootStore.routes[0] < 2 ? 5 : 4
    let tableWidth = 408 + (48 * numResults)
    let param      = this.props.rootStore.uistate.get('resultsSortParam') || 'start_order'
    this.rows      = this.handleFilter(param)
    return (
      <div style={{ width: tableWidth, margin: '0 auto' }}>
        <ReactDataGrid
          columns={this.setColumns(param, numResults)}
          rowGetter={(i) => this.rows[i]}
          rowsCount={this.rows.length}
          minHeight={this.setHeight()}
          enableCellSelect={true} 
          onGridRowsUpdated={this.handleRowChange}
        />
      </div>
    )
  }

  // Return an array defining the properties for each column of the data-grid, 
  // Start with the `personalia`, appending to that (i) columns for each boulder/route result
  // and then finally a column for the overall result
  //
  // sig: (String param, Integer num) -> (Array[Hash])
  setColumns = (param, num) => {
    const blocs   = Array.from(Array(num), (x, i) => `p${i+1}`)
    const results = blocs.map((x) => ({ key: x, name: x, editable: true, width: 48 }))
    return personalia(param).concat(results).concat([{ key: 'result', name: 'Result', width: 96 }])
  }

  // Set the minimum height for the table element
  // n.b. the default row height is 35px. we use (num + 1) to account for the header row
  //
  // sig: () -> (Integer)
  setHeight = () => this.rows.length * 36 + 64
  
  // Read the current filter value from the mobx store, then either 
  // (a) return the first 60 results
  // (b) if the string is all-caps and at least 2 chars long, filter by nation
  // (c) otherwise return all results which match the filter
  //
  // sig: (String param) -> (Array[Hash])
  handleFilter = (param) => {
    const string  = this.props.rootStore.fString.get()
    const sortfn  = sortBy(param)
    const results = dataMapper(this.props.rootStore.results).sort(sortfn)

    // DEBUG
    if (process.env.NODE_ENV === 'development') console.log(results)

    if (string.length === 0)        return results.slice(0, 60) 
    if (string.match(/[A-Z]{2,3}/)) return results.filter((x) => x.nation.match(string))

    return results.filter((x) => x.lastname.match(string) || x.firstname.match(string))
  }

  // Handle some change in the content of a row within the data-grid
  // When the value in any cell channges, parse the cell content and post the new data to the server
  // NOTE: Think about how to cache results to allow for offline editing or editing where the 
  // connection is poor
  //
  // sig: (Hash) -> void
  handleRowChange = ({ fromRow, toRow, updated }) => {
    if (fromRow !== toRow) return   // Don't allow cross-row actions

    let {wet_id, grp_id, route, per_id} = this.rows.slice()[fromRow]
    let result_jsonb = this.mergeResults({fromRow, updated})

    this.props.rootStore.updateResults({wet_id, grp_id, route, per_id, result_jsonb})
  }

  // merge updated results into the old result and return that. This allows us to preserve
  // attempts (and other) data where the purpose of the entry is to update only part of the
  // result
  // Params: @fromRow - the index of the modified row
  //         @updated - a JSON object containing the updated cell content (a string)
  //
  // sig: (Integer fromRow, Hash updated) -> (Hash)
  mergeResults = ({fromRow, updated}) => {
    let jsonb  = this.rows.slice()[fromRow].result_jsonb  // The row data read from the store
    let [k, v] = Object.entries(updated)[0]               // Transform the returned object into [k, v]
    let prev   = jsonb ? jsonb[k] : {}                    // Get the existing result for the relevant cell

    return { [k]: {...prev, ...resultStringToHash(v) } }  // Return the updated result
  }
}

export default inject('rootStore')(observer(DataGrid))

