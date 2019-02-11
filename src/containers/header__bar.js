import React    from 'react';

import styled               from 'styled-components'

import AppBar   from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import FilterBar from './filter__bar'
import Selector  from './selector'

const theme = createMuiTheme({
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

const routes = [ 
  { values: [0], name: 'Qualification' }, 
  { values: [2], name: 'Semifinal' }, 
  { values: [3], name: 'Final' }
]

const cats = [ 
  { values: [5], name: 'Female' }, 
  { values: [6], name: 'Male' }
]

const HeaderBar = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar position='fixed'>
      <Toolbar>
        <Title>Results Entry</Title>
        <Selector items={routes} name='routes' />
        <Selector items={cats}   name='cats' />
        <FilterBar />  
      </Toolbar>
    </AppBar>
 </MuiThemeProvider>
)

export default HeaderBar

