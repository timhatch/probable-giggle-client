import React from 'react'

import { inject, observer } from 'mobx-react'
import styled               from 'styled-components'

import InputLabel   from '@material-ui/core/InputLabel';
import MenuItem     from '@material-ui/core/MenuItem';
import FormControl  from '@material-ui/core/FormControl';
import Select       from '@material-ui/core/Select';

const StyledSelect = styled(Select)`
  font              : 1.0rem/1.0rem SansBold, sans-serif !important;
  margin            : 1rem 0 1rem 0;
  width             : 10rem;
`
const StyledItem = styled(MenuItem)`
  font              : 1.0rem/1.0rem SansRegular, sans-serif !important;
`
const StyledLabel = styled(InputLabel)`
  font              : 1.0rem/1.0rem SansRegular, sans-serif !important;
`
// renderMenuItems :: (x, i) -> (r)
// Pass in a data object {x} and return a react menuitem component with associated properties
const renderMenuItems = (x, i) => <StyledItem key={x.key} value={x.key} data={x.values}>{x.name}</StyledItem>

class Selector extends React.Component {
  render() {
    return (
      <FormControl style={{ marginLeft: '2rem' }} >
        <StyledLabel>{this.props.label}</StyledLabel>
        <StyledSelect
          value={this.props.rootStore.uistate.get(this.props.name) || 0}
          onChange={this.handleChange}>
          {this.props.items.map(renderMenuItems)}
        </StyledSelect>
      </FormControl>
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
