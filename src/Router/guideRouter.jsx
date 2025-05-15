import React from 'react'
import { Routes, Route } from 'react-router-dom';
import GuideHome from '../Modules/Guide/Pages/GuideHome';
import AddGuideProfile from '../Modules/Guide/Pages/AddGuideProfile';
import Requests from '../Modules/Guide/Pages/Requests';
import UpcomingRequests from '../Modules/Guide/Pages/UpcomingRequests';
import GuideProfile from '../Modules/Guide/Pages/Profile/GuideProfile';

const guideRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/guidehome' element={<GuideHome/>}/>
        <Route path='/addguideprofile' element={<AddGuideProfile/>}/>
        <Route path='/TripRequests' element={<Requests/>}/>
         <Route path='/upcomingRequests'element={<UpcomingRequests/>}/>
         

      </Routes>
    </div>
  )
}

export default guideRouter;
