import React          from 'react';
import ReactDOM       from 'react-dom';

import {Provider}     from 'mobx-react'

import Home           from './app'
import ScorerTablets  from './scorer-tablets'
import ScorerDesktop  from './scorer-desktop'
import Administration from './administration'

import {BrowserRouter}  from "react-router-dom";
import {Routes, Route}  from "react-router-dom";

import Store          from './store' 
import HTTPService    from './services/perseus-accessor'

import './typography.css'
import './react-data-grid.css'
import './index.css'

const store = new Store(HTTPService, { storageKey: 'test' })

ReactDOM.render(
  <Provider rootStore={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mobile" element={<ScorerTablets />} />
        <Route path="desktop" element={<ScorerDesktop />} />
        <Route path="admin" element={<Administration />} />
      </Routes>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
)
