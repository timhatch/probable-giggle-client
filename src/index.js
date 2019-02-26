import React        from 'react';
import ReactDOM     from 'react-dom';

import { Provider } from 'mobx-react'

import HeaderBar    from './containers/header__bar'
import DataGrid     from './containers/data__grid'
import ResultsDrawer  from './containers/results__drawer/results__drawer-desktop'

import Store        from './store' 

import HTTPService  from './services/perseus-accessor'

import './typography.css'
import './react-data-grid.css'
import './index.css'

const store = new Store(HTTPService, { storageKey: 'test' })

ReactDOM.render(
  <Provider rootStore={store}>
    <div style={{ marginTop: 64 }}>
      <HeaderBar />
      <DataGrid />
      <ResultsDrawer />
    </div>
  </Provider>, document.getElementById('root')
)
