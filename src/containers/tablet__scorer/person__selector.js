import React        from 'react'
import PropTypes    from 'prop-types'

import { inject, observer } from 'mobx-react'

import styled       from 'styled-components'

import ArrowBack    from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import IconButton   from '@material-ui/core/IconButton'

import { isNull }     from '../../services/reducer'

const Wrapper = styled.div`
  width           : 100%;
  padding         : 0 0 0.25rem 0;

  display         : flex;
  flex-direction  : row;
  justify-content : center;
  align-items     : center;

  border-bottom   : 1px solid #ddd;
`
const Current = styled.div`
  display         : flex;
  flex-direction  : row;
  align-items     : center;
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
  render() {
    let name = this.props.person ? `${this.props.person.lastname}, ${this.props.person.firstname[0]}` : ''
    return (
      <Wrapper>
        <IconButton onClick={this.decrement}><ArrowBack /></IconButton>
        <Current>
          <Starter>{this.props.value}</Starter>
          <Person>{name}</Person>
        </Current>
        <IconButton onClick={this.increment}><ArrowForward /></IconButton>
      </Wrapper>
    )
  }

  increment = () => {
    let value = this.props.value >= this.props.results.length ? 1 : this.props.value + 1
    this.confirmResult()
    this.props.rootStore.setUIState({ currentStarter: value })
  }

  decrement = () => {
    let value = Math.max(1, this.props.value - 1)
    this.props.rootStore.setUIState({ currentStarter: value })
  }

  confirmResult = () => {
    let bloc   = 'p' + this.props.rootStore.uistate.get('currentBoulder')
    let result = isNull(this.props.person.result_jsonb) 
      ? null
      : this.props.person.result_jsonb[bloc]

    if (!isNull(result)) {
      let { wet_id, grp_id, route, per_id } = this.props.person
      let result_jsonb = { ...this.props.person.result_jsonb, [bloc]: this.zeroise({...result}) }
      this.props.rootStore.updateResults({ wet_id, grp_id, route, per_id, result_jsonb })
    }
  }

  zeroise = (result) => {
    if (result.b > 0 && isNull(result.t)) result.t = 0 
    if (result.a > 0 && isNull(result.b)) result.b = 0 
    return result
  }
}

// Use propTypes for typechecking
PersonSelector.propTypes = {
  value:    PropTypes.number.isRequired,
  results:  PropTypes.array.isRequired,
  person:   PropTypes.object  // FIXME: Can be Object or null, needs stronger typechecking
}

export default inject('rootStore')(observer(PersonSelector))
