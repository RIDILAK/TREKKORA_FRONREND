import SideBar from '@/Modules/Admin/Layout/SideBar'
import DashBoard from '@/Modules/Admin/Pages/DashBoard'
import GuideListDetails from '@/Modules/Admin/Pages/Guides/GuideListDetails'
import GuidesList from '@/Modules/Admin/Pages/Guides/GuidesList'
import PlacesList from '@/Modules/Admin/Pages/PlaceList/PlaceList'
import GuideRequests from '@/Modules/Admin/Pages/Requests/GuideRequests'
import UserList from '@/Modules/Admin/Pages/Users/UserList'
import UserListDetails from '@/Modules/Admin/Pages/Users/UserListDetails'
// import { Sidebar } from 'lucide-react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/sidebar' element={<SideBar/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/userlist' element={<UserList/>}/>
        <Route path='/userlistdetails/:id'element={<UserListDetails/>}/>  
         <Route path='/guideList'element={<GuidesList/>}/>
          <Route path='/guidelistdetails/:guideId' element={<GuideListDetails/>}/>
        <Route path='/placelist' element={<PlacesList/>}/>
        <Route path='/guideRequests' element={<GuideRequests/>}/>
       
        
      </Routes>
    </div>
  )
}

export default AdminRouter
