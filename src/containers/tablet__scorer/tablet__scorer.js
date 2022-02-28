import React        from 'react'
import PropTypes    from 'prop-types'

import {inject, observer} from 'mobx-react'

import styled       from 'styled-components'
import {Swipeable}  from 'react-swipeable'

import SwipeCell    from './scorer__cell'
import {isNull}     from '../../services/reducer'

const Wrapper = styled(Swipeable)`
  font-size         : ${props => props.scale};      
`

const options = {trackMouse: true}

class TabletScorer extends React.Component {
  constructor(props) {
    super(props)
    this.scale = Math.round(14 * window.innerHeight / 800) + 'px'
  }

  render() {
    if (isNull(this.props.person)) return null
    
    this.bloc   = 'p' + (this.props.rootStore.uistate.get('currentBoulder') || 1)
    this.result = isNull(this.props.person.result_jsonb) || isNull(this.props.person.result_jsonb[this.bloc])
      ? { a: null, b: null, t: null }
      : this.props.person.result_jsonb[this.bloc]

    return (
      <Wrapper onSwiped={this.handleVSwipe} {...options} scale={this.scale}>
        <SwipeCell result={this.result.t} onSwiped={this.handleHSwipe('t')} title='top'  />
        <SwipeCell result={this.result.Z} onSwiped={this.handleHSwipe('Z')} title='zone2' />
        <SwipeCell result={this.result.b} onSwiped={this.handleHSwipe('b')} title='zone1' />
        <SwipeCell result={this.result.a} onSwiped={this.handleHSwipe('a')} title='attempts' />
      </Wrapper>
    )
  }

  handleHSwipe = (type) => (e) => {
    let val = this.result.a || null
    if (e.dir === 'Right') this.setResult(type, val ) 
    if (e.dir === 'Left')  this.setResult(type, null) 
  }

  // TODO: Deal with the case where no zone has been entered
  setResult = (key, val) => {
    if (isNull(key)) return

    if (isNull(val))              this.update(key, val)
    if (isNull(this.result[key])) this.update(key, val)
  }

  handleVSwipe = (e) => {
    let val = isNull(this.result.a) ? 0 : this.result.a
    if (e.dir === 'Down')   this.setAttempts(val - 1)
    if (e.dir === 'Up') this.setAttempts(val + 1)
  } 

  setAttempts = (val) => {
    let atts = val > 0 ? val : null
    this.update('a', atts)
  }

  update = (key, val) => {
    let {wet_id, grp_id, route, per_id} = this.props.person
    let result       = {...this.result, [key]: val}
    let result_jsonb = {...this.props.person.result_jsonb, [this.bloc]: result}

    this.props.rootStore.updateResults({wet_id, grp_id, route, per_id, result_jsonb})
  }
}

// Use propTypes for typechecking
TabletScorer.propTypes = {
  value:    PropTypes.number.isRequired,
  results:  PropTypes.array.isRequired,
  person:   PropTypes.object  // FIXME: Can be Object or null, needs stronger typechecking
}

export default inject('rootStore')(observer(TabletScorer))

