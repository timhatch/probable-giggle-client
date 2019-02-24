import React from 'react'

import { inject, observer } from 'mobx-react'

import styled   from 'styled-components'

import ArrowBack    from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import IconButton   from '@material-ui/core/IconButton'

const Wrapper = styled.div`
  width           : 100%;
  padding         : 0 0 0.25rem 0;

  display         : flex;
  flex-direction  : row;
  justify-content : center;
  align-items     : center;

  border-bottom   : 1px solid #ddd;
`
const Starter = styled.div`
  display         : inline-block;
  width           : 2rem;
  margin          : 0 0 0 0.5rem;

  font            : 1.25rem/1.25rem SansRegular, sans-serif !important;
`
const Person = styled.div`
  display         : inline-block;
  width           : 8rem;
  margin          : 0 0.5rem 0 0;

  font            : 1.25rem/1.25rem SansBold, sans-serif !important;
  white-space     : nowrap; 
  overflow        : hidden;
  text-overflow   : ellipsis;
`

class PersonSelector extends React.Component {
  componentDidMount() {
    this.props.rootStore.fetchResults()
  }

  render() {
    this.value = this.props.rootStore.uistate.get('currentPerson') || 1
    this.array = [].concat(...this.props.rootStore.results.values())
    let person = this.array.find((x) => x.start_order === this.value)
    let name   = person ? `${person.lastname}, ${person.firstname[0]}` : ''
    return (
      <div>
        <Wrapper>
          <IconButton onClick={this.decrement}><ArrowBack /></IconButton>
          <div>
            <Starter>{this.value}</Starter>
            <Person>{name}</Person>
          </div>
          <IconButton onClick={this.increment}><ArrowForward /></IconButton>
        </Wrapper>
      </div>
    )
  }

  increment = () => {
    let value = this.value >= this.array.length ? 1 : this.value + 1
    this.props.rootStore.setUIState({ currentPerson: value })
  }

  decrement = () => {
    let value = Math.max(1, this.value - 1)
    this.props.rootStore.setUIState({ currentPerson: value })
  }
}

export default inject('rootStore')(observer(PersonSelector))
