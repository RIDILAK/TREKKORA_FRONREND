import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/User/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res) => setUser(res.data.data))
      .catch((error) => console.error("Error in Fetching User", error));
  }, []);

  const handleDeleteAccount = () => {
    // This would be replaced with actual delete API call
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    
    axios.delete(`${import.meta.env.VITE_BASEURL}/api/User/DeleteUser`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => {
      localStorage.removeItem("token");
      window.location.href = "/register";
    })
    .catch(error => console.error("Error deleting account", error));
    
    console.log("Account deletion would happen here");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      {user ? (
        <>
          <div className="bg-gradient-to-r from-[#1E3D2F] to-[#9AB3A5] p-6 flex justify-center">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#D9D9D9] flex items-center justify-center border-4 border-white">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-12 h-12 text-[#1E3D2F]"
                >
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#1E3D2F] text-center border-b border-gray-100 pb-3">
              {user.name}
            </h2>
            
            <div className="mb-6">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9AB3A5] mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="font-medium text-gray-700">{user.email}</p>
              </div>
            </div>
            
            <button 
              onClick={handleDeleteAccount}
              className="w-full py-2.5 px-4 bg-red-50 text-red-600 rounded-md border border-red-200 hover:bg-red-100 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </button>
          </div>
          
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                <h3 className="text-xl font-bold mb-4 text-[#1E3D2F]">Confirm Account Deletion</h3>
                <p className="mb-6 text-gray-700">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-[#D9D9D9] text-gray-700 rounded"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#D9D9D9] animate-pulse"></div>
          </div>
          <div className="h-7 bg-[#D9D9D9] rounded w-3/4 mx-auto mb-6 animate-pulse"></div>
          <div className="h-5 bg-[#D9D9D9] rounded w-full mb-8 animate-pulse"></div>
          <div className="h-10 bg-[#D9D9D9] rounded w-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;