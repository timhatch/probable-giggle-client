import React                  from 'react';

import {inject, observer}     from 'mobx-react'
import styled                 from 'styled-components'

import Drawer                 from '@material-ui/core/Drawer';
import Divider                from '@material-ui/core/Divider';
import ClearIcon              from '@material-ui/icons/Clear';

import Selector               from './results__drawer__selectors'
import Controller             from './results__drawer__iconbutton'
import SortOrderOptions       from './sort__options'

import LockStateButton        from '../buttons/lockstate__button'
import ActionButton           from '../buttons/action__button'
import SaveButton             from '../buttons/save__button'

import {comps, routes, cats}  from '../../params'

const Wrapper = styled.div`
  width             : 15rem;
`
const StyledHeader = styled.div`
  font              : 1.0rem/1.0rem SansRegular, sans-serif !important;
  margin            : 1rem 0 1rem 2rem;
  color             : rgba(0, 0, 0, 0.541176);
`

const Administration = styled.div`
  display:          flex;
  flex-wrap:        wrap;
  flex-direction:   row;
  justify-content:  space-around;

  margin:           0.5rem 1rem;
`

class ResultsDrawer extends React.Component {
  render() {

    let visible = this.props.rootStore.uistate.get('resultsDrawerOpen')
    return (
      <Drawer anchor="right" open={visible} onClose={this.toggleDrawer(false)}>
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
      <SortOrderOptions />
      <Divider style={{ marginBottom: '8px' }}/>
      <StyledHeader>Status</StyledHeader>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
        <LockStateButton />
      </div>
      <StyledHeader>Administration</StyledHeader>
      <Administration> 
        <SaveButton />
      </Administration>
      <Administration> 
        <ActionButton actiontext='reset' color='warning' />
        <ActionButton actiontext='delete' />
      </Administration>
    </Wrapper>
  )
}

export default inject('rootStore')(observer(ResultsDrawer))
