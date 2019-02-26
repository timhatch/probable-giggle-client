import React    from 'react';

import { inject, observer } from 'mobx-react'
import styled   from 'styled-components'

const Title = styled.div`
  font : 1.25rem/1.25rem SansBold, sans-serif !important;
`

class TitleBar extends React.Component {
  render() {
    let round = ['Q','S','F'][this.props.rootStore.uistate.get('routes') || 0]
    let gendr = ['F','M'][this.props.rootStore.uistate.get('cats') || 0]
    let bloc  = this.props.rootStore.uistate.get('currentBoulder') || 1
    return (
      <Title>
        {`${round} / ${gendr} / ${bloc}`}
      </Title>
    )
  }
}

export default inject('rootStore')(observer(TitleBar))
