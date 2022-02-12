import React          from 'react'

import HeaderBar      from './containers/header__bar'
import DataGrid       from './containers/data__grid'
import ResultsDrawer  from './containers/results__drawer/results__drawer'

import LockStateButton      from './containers/lockstate__button'

function ScorerDesktop() {
  return (
    <div style={{marginTop: 64}}>
      <HeaderBar />
      <DataGrid />
      <ResultsDrawer />
      <LockStateButton />
    </div>
  );
}

export default ScorerDesktop
