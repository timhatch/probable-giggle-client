import React          from 'react'

// Tablet implementation
import TabletHeader   from './containers/header__bar-tablet'
import TabletScreen   from './containers/tablet__scorer/tablet__screen'
import TabletDrawer   from './containers/results__drawer/results__drawer-tablet'

function ScorerTablets() {
  return (
    <div style={{marginTop: 64}}>
      <TabletHeader />
      <TabletScreen />
      <TabletDrawer />
    </div>
  );
}

export default ScorerTablets
