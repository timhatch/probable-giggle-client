import React                from 'react'
import ReactDataGrid        from 'react-data-grid'

import { observer, inject } from 'mobx-react'

import { toString, toObject, resultAsString }   from '../services/reducer'

// Constant defining core cells for display
const PERSONALIA = [
  { key: 'per_id',    name: 'ID',        width: 72 },
  { key: 'lastname',  name: 'Lastname',  width: 96 },
  { key: 'firstname', name: 'Firstname', width: 96 },
  { key: 'nation',    name: 'Code',      width: 48 }
]

const resultsParser = (route) => route.map((x) => {
  let r = x.result_jsonb || {}
  let s = Object.entries(r).filter((x) => !!x).map(([k, v]) => ({ [k]: toString(v) }))
  let t = resultAsString(x.sort_values || [])
  return Object.assign({ result: t }, x, ...s)
})

// byStarter :: (a, b) -> (a, b)
// Lambda/block to order array in place by start-order, then lastname and finally
// (if no start-order or same names, by per_id (which should be unique
const byStarter = (a, b) => {
  if (a.start_order > b.start_order) return 1
  if (a.start_order < b.start_order) return -1

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
  return [].concat(...arr).sort(byStarter)
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
    let numResults = this.props.rootStore.routes[0] < 2 ? 30 : 4
    let tableWidth = 408 + (48 * numResults)
    this.rows      = this.handleFilter()
    return (
      <div style={{ width: tableWidth, margin: '0 auto' }}>
        <ReactDataGrid
          columns={this.setColumns(numResults)}
          rowGetter={(i) => this.rows[i]}
          rowsCount={this.rows.length}
          minHeight={this.setHeight(this.rows.length)}
          enableCellSelect={true} 
          onGridRowsUpdated={this.handleRowChange}
          enableDragAndDrop={false}
        />
      </div>
    )
  }

  // setColumns :: (int) -> (int)
  // Return an array defining the properties for each column, inserting within that array (num)
  // results cells
  setColumns = (num) => {
    const blocs   = Array.from(Array(num), (x, i) => `p${i+1}`)
    const results = blocs.map((x) => ({ key: x, name: x, editable: true, width: 48 }))
    return PERSONALIA.concat(results).concat([{ key: 'result', name: 'Result', width: 96 }])
  }

  // setHeight :: (int) -> (int)
  // Set the minimum height for the table element
  // n.b. the default row height is 35px. we use (num + 1) to account for the header row
  setHeight = (num) => (num) * 36 + 64
  
  // handleFIlter :: () -> ([a])
  // Read the current filter value from the mobx store, then either (a) return the first 60 results
  // if no filter has been retrieved; or (b) return all results which match the filter
  handleFilter = () => {
    let filterValue = this.props.rootStore.lastname.get()
    let results     = dataMapper(this.props.rootStore.results)
    return filterValue.length === 0
      ? results.slice(0, 60)
      : results.filter((x) => x.lastname.match(filterValue) || x.firstname.match(filterValue))
  }

  // handleRowChange :: ({a}) -> ()
  // When the value in any cell channges, parse the cell content and post the new data to the server
  // NOTE: Think about how to cache results to allow for offline editing or editing where the 
  // connection is poor
  handleRowChange = ({ fromRow, toRow, updated }) => {
    let { wet_id, grp_id, route, per_id } = this.rows.slice()[fromRow]
    // FIXME: Add method here to retrieve the "original" result for the climber (if it exists) and
    // modify that, rather than discarding it completely
    let result_jsonb = Object.entries(updated).map(([k, v]) => ({ [k]: toObject(v) }))[0]
    this.props.rootStore.updateResults({ wet_id, grp_id, route, per_id, result_jsonb })
  }
}

export default inject('rootStore')(observer(DataGrid))

