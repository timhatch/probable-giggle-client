import React, {Fragment}  from 'react'

import {Link}             from 'react-router-dom'

import Button             from '@material-ui/core/Button'

function Home() {
  return (
    <Fragment>
      <main>
        <h2>Options</h2>
      </main>
      <nav>
        <h3>Competition Administration</h3>
        <Button variant="outlined" style={{width: '12rem'}}>
          <Link to="/admin"  style={{textDecoration: 'none'}}>Administration</Link>
        </Button>
        <h3>Results Editors</h3>
        <Button variant="outlined"  style={{width: '12rem'}}>
          <Link to="/desktop" style={{textDecoration: 'none'}}>Desktop Scorer</Link>
        </Button>
          <br />
        <Button variant="outlined" style={{width: '12rem'}}>
          <Link to="/mobile"  style={{textDecoration: 'none'}}>Tablet Scorer</Link>
        </Button>
      </nav>
    </Fragment>
  )
}

export default Home
