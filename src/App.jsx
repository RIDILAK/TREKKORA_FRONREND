import React from 'react'
import UserRouter from './Router/userRouter'
import GuideRouter from './Router/guideRouter'
import AdminRouter from './Router/adminRouter'
// import UserRouter from './Router/userRouter'

const App = () => {
  return (
    <div>
    <UserRouter/>
    <GuideRouter/>
    <AdminRouter/>
    
    
    {/* <h1 className='bg-green-500'>hgf</h1> */}
    </div>
  )
}

export default App
