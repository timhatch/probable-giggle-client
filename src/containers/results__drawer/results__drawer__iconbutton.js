import React      from 'react';

import { inject, observer } from 'mobx-react'

import IconButton from '@material-ui/core/IconButton'

class Controller extends React.Component {
  render () {
    return (
      <IconButton onClick={this.toggleVisibility(this.props.open)} style={this.props.style}>
        {this.props.children}
      </IconButton>
    )
  }

  toggleVisibility = (open) => () => { 
    this.props.rootStore.setUIState({ resultsDrawerOpen: open }) 
  }
}

export default inject('rootStore')(observer(Controller))

