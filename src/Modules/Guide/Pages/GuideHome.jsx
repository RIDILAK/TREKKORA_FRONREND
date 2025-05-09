import React from 'react';
import { useNavigate } from 'react-router-dom';

const GuideHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Welcome Section */}
        <div className="bg-white rounded-3xl p-8 shadow-md text-center">
          <h1 className="text-4xl font-bold text-[#1E3D2F] mb-3">Welcome, Aleena</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Manage your trip requests, connect with travellers, and guide them through unforgettable journeys.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <img src="/images/trip1.jpg" alt="Trip 1" className="rounded-2xl w-48 h-32 object-cover shadow-md" />
            <img src="/images/trip2.jpg" alt="Trip 2" className="rounded-2xl w-48 h-32 object-cover shadow-md" />
          </div>

          <button
            onClick={() => navigate('/guide/profile')}
            className="mt-6 bg-[#1E3D2F] hover:bg-[#163026] text-white px-6 py-2 rounded-full transition"
          >
            Complete your profile
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => navigate('/guide/requests')}
            className="cursor-pointer bg-[#9AB3A5] hover:bg-[#89A298] text-white p-6 rounded-2xl shadow-lg transition"
          >
            <div className="text-3xl mb-2">🧭</div>
            <h3 className="text-xl font-semibold mb-1">Trip Requests</h3>
            <p className="text-sm">View and accept traveller requests</p>
          </div>

          <div
            onClick={() => navigate('/guide/scheduled-tours')}
            className="cursor-pointer bg-[#9AB3A5] hover:bg-[#89A298] text-white p-6 rounded-2xl shadow-lg transition"
          >
            <div className="text-3xl mb-2">📅</div>
            <h3 className="text-xl font-semibold mb-1">Scheduled Tours</h3>
            <p className="text-sm">A list of your upcoming trips</p>
          </div>

          <div
            onClick={() => navigate('/guide/ratings')}
            className="cursor-pointer bg-[#9AB3A5] hover:bg-[#89A298] text-white p-6 rounded-2xl shadow-lg transition"
          >
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-semibold mb-1">Ratings & Reviews</h3>
            <p className="text-sm">See what travellers say about you</p>
          </div>

          <div
            onClick={() => navigate('/guide/profile')}
            className="cursor-pointer bg-[#9AB3A5] hover:bg-[#89A298] text-white p-6 rounded-2xl shadow-lg transition"
          >
            <div className="text-3xl mb-2">🙍‍♀️</div>
            <h3 className="text-xl font-semibold mb-1">Your Profile</h3>
            <p className="text-sm">View or update your guide profile</p>
          </div>
        </div>

        {/* Final Section */}
        <div className="bg-white shadow-md rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-[#1E3D2F]">Start guiding your next journey</h2>
          <div className="flex justify-center mt-4">
            <img
              src="/images/guide.jpg"
              alt="Guide"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#9AB3A5]"
            />
          </div>
          <p className="mt-4 text-[#1E3D2F] max-w-xl mx-auto">
            Trekkora is your gateway to sharing your adventure experience with the world. Lead, inspire, and explore with fellow travellers through unforgettable journeys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideHome;
