import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function AddGuideProfile() {
  const [profile, setProfile] = useState({
    mobile: '',
    experience: '',
    languages: '',
    areasCovered: '',
    bio: '',
    whyTravelWithMe: '',
  });

  const [PlaceId, setPlaceId] = useState('');
  const [places, setPlaces] = useState([]);
  console.log(places,"places");
  

  const [profileImage, setProfileImage] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/Place/GettAll`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setPlaces(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value,"nameandvalue");
    
    setProfile({ ...profile, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleCertificatesChange = (e) => {
    setCertificates(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profile,"profile");
    
    const { mobile, experience, languages, areasCovered, bio, whyTravelWithMe } = profile;
    console.log(mobile, experience, languages, areasCovered, bio, whyTravelWithMe,"prf");
    

    if (!mobile || !experience || !languages || !areasCovered || !bio || !whyTravelWithMe || !PlaceId || !profileImage) {
      setError('All fields are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('mobile', mobile);
      formData.append('experience', experience);
      formData.append('languages', languages);
      formData.append('areasCovered', areasCovered);
      formData.append('bio', bio);
      formData.append('whyTravelWithMe', whyTravelWithMe);
      formData.append('PlaceId', PlaceId);
      formData.append('profileImage', profileImage);
      certificates.forEach((file) => formData.append('certificates', file));
           console.log('FormData contents:');
for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}

           
    
  const response = await axios.post(
    `${import.meta.env.VITE_BASEURL}/api/GuidProfile/Add`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    toast.success("Profile uploaded successfully");
    // alert("Your Profile Uploaded succesfully")
    // navigate('/guide/dashboard');
  }
} catch (error) {
  console.error('Error:', error);
  toast.error('You have already upload your profile')
  setError('You have already uplaod your profile');

 if (error.response) {
  const status = error.response.status;

  if (status === 409) {
    toast.error("You have already uploaded your profile");
  } else if (status === 400) {
    toast.error("Bad request. Please check your inputs.");
  } else {
    toast.error("Something went wrong while uploading the profile");
  }
} else {
  toast.error("Network error. Please try again later.");
}
}

};

  const handleBack = () => {
    navigate(-1);
  };

  return (

  <>
    <div className="min-h-screen bg-fourth p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handleBack} className="text-primary text-2xl font-semibold hover:text-secondary transition">
            ⇦
          </button>
          <h1 className="text-3xl font-bold text-primary text-center w-full -ml-6">Add Guide Profile</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-third p-8 rounded-xl shadow-md space-y-6"
        >
          <input
            name="mobile"
            type="text"
            placeholder="Mobile"
            value={profile.mobile}
            onChange={handleChange}
            className="w-full border border-primary rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            value={PlaceId}
            onChange={(e) => {
              console.log(e.target.value, 'edrfgh');
              setPlaceId(e.target.value);
            }}
            className="w-full border border-primary rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Place</option>
            {places.map((place, i) => (
              <option key={i} value={place.id}>
                {place.placeName}
              </option>
            ))}
          </select>

          <input
            name="experience"
            type="text"
            placeholder="Experience"
            value={profile.experience}
            onChange={handleChange}
            className="w-full border border-primary rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            name="languages"
            type="text"
            placeholder="Languages"
            value={profile.languages}
            onChange={handleChange}
            className="w-full border border-primary rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            name="areasCovered"
            placeholder="Areas Covered"
            value={profile.areasCovered}
            onChange={handleChange}
            className="w-full border border-primary rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full border border-primary rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />

          <textarea
            name="whyTravelWithMe"
            placeholder="Why Travel With Me"
            value={profile.whyTravelWithMe}
            onChange={handleChange}
            className="w-full border border-primary rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="w-full border border-primary rounded-lg p-2 file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white hover:file:bg-secondary transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Upload Certificates</label>
            <input
              type="file"
              multiple
              onChange={handleCertificatesChange}
              className="w-full border border-primary rounded-lg p-2 file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-white hover:file:bg-secondary transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition duration-300 shadow-md"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);


}

export default AddGuideProfile;
