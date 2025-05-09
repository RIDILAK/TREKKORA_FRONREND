import React from 'react'
import { Routes, Route } from 'react-router-dom';
import GuideHome from '../Modules/Guide/Pages/GuideHome';

const guideRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='guidehome' element={<GuideHome/>}/>
      </Routes>
    </div>
  )
}

export default guideRouter;
