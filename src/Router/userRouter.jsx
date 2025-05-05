import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from '../Modules/User/Registration/Register';
import Login from '../Modules/User/Registration/Login';
import Signup from '../Modules/User/Registration/SignUp';
import Home from '../Modules/User/Pages/Home';
import Navbar from '../Modules/User/LayOut/NavBar';
import Footer from '../Modules/User/LayOut/Footer.jsx';
import PlacePage from '../Modules/User/Pages/Places/PlacePage.jsx';
import PlaceDetails from '../Modules/User/Pages/Places/PlaceDetailsPage.jsx';
import About from '../Modules/User/Pages/About.jsx';

const UserRouter = () => {
  const location = useLocation();

  
  const hideLayoutRoutes = ['/register', '/signup', '/login'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='navbar' element={<Navbar />} />
        <Route path='footer' element={<Footer />} />
        <Route path='explore' element={<PlacePage />} />
        <Route path='PlaceDetails/:id' element={<PlaceDetails />} />
        <Route path='about' element={<About />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default UserRouter;
