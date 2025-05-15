import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Transactions from './components/Transactions'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/transactions' element={<Transactions />}></Route>
    </Routes>
    
  )
}

export default App