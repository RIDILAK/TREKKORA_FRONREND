import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaBell,
  FaCalendarCheck,
  FaUser,
  FaHeart
} from 'react-icons/fa';
import mainlogo from "../../../assets/Trekkora-Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const notifyLoginRequired = () => {
    toast.warn("Please login to access this feature", {
      position: "top-right",
      autoClose: 2000,
      pauseOnHover: false,
      hideProgressBar: true,
      theme: "colored"
    });
  };

  const handleIconClick = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      notifyLoginRequired();
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate('/register');
  };

  const handleLogin = () => {
    setShowMenu(false);
    navigate('/register');
  };

  const handleProfileClick = () => {
    setShowMenu(false);
    navigate('/userprofile');
  };

  const toggleUserMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-[#9AB3A5] text-secondary p-4 sticky top-0 z-50 shadow-md">


        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src={mainlogo} alt="Logo" className="h-8 w-8 rounded-full" />
            <Link to="/" className="text-xl font-bold">Trekkora</Link>
          </div>

          {/* Links */}
          <div className="flex space-x-6 font-medium">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/explore" className="hover:text-white">Explore</Link>
            <Link to="/about" className="hover:text-white">About</Link>
          </div>

          {/* Icons */}
          <div className="flex space-x-6 items-center relative">
            <button onClick={() => handleIconClick('/messages')}>
              <FaEnvelope className="h-5 w-5 hover:text-white" />
            </button>
            <button onClick={() => handleIconClick('/notifications')}>
              <FaBell className="h-5 w-5 hover:text-white" />
            </button>
            <button onClick={() => handleIconClick('/userbooking')}>
              <FaCalendarCheck className="h-5 w-5 hover:text-white" />
            </button>
            <button onClick={() => handleIconClick('/wishlist')}>
              <FaHeart className="h-5 w-5 hover:text-white" />
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button onClick={toggleUserMenu}>
                <FaUser className="h-5 w-5 hover:text-white" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                  {!isLoggedIn ? (
                    <button
                      onClick={handleLogin}
                      className="block w-full px-4 py-2 text-left hover:bg-[#D9D9D9]"
                    >
                      Login
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleProfileClick}
                        className="block w-full px-4 py-2 text-left hover:bg-[#D9D9D9]"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-left hover:bg-[#D9D9D9]"
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
