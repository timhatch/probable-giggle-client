import React              from "react"

import {observer, inject} from 'mobx-react'

import Button             from '@material-ui/core/Button'

import {saveResults}      from '../../services/utils-downloads'

function SaveButton({rootStore}) {
  return (
    <Button size='small' 
            color='primary'
            style={{width: '6rem',  margin: '0 0.5rem'}} 
            onClick={() => saveResults(rootStore)}>download</Button>
  )
}

export default inject('rootStore')(observer(SaveButton))
