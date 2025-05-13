import React from 'react'
import { Routes, Route } from 'react-router-dom';
import GuideHome from '../Modules/Guide/Pages/GuideHome';
import AddGuideProfile from '../Modules/Guide/Pages/AddGuideProfile';

const guideRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/guidehome' element={<GuideHome/>}/>
        <Route path='/addguideprofile' element={<AddGuideProfile/>}/>
      </Routes>
    </div>
  )
}

export default guideRouter;
