import React from 'react'

import { inject, observer } from 'mobx-react'
import styled               from 'styled-components'

import MenuItem     from '@material-ui/core/MenuItem';
import Select       from '@material-ui/core/Select';

const Wrapper = styled.div`
  width             : 8rem;
  padding-top       : 0.25rem;
  margin-left       : 2rem;
  color             : white !important;
`
const StyledSelect = styled(Select)`
  font              : 1.0rem/1.0rem SansBold, sans-serif !important;
`
// renderMenuItems :: (x, i) -> (r)
// Pass in a data object {x} and return a react menuitem component with associated properties
const renderMenuItems = (x, i) => <MenuItem key={x.key} value={x.key} data={x.values}>{x.name}</MenuItem>

class Selector extends React.Component {
  render() {
    return (
      <Wrapper>
        <StyledSelect
          style={{ color: 'white' }}
          value={this.props.rootStore.uistate.get(this.props.name) || 0}
          onChange={this.handleChange}>
          {this.props.items.map(renderMenuItems)}
        </StyledSelect>
      </Wrapper>
    )}

  // handleChange :: (e, c) -> ()
  // For any change in the selector, update the ui-state, modify the request parameters
  // and then send a data request
  handleChange = (e, child) => { 
    let key = this.props.name
    this.props.rootStore.setUIState({ [key]: child.props.value })
    this.props.rootStore.setRequestParams({ [key]: child.props.data })
    this.props.rootStore.fetchResults()
  }
}

export default inject('rootStore')(observer(Selector))
