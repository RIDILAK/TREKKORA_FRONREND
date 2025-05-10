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
import GuidePage from '../Modules/User/Pages/Guide/GuidePage.jsx';
import GuideDetails from '../Modules/User/Pages/Guide/GuideDetailsPage.jsx';
import WishList from '../Modules/User/Pages/WishList/WishList.jsx';
import Booking from '../Modules/User/Pages/Booking/Booking.jsx';
import UserBookings from '../Modules/User/Pages/Booking/UserBookings.jsx';
import UserProfile from '../Modules/User/Pages/Profile/UserProfile.jsx';


const UserRouter = () => {
  const location = useLocation();

  // const hideLayoutRoutes = ['/register', '/signup', '/login'];
  // const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {/* {!shouldHideLayout && <Navbar />} */}
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
        <Route path='guide' element={<GuidePage />} />
        <Route path='guideDetails/:id' element={<GuideDetails/>}/>
        <Route path='wishList' element={<WishList/>}/>
       <Route path='booking/:placeId' element={<Booking/>}/>
       <Route path='userbooking'element={<UserBookings/>}/>
       <Route path='userprofile'element={<UserProfile/>}/>
      </Routes>
      {/* {!shouldHideLayout && <Footer />} */}
    </div>
  );
};

export default UserRouter;
