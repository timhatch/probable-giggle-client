import React    from 'react';

import AppBar   from '@material-ui/core/AppBar'
import Toolbar  from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Controller   from './results__drawer/results__drawer__iconbutton'
import TitleBar     from './title__bar-tablet'

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

// Functional component definition
const HeaderBar = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar position='fixed'>
      <Toolbar>
        <Controller open={true} style={{ color: 'white' }}><MenuIcon /></Controller>
        <TitleBar />
      </Toolbar>
    </AppBar>
 </MuiThemeProvider>
)

export default HeaderBar

