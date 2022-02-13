import React              from "react"

import {observer, inject} from 'mobx-react'

import Button             from '@material-ui/core/Button'

import {saveResults}      from '../services/utils-downloads'

function SaveButton({rootStore}) {
  return (
    <Button variant="outlined" 
            size='small' 
            style={{width: '8rem'}} 
            onClick={() => saveResults(rootStore)}
    >download</Button>
  )
}

export default inject('rootStore')(observer(SaveButton))
