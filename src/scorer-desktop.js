import React          from 'react'

import HeaderBar      from './containers/header__bar'
import DataGrid       from './containers/data__grid'
import ResultsDrawer  from './containers/results__drawer/results__drawer'

function ScorerDesktop() {
  return (
    <div style={{marginTop: 64}}>
      <HeaderBar />
      <DataGrid />
      <ResultsDrawer />
    </div>
  );
}

export default ScorerDesktop
