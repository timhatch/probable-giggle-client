import React from 'react'

import { observer }   from 'mobx-react'
import { Swipeable }  from 'react-swipeable'
import styled         from 'styled-components'

import { isNull }     from '../../services/reducer'

const SwipeWrapper = styled(Swipeable)`
  margin            : 3em auto;
  text-align        : center;
  box-sizing        : border-box;
`
const Title = styled.div`
  margin            : 0 auto 0.5em auto;
  
  font              : 1.0em/1.0em SansBold, sans-serif;
  letter-spacing    : .2em;
  text-transform    : uppercase;
`
const Value = styled.div`
  height            : 2.0em; 
  width             : 2.0em; 
  margin            : 0 auto 0 auto;
  
  font              : 2.5em/2.0em SansRegular, sans-serif;
  
  color             : rgba(1, 1, 1, 0.6);
  border            : 0.1em solid rgba(0, 0, 0, 0.25);
  border-radius     : 50%;
`

const options = { trackMouse: true }

const SwipeCell = observer((props) => (
  <SwipeWrapper {...props} {...options} >
    <Title>{props.title}</Title>
    <Value>{isNull(props.result) ? '-' : props.result}</Value>
  </SwipeWrapper>
))

export default SwipeCell

