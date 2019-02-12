import React    from 'react'

import { inject, observer } from 'mobx-react'
import styled               from 'styled-components'

import InputBase  from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/FilterList'

const Search = styled.div`
  display           : flex;
  flex-direction    : row;
  background-color  : #ffffff44;
  margin-left       : 2rem;
  padding           : 0.25rem 0.5rem 0 0.5rem;
`

const Name = styled(InputBase)`
  margin-left       : 1rem;
  color             : white !important;
  font              : 1.0rem/1.0rem SansBold, sans-serif !important;
`
// Class definition
class FilterBar extends React.Component {
  render() {
    return (
    <Search>
      <SearchIcon style={{ paddingTop: 2 }} />
      <Name placeholder="First|Lastname..." onChange={this.addFilter} />
    </Search>
  )}

  // addFilter :: (e) -> ()
  // Update the mobx filter value based on use input
  addFilter = (e) => this.props.rootStore.updateFilterValue(e.target.value)
}

export default inject('rootStore')(observer(FilterBar))


