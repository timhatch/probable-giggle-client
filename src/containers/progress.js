import React from 'react'

import { observer } from 'mobx-react'

import CircularProgress from '@material-ui/core/CircularProgress';

const Progress = observer((props) => {
  return (
    <div>
      <CircularProgress /> 
    </div>
  ) 
})

export default Progress
