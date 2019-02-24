import React from 'react'

import { inject, observer } from 'mobx-react'

import IconButton   from '@material-ui/core/IconButton'
import Select       from '@material-ui/core/Select';
import SomeIcon     from '@material-ui/core/SomeIcon'

const Selector = (props) => {
  return <Select
}

class ActiveClimber extends React.Component {
  render() {
    return (
      <div>
        <Selector />
        <IconButton onClick={this.getNextClimber}><SomeIcon /></IconButton>
      </div>
    )
  }

  getNextClimber = () => {
    let count = this.props.rootStore.uistate.get('count')   // Access a memoised count of the number of results
    let _this = this.props.rootStore.uistate.get('active')  // Get the start_order of the currently acive climber
    let _next = (_this >= count) ? 1 : _this + 1
    this.props.rootStore.setUIState({ active: _next })
  }
}

export default inject('rrotStore')(observer(ActiveClimber))
