import React from 'react'
import Main from './features/Main/Main'
import { Routes, Route } from 'react-router-dom'

class App extends React.Component <any, any> {
  render() {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Main type={'normal'}/>}/>
          <Route path='/add' element={<Main type={'add'}/>} />
          <Route path='/edit/:id' element={<Main type={'edit'}/>}/>
        </Routes>
      </div>
    )
  }
}

export default App