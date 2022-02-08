import React, {Fragment}  from 'react'

import {Link}             from 'react-router-dom'

import Button             from '@material-ui/core/Button'

function Home() {
  return (
    <Fragment>
      <main>
        <h2>Results Editors</h2>
      </main>
      <nav>
        <Button variant="outlined"  className='undecorate wx12'>
          <Link to="/desktop">Desktop Scorer</Link>
        </Button>
          <br />
        <Button variant="outlined" className='undecorate wx12'>
          <Link to="/mobile">Tablet Scorer</Link>
        </Button>
      </nav>
    </Fragment>
  )
}

export default Home
