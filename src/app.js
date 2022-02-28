import React   from 'react'
import styled  from 'styled-components'

import {Link}  from 'react-router-dom'

import Button  from '@material-ui/core/Button'

const VFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 10rem;
  margin: 1rem 0;
`

const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function Home() {
  return (
    <Container>
      <VFlex>
        <h3>Results Editors</h3>
        <Button variant="outlined"  style={{width: '12rem'}}>
          <Link to="/desktop" style={{textDecoration: 'none'}}>Desktop Scorer</Link>
        </Button>
          <br />
        <Button variant="outlined" style={{width: '12rem'}}>
          <Link to="/mobile"  style={{textDecoration: 'none'}}>Tablet Scorer</Link>
        </Button>
      </VFlex>
      <VFlex>
        <h3>Administration</h3>
        <Button variant="outlined" style={{width: '12rem'}}>
          <Link to="/admin"  style={{textDecoration: 'none'}}>Administration</Link>
        </Button>
      </VFlex>
    </Container>
  )
}

export default Home
