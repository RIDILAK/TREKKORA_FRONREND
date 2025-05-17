import SideBar from '@/Modules/Admin/Layout/SideBar'
// import { Sidebar } from 'lucide-react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/sidebar' element={<SideBar/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
