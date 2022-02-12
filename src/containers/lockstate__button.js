import React              from 'react'

import Chip               from '@material-ui/core/Chip'
import {observer, inject} from 'mobx-react'


function LockStateButton(props) {

  const handleClick = (e) => {
    const locked = isLocked(props.rootStore.results) ? false : true
    const {wet_id, grp_id, route} = getParams(props.rootStore.results)
    props.rootStore.lockResults({wet_id, grp_id, route, locked})
  }
  
  const label = isLocked(props.rootStore.results) ? 'locked' : 'unlocked'
  const color = isLocked(props.rootStore.results) ? 'secondary' : 'gray'
  return (
    <Chip label={label} style={{width: '8rem'}} color={color} onClick={handleClick} />)
}

export default inject('rootStore')(observer(LockStateButton))

function isLocked(results) {
  const data = [...results.keys()].flatMap((x) => results.get(x))
  
  return data.map(({locked}) => locked)
             .includes(true)
}

function getParams(results) {
  return [...results.keys()].flatMap((x) => results.get(x))[0]
}


