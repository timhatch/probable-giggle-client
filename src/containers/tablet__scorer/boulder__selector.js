import React from 'react'

import { inject, observer } from 'mobx-react'

import styled   from 'styled-components'

import ArrowBack    from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import IconButton   from '@material-ui/core/IconButton'
import InputLabel   from '@material-ui/core/InputLabel';

const Wrapper = styled.div`
  width           : 11.5rem;
  margin-left     : 1.0rem;

  display         : flex;
  flex-direction  : row;
  justify-content : space-between;
  align-items     : center;
`
const Boulder = styled.div`
  font              : 1.25rem/1.25rem SansBold, sans-serif !important;
`
const StyledLabel = styled(InputLabel)`
  margin-left       : 2rem;
  font              : 0.75rem/0.75rem SansRegular, sans-serif !important;
`

class BoulderSelector extends React.Component {
  render() {
    this.value = this.props.rootStore.uistate.get('currentBoulder') || 1
    return (
      <div>
        <StyledLabel>Boulder</StyledLabel>
        <Wrapper>
          <IconButton onClick={this.decrement}><ArrowBack /></IconButton>
          <Boulder>{this.value}</Boulder>
          <IconButton onClick={this.increment}><ArrowForward /></IconButton>
        </Wrapper>
      </div>
    )  
  }

  increment = () => {
    let value = Math.min(this.props.rootStore.blocs, this.value + 1)
    this.props.rootStore.setUIState({ currentBoulder: value }) 
  }

  decrement = () => {
    let value = Math.max(0, this.value - 1) 
    this.props.rootStore.setUIState({ currentBoulder: value }) 
  }
}

export default inject('rootStore')(observer(BoulderSelector))
