import React    from 'react';

import styled   from 'styled-components'

import AppBar   from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar';
import SettingsIcon from '@material-ui/icons/Settings';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import FilterBar    from './filter__bar'
import Controller   from './results__drawer/results__drawer__iconbutton'

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
  font : 1.25rem/1.25rem SansBold, sans-serif !important;
  width: 60px;
`

// Functional component definition
const HeaderBar = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar position='fixed'>
      <Toolbar>
        <Title>Results</Title>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <FilterBar />  
          <Controller open={true} style={{ color: 'white' }}><SettingsIcon /></Controller>
        </div>
      </Toolbar>
    </AppBar>
 </MuiThemeProvider>
)

export default HeaderBar

