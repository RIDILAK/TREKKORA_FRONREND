import SideBar from '@/Modules/Admin/Layout/SideBar'
import DashBoard from '@/Modules/Admin/Pages/DashBoard'
import GuideListDetails from '@/Modules/Admin/Pages/Guides/GuideListDetails'
import GuidesList from '@/Modules/Admin/Pages/Guides/GuidesList'
import AddPlace from '@/Modules/Admin/Pages/PlaceList/AddPlace'
import PlacesList from '@/Modules/Admin/Pages/PlaceList/PlaceList'
import PlaceListDetails from '@/Modules/Admin/Pages/PlaceList/PlaceListDetails'
import Rating from '@/Modules/Admin/Pages/Ratings/Rating'
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
        <Route path='placelistdetails/:id'element={<PlaceListDetails/>}/>
        <Route path='/guideRequests' element={<GuideRequests/>}/>
        <Route path='/addplace'element={<AddPlace/>}/>
        <Route path='/rating'element={<Rating/>}/>
       
        
      </Routes>
    </div>
  )
}

export default AdminRouter
