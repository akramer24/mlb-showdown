import React from 'react'

import { NavBar } from './components'
import Routes from './routes'


const App = () => {
  return (
    [
      <NavBar key={'navbar'} />,
      <Routes key={'routes'} />
    ]
  )
}

export default App
