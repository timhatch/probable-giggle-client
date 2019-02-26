import React      from 'react';

import { inject, observer } from 'mobx-react'
import styled               from 'styled-components'

import Drawer     from '@material-ui/core/Drawer';
import Divider    from '@material-ui/core/Divider';
import ClearIcon  from '@material-ui/icons/Clear';

import Selector        from './results__drawer__selectors'
import Controller      from './results__drawer__iconbutton'
import BoulderSelector from '../tablet__scorer/boulder__selector'

// competition menu items
// FIXME: WE could replace this by retrieving the relevant list from the store
const comps = [
  { key: 0, values: 1, name: 'Test Comp'},
  { key: 1, values: 4, name: '2018 CWIF' },
  { key: 2, values: 6, name: 'Team Selection' },
  { key: 3, values: 7, name: '2019 CWIF' }
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
  { key: 1, values: [6], name: 'Male' }
]

const Wrapper = styled.div`
  width             : 15rem;
`
const StyledHeader = styled.div`
  font              : 1.0rem/1.0rem SansRegular, sans-serif !important;
  margin            : 1rem 0 1rem 2rem;
  color             : rgba(0, 0, 0, 0.541176);
`
class ResultsDrawer extends React.Component {
  render() {

    let visible = this.props.rootStore.uistate.get('resultsDrawerOpen')
    return (
      <Drawer anchor="left" open={visible} onClose={this.toggleDrawer(false)}>
        {this.sideList}
      </Drawer>
    )
  }

  toggleDrawer = (open) => () => { 
    this.props.rootStore.setUIState({ resultsDrawerOpen: open })
  }

  sideList = (
    <Wrapper>
      <Controller style={{ margin: '8px' }} open={false}><ClearIcon /></Controller>
      <Divider style={{ marginBottom: '8px' }}/>
      <StyledHeader>Data options</StyledHeader>
      <Selector items={comps}  name='comp' label='Competition' />
      <Selector items={routes} name='routes' label='Route' />
      <Selector items={cats} name='cats' label='Categories'/>
      <BoulderSelector />
    </Wrapper>
  )
}

export default inject('rootStore')(observer(ResultsDrawer))
