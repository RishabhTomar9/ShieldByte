import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Transactions from './components/Transactions'
import AnalyticsPage from './components/AnalyticsPage'
import ProfilePage from './components/ProfilePage'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/transactions' element={<Transactions />}></Route>
      <Route path='/analytics' element={<AnalyticsPage />}></Route>
      <Route path='/profile' element={<ProfilePage />}></Route>
    </Routes>
    
  )
}

export default App