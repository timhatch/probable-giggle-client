import React    from 'react';

import styled               from 'styled-components'

import AppBar   from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import FilterBar from './filter__bar'
import Selector  from './selector'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#7b1fa2',
    },
    secondary: {
      main: '#2196f3',
    },
  },
})

const Title = styled.div`
  font              : 1.25rem/1.25rem SansBold, sans-serif !important;
`
// competition menu items
// FIXME: WE could replace this by retrieving the relevant list from the store
const comps = [
  { key: 0, values: 1, name: 'Test Comp'},
  { key: 1, values: 4, name: '2018 CWIF' },
  { key: 2, values: 6, name: '2019 CWIF' },
]

// route menuitems
const routes = [ 
  { key: 0, values: [0], name: 'Qualification' }, 
  { key: 1, values: [2], name: 'Semifinal' }, 
  { key: 2, values: [3], name: 'Final' }
]

// category menuitems
const cats = [ 
  { key: 0, values: [5], name: 'Female' }, 
  { key: 1, values: [6], name: 'Male' },
  { key: 2, values: [6, 5], name: 'Combined' }
]

// Functional component definition
const HeaderBar = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar position='fixed'>
      <Toolbar>
        <Title>Results</Title>
        <Selector items={comps}  name='comp' />
        <Selector items={routes} name='routes' />
        <Selector items={cats}   name='cats' />
        <FilterBar />  
      </Toolbar>
    </AppBar>
 </MuiThemeProvider>
)

export default HeaderBar

