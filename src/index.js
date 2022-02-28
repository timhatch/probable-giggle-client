import React          from 'react';
import ReactDOM       from 'react-dom';

import Home           from './app'
import ScorerTablets  from './scorer-tablets'
import ScorerDesktop  from './scorer-desktop'
import Administration from './administration'

import {HashRouter}     from "react-router-dom";
import {Routes, Route}  from "react-router-dom";

import {Provider}     from 'mobx-react'

import Store          from './store' 
import HTTPService    from './services/perseus-accessor'

import './typography.css'
import './react-data-grid.css'
import './index.css'
import './index-mobile.css'

const store = new Store(HTTPService, { storageKey: 'test' })

ReactDOM.render(
  <Provider rootStore={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mobile" element={<ScorerTablets />} />
        <Route path="desktop" element={<ScorerDesktop />} />
        <Route path="admin" element={<Administration />} />
      </Routes>
    </HashRouter>
  </Provider>, document.getElementById('root')
)
