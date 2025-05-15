import React, { useState } from 'react';
import GuideNavbar from '../LayOut/GuideNavbar';
import Footer from '../../User/LayOut/Footer';
import GuideFooter from '../LayOut/GuideFooter';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../User/Context.jsx/UserContext';

const GuideHome = () => {
  const actions = [
    {
      emoji: '🧭',
      title: 'Trip Requests',
      description: 'View and accept traveller requests',
      color: 'bg-[#1E3D2F]',
      onClick: () => navigate('/TripRequests'),
    },
    {
      emoji: '📅',
      title: 'Scheduled Tours',
      description: 'A list of your upcoming trips',
      color: 'bg-[#2E5545]',
        onClick: () => navigate('/upcomingRequests'),
    },
    {
      emoji: '⭐',
      title: 'Ratings & Reviews',
      description: 'See what travellers say about you',
      color: 'bg-[#3D6B5A]',
    },
    {
      emoji: '🙍‍♀️',
      title: 'Your Profile',
      description: 'View or update your guide profile',
      color: 'bg-[#4D8070]',
    },
  ];
const navigate=useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const{user}=useUser();

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <GuideNavbar />
      <div className="min-h-screen bg-[#F7F7F7] py-10 px-4 sm:px-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Welcome Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1E3D2F] to-[#9AB3A5]"></div>
            <h1 className="text-4xl font-bold text-[#1E3D2F] mb-3 relative z-10">Welcome <span>{user.name}</span>!</h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-6">
              Manage your trip requests, connect with travellers, and guide them through unforgettable journeys.
            </p>
            <div className="mt-6 flex justify-center gap-4 mb-6">
              <div className="relative group">
                <img
                  src="https://i.pinimg.com/736x/b3/8a/57/b38a57cc2d8c8285d8d5485f68b54466.jpg"
                  alt="Trip 1"
                  className="rounded-2xl w-[250px] h-[250px] object-cover shadow-md transition-transform group-hover:scale-105"
                />
              </div>
              <div className="relative group">
                <img
                  src="https://i.pinimg.com/736x/a5/7c/27/a57c2704afe6a6256caf7b887e5250fe.jpg"
                  alt="Trip 2"
                  className="rounded-2xl w-[250px] h-[250px] object-cover shadow-md transition-transform group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={()=>navigate('/addguideprofile')} className="mt-6 bg-primary hover:bg-primary text-white px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-lg">
                Complete your profile
              </button>
            </div>
          </div>

          {/* Quick Actions Dropdown */}
          <div className="space-y-4">
            <div className="flex flex-col  items-center">
              {actions.map((action, index) => (
                <div
                  key={index}
                  className={`rounded-xl w-[600px] h-[100px] flex flex-col shadow-md transition ${action.color} mb-4`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-left flex justify-between items-center px-6 py-4 text-white text-lg font-semibold focus:outline-none"
                  >
                    <span>{action.emoji} {action.title}</span>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 text-sm text-white opacity-90 transition-all duration-300">
                      {action.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Final Section */}
          <div className="bg-white shadow-lg rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#9AB3A5] to-[#1E3D2F]"></div>
            <h2 className="text-2xl font-semibold text-[#1E3D2F] mb-4">Start guiding your next journey</h2>
            <div className="flex justify-center mb-4">
              <div className="relative group">
                <img
                  src="https://i.pinimg.com/736x/14/9e/20/149e200f234c73dd5608d9867f9be895.jpg"
                  alt="Guide"
                  className="w-[300px] h-[300px] rounded-full object-cover border-4 border-[#9AB3A5] transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-md"
                />
              </div>
            </div>
            <p className="mt-4 text-gray-700 max-w-xl mx-auto leading-relaxed">
              Trekkora is your gateway to sharing your adventure experience with the world. Lead, inspire, and explore with fellow travellers through unforgettable journeys.
            </p>
          </div>
        </div>
      </div>
      <GuideFooter />
    </>
  );
};

export default GuideHome;
