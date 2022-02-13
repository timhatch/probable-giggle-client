import React              from 'react'

import Chip               from '@material-ui/core/Chip'
import {observer, inject} from 'mobx-react'


function LockStateButton({rootStore}) {

  const handleClick = (e) => {
    const locked = isLocked(rootStore.results) ? false : true
    const {wet_id, grp_id, route} = getParams(rootStore.results)
    rootStore.lockResults({wet_id, grp_id, route, locked})
  }
  
  const label = isLocked(rootStore.results) ? 'locked' : 'unlocked'
  const color = isLocked(rootStore.results) ? 'secondary' : 'default'

  return (
    <Chip style={{width: '8rem'}} {...{color, label}} onClick={handleClick} />)
}

export default inject('rootStore')(observer(LockStateButton))

function isLocked(results) {
  const data = [...results.keys()].flatMap((x) => results.get(x))
  
  return data.map(({locked}) => locked).includes(true)
}

function getParams(results) {
  return [...results.keys()].flatMap((x) => results.get(x))[0]
}


