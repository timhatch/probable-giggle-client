import React, {Fragment} from 'react';
import styled            from 'styled-components'

import Divider           from '@material-ui/core/Divider';
import RadioButtonsGroup from './results__drawer__radiogroup'

const StyledHeader = styled.div`
  font              : 1.0rem/1.0rem SansRegular, sans-serif !important;
  margin            : 1rem 0 1rem 2rem;
  color             : rgba(0, 0, 0, 0.541176);
`

function SortOrderOptions() {
  return (
    <Fragment>
      <Divider style={{marginBottom: '8px'}}/>
        <StyledHeader>Sort options</StyledHeader>
      <RadioButtonsGroup />
    </Fragment>
  )
}

export default SortOrderOptions
