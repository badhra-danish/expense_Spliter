import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar/Sidebar'

function Layout() {
  return (
    <>
       <Header/>
       <div className='flex'>
       <Sidebar/>
       <Outlet/>
       </div>
      
    </>
  )
}

export default Layout
