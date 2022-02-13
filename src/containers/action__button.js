import React              from "react"

import {observer, inject} from 'mobx-react'

import Button             from '@material-ui/core/Button'

function ActionButton({rootStore, actiontext}) {
  const handleClick = (e) => {
    const params = setParams(rootStore)
    rootStore.deleteResults(actiontext, params)
  }
  
  return (
    <Button variant="outlined" size='small' style={{width: '8rem'}} onClick={handleClick}>{actiontext}</Button>
  )
}

export default inject('rootStore')(observer(ActionButton))

function setParams(rootStore) {
  const wet_id = rootStore.comp
  const grp_id = rootStore.grpid
  const route  = rootStore.routes[0]
  return {wet_id, grp_id, route}
}
