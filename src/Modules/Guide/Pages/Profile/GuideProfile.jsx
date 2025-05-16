import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// import GuideNavbar from '../LayOut/GuideNavbar';
// import GuideFooter from '../LayOut/GuideFooter';

const GuideProfile = () => {
  const [guide, setGuide] = useState(null);
   const [deleting, setDeleting] = useState(false);
   const [reviews, setReviews] = useState([]);
useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_BASEURL}/api/Rating/GuideReview`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      setReviews(res.data.data);
      console.log(res.data.data,"review");
       // assuming the response is a list of reviews
    })
    .catch((err) => {
      console.error('Error fetching reviews:', err);
    });
}, []);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/GetGuide`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setGuide(res.data.data);
        console.log(res.data.data,"data");
        
      })
      .catch((err) => {
        console.error('Error fetching guide profile:', err);
      });
  }, []);

   const handleDeleteProfile = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
    if (!confirmed) return;

    setDeleting(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/Delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Profile deleted successfully.');
      localStorage.removeItem('token');
      window.location.href = '/register'; 
    } catch (error) {
      console.error('Error deleting profile:', error);
     toast.error('Failed to delete profile. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (!guide) {
    return <p className="text-center mt-20 text-primary">Loading profile...</p>;
  }

  const profile = guide.getGuideProfileDto;

  console.log(profile,"certificates");
  

  return (
    <>
      {/* <GuideNavbar /> */}
      <div className="min-h-screen bg-fourth py-10 px-4">
        <h1></h1>
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
              <img src={profile.certificates} alt={guide.name}  className="w-64 h-64  object-cover border-4 border-primary shadow-md" />

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
            <div> <button
                onClick={handleDeleteProfile}
                disabled={deleting}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200"
              >
                {deleting ? 'Deleting...' : 'Delete Profile'}
              </button></div>

              
                <div>
  <h2 className="text-2xl font-semibold text-primary mb-4 mt-8">User Reviews</h2>
  {reviews.length === 0 ? (
    <p className="text-gray-500">No reviews yet.</p>
  ) : (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👤</span>
            <span className="font-semibold">{review.userName}</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: review.ratingValue }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <p className="text-gray-700 italic">"{review.review}"</p>
        </div>
      ))}
    </div>
  )}
</div>

              </div>
          </div>
        </div>
     
      {/* <GuideFooter /> */}
    </>
  );
};

export default GuideProfile;
