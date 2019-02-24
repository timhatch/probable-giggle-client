import React from 'react'

import { inject, observer } from 'mobx-react'
import { Swipeable } from 'react-swipeable'

import SwipeCell  from './scorer__cell'
import styled         from 'styled-components'

import { isNull } from '../../services/reducer'

const Wrapper = styled(Swipeable)`
  font-size         : ${props => props.scale};      
`

const options = { trackMouse: true }

class TabletScorer extends React.Component {
  constructor(props) {
    super(props)
    // Replace by calls to the STORE
    this.comp        = { wet_id: 6, route: 3, grp_id: 5 }
    this.bloc        = 1
    this.start_order = 1
    this.per_id      = 8247
    this.result      =  { a: 0, b: null, t: null }

    this.scale = Math.round(14 * window.innerHeight / 596) + 'px'
  }

  render() {
    let result = this.result
    // let result = this.props.rootStore.GE:w
    // TRESULTFORSELECTEDCLIMBER || _result
    return (
      <Wrapper onSwiped={this.handleVSwipe} {...options} scale={this.scale}>
        <SwipeCell result={result.t} onSwiped={this.handleHSwipe('t')} title='top'  />
        <SwipeCell result={result.b} onSwiped={this.handleHSwipe('b')} title='zone' />
        <SwipeCell result={result.a} onSwiped={this.handleHSwipe('a')} title='attempts' />
      </Wrapper>
    )
  }

  handleHSwipe = (type) => (e) => {
    let val = 1 // this.props.rootStore.GETRESULTFORSELECTEDCLIMBER.a || null

    if (e.dir === 'Right') this.setResult(type, val ) 
    if (e.dir === 'Left')  this.setResult(type, null) 
  }

  handleVSwipe = (e) => {
    let a = isNull(this.result.a) ? 0 : this.result.a
    // isNull(this.props.rootStore.GETRESULTFORSELECTEDCLIMBER) ? 0 : this.props.rootStore.GETRESULTFORSELECTEDCLIMBER
    
    if (e.dir === 'Up')   this.setAttempts(a - 1)
    if (e.dir === 'Down') this.setAttempts(a + 1)
  } 

  setAttempts = (value) => {
    let result = parseInt(value, 10) > 0 ? parseInt(value, 10) : null
    let per_id = this.per_id
    let result_jsonb = { [`p${this.bloc}`]: { a: result }}
    this.props.rootStore.updateResults({ ...this.comp, per_id, result_jsonb })
  }

  setResult = (key, val) => {
    // TODO: HANDLE CASE WHERE BONUS HAS NOT BEEN SWIPED WHEN TOP IS SWIPED
    let result = this.result[key]
    if (result === null || val === null) {
      let per_id       = this.per_id
      let value        = parseInt(val, 10) || null
      let result_jsonb = { [`p${this.bloc}`]: { [key]: value }}
      this.props.rootStore.updateResults({ ...this.comp, per_id, result_jsonb })
    } 
  }
}

export default inject('rootStore')(observer(TabletScorer))

