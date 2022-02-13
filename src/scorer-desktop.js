import React          from 'react'

import HeaderBar      from './containers/header__bar'
import DataGrid       from './containers/data__grid'
import ResultsDrawer  from './containers/results__drawer/results__drawer'

import LockStateButton  from './containers/lockstate__button'
import ActionButton     from './containers/action__button'
import SaveButton       from './containers/save__button'

function ScorerDesktop() {
  return (
    <div style={{marginTop: 64}}>
      <HeaderBar />
      <DataGrid />
      <ResultsDrawer />
      <LockStateButton />
      <ActionButton actiontext='reset' />
      <ActionButton actiontext='delete' />
      <SaveButton />
    </div>
  );
}

export default ScorerDesktop
