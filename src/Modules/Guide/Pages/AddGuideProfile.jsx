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
    alert("Your Profile Uploaded succesfully")
    // navigate('/guide/dashboard');
  }
} catch (error) {
  console.error('Error:', error);
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
    <div className="min-h-screen bg-fourth p-8">
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">Add Guide Profile</h1>
      <button onClick={handleBack} className="text-primary text-xl font-semibold mb-6">⇦</button>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-third p-6 rounded-lg shadow-lg space-y-4">
        <input name="mobile" type="text" placeholder="Mobile" value={profile.mobile} onChange={handleChange}
          className="w-full border border-primary rounded-md p-2" />

        <select value={PlaceId} onChange={(e) => {
          console.log(e.target.value,"edrfgh");
          
          setPlaceId(e.target.value)}} className="w-full border border-primary rounded-md p-2">
          <option value="">Select Place</option>
          {places.map((place, i) => (
            <option key={i} value={place.id}>{place.placeName}</option>
          ))}
        </select>

        <input name="experience" type="text" placeholder="Experience" value={profile.experience} onChange={handleChange}
          className="w-full border border-primary rounded-md p-2" />

        <input name="languages" type="text" placeholder="languages" value={profile.languages} onChange={handleChange}
          className="w-full border border-primary rounded-md p-2" />

        <textarea name="areasCovered" placeholder="Areas Covered" value={profile.areasCovered} onChange={handleChange}
          className="w-full border border-primary rounded-md p-2" />

        <textarea name="bio" placeholder="Bio" value={profile.bio} onChange={handleChange}
          className="w-full border border-primary rounded-md p-2" />

        <textarea name="whyTravelWithMe" placeholder="Why Travel With Me" value={profile.whyTravelWithMe} onChange={handleChange}
          className="w-full border border-primary rounded-md p-2" />

        <input type="file" accept="image/*" onChange={handleProfileImageChange}
          className="w-full border border-primary rounded-md p-2" />

        <input type="file" multiple onChange={handleCertificatesChange}
          className="w-full border border-primary rounded-md p-2" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition">
            Submit Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddGuideProfile;
