import React                from 'react'
import ReactDataGrid        from 'react-data-grid'

import { observer, inject } from 'mobx-react'

import { toString, toObject, resultAsString }   from '../services/reducer'


const personalia = [
  { key: 'per_id',    name: 'ID',        width: 72 },
  { key: 'lastname',  name: 'Lastname',  width: 96 },
  { key: 'firstname', name: 'Firstname', width: 96 },
  { key: 'nation',    name: 'Code',      width: 48 }
]

const blocs   = (num) => Array.from(Array(num), (x, i) => `p${i+1}`)

const columns = (num) => {
  let results = blocs(num).map((x) => ({ key: x, name: x, editable: true, width: 48 }))
  return personalia.concat(results).concat([{ key: 'result', name: 'Result', width: 96 }])
}

const resultsParser = (route) => route.map((x) => {
  let r = x.result_jsonb || {}
  let s = Object.entries(r).filter((x) => !!x).map(([k, v]) => ({ [k]: toString(v) }))
  let t = resultAsString(x.sort_values || [])
  return Object.assign({ result: t }, x, ...s)
})

const startorder = (a, b) => {
  if (a.start_order > b.start_order) return 1
  if (a.start_order < b.start_order) return -1

  if (a.lastname > b.lastname) return 1
  if (a.lastname < b.lastname) return -1

  return a.per_id - b.per_id
}

const dataMapper = (results) => {
  let arr = [...results.keys()].sort().map((x) => results.get(x))
                               .map(resultsParser)
  return [].concat(...arr).sort(startorder)
}

class DataGrid extends React.Component {
  componentDidMount() {
    this.props.rootStore.fetchResults()
  }

  // render an array of results
  render() {
    let numResults = this.props.rootStore.routes[0] < 2 ? 30 : 4
    this.keys      = blocs(numResults)
    this.columns   = columns(numResults)
    this.rows      = this.handleFilter()
    let height     = this.setHeight(this.rows.length)
    // let rows = this.state.rows
    return (<div style={{ width: 1600 }}>
      <ReactDataGrid
        style={{ width: 800 }}
        columns={this.columns}
        rowGetter={(i) => this.rows[i]}
        rowsCount={this.rows.length}
        minHeight={height}
        enableCellSelect={true} 
        onGridRowsUpdated={this.handleRowChange}
      /></div>
    )
  }

  setHeight = (num) => (num) * 36 + 64
    
  handleFilter = () => {
    let filterValue = this.props.rootStore.lastname.get()
    let results     = dataMapper(this.props.rootStore.results)
    return filterValue.length === 0
      ? results.slice(0, 60)
      : results.filter((x) => x.lastname.match(filterValue) || x.firstname.match(filterValue))
  }

  // update method used by ReactDataGrid
  handleRowChange = ({ fromRow, toRow, updated }) => {
    let { wet_id, grp_id, route, per_id } = this.rows.slice()[fromRow]
    let result_jsonb = Object.entries(updated).map(([k, v]) => ({ [k]: toObject(v) }))[0]
    this.props.rootStore.updateResults({ wet_id, grp_id, route, per_id, result_jsonb })
  }
}

export default inject('rootStore')(observer(DataGrid))

