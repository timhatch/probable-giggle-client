import React, { Fragment } from 'react'

import { inject, observer } from 'mobx-react'

import PersonSelector from './person__selector'
import TabletScorer   from './tablet__scorer'

class TabletScreen extends React.Component {
  componentDidMount() {
    this.props.rootStore.fetchResults()
  }

  render() {
    let value   = this.props.rootStore.uistate.get('currentStarter') || 1
    let results = [].concat(...this.props.rootStore.results.values()) || []
    let person  = results.find((x) => x.start_order === value) || null
    let config  = { value, results, person }
    return (
      <Fragment>
        <PersonSelector {...config} />
        <TabletScorer   {...config} />
      </Fragment>
    )
  }
}

export default inject('rootStore')(observer(TabletScreen))
