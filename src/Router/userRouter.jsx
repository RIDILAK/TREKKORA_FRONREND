import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from '../Modules/User/Registration/Register'
import SignUp from '../Modules/User/SignUp'
import Login from '../Modules/User/Registration/Login'

const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/signup'element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default UserRouter
