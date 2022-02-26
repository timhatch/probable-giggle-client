import React              from 'react'

import Chip               from '@material-ui/core/Chip'
import {observer, inject} from 'mobx-react'


function LockStateButton({rootStore}) {

  const handleClick = (e) => {
    const locked = isLocked(rootStore.results) ? false : true
    const {wet_id, grp_id, route} = setParams(rootStore)

    rootStore.lockResults({wet_id, grp_id, route, locked})
  }
  
  const label = isLocked(rootStore.results) ? 'locked' : 'unlocked'
  const color = isLocked(rootStore.results) ? 'secondary' : 'default'

  return (
    <Chip style={{width: '8rem'}} {...{color, label}} onClick={handleClick} />)
}

export default inject('rootStore')(observer(LockStateButton))

// Consider the state of the dataset to be locked if any result is locked
function isLocked(results) {
  const data = [...results.keys()].flatMap((x) => results.get(x))
  
  return data.map(({locked}) => locked).includes(true)
}

// Get state data for the current competition/category/round
function setParams(rootStore) {
  const wet_id = rootStore.comp
  const grp_id = rootStore.grpid
  const route  = rootStore.routes[0]
  return {wet_id, grp_id, route}
}


