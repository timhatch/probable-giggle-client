import React      from 'react';

import { inject, observer } from 'mobx-react'
import styled               from 'styled-components'

import Drawer     from '@material-ui/core/Drawer';
import Divider    from '@material-ui/core/Divider';
import ClearIcon  from '@material-ui/icons/Clear';

import Selector        from './results__drawer__selectors'
import Controller      from './results__drawer__iconbutton'
import BoulderSelector from '../tablet__scorer/boulder__selector'

import {comps, routes, cats}  from '../../params'

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
