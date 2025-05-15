import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import GuideNavbar from '../LayOut/GuideNavbar';
// import GuideFooter from '../LayOut/GuideFooter';

const GuideProfile = () => {
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/GetGuide`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setGuide(res.data.data);
      })
      .catch((err) => {
        console.error('Error fetching guide profile:', err);
      });
  }, []);

  if (!guide) {
    return <p className="text-center mt-20 text-primary">Loading profile...</p>;
  }

  const profile = guide.getGuideProfileDto;

  return (
    <>
      <GuideNavbar />
      <div className="min-h-screen bg-fourth py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
            <img
              src={profile.profileImage}
              alt={guide.name}
              className="w-64 h-64 rounded-full object-cover border-4 border-primary shadow-md"
            />
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold text-primary">{guide.name}</h1>
              <p className="text-gray-700"><strong>Email:</strong> {guide.email}</p>
              <p className="text-gray-700"><strong>Mobile:</strong> {profile.mobile}</p>
              <p className="text-gray-700"><strong>Base Location:</strong> {profile.placeName}</p>
              <p className="text-gray-700"><strong>Experience:</strong> {profile.experience} years</p>
              <p className="text-gray-700"><strong>Languages:</strong> {profile.languages}</p>
              <p className="text-gray-700"><strong>Areas Covered:</strong> {profile.areasCovered}</p>
              <p className={`text-sm font-medium inline-block px-3 py-1 rounded-full ${
                profile.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {profile.isAvailable ? 'Available for Booking' : 'Currently Unavailable'}
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">About Me</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile.bio}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">Why Travel With Me?</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{profile.whyTravelWithMe}</p>
            </div>
          </div>
        </div>
      </div>
      <GuideFooter />
    </>
  );
};

export default GuideProfile;
