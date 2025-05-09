import React from 'react'
import UserRouter from './Router/userRouter'
import GuideRouter from './Router/guideRouter'
// import UserRouter from './Router/userRouter'

const App = () => {
  return (
    <div>
    <UserRouter/>
    <GuideRouter/>

    {/* <h1 className='bg-green-500'>hgf</h1> */}
    </div>
  )
}

export default App
