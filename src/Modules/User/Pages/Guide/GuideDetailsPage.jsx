import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaUserTie,
} from "react-icons/fa";
import Navbar from "../../LayOut/NavBar";

const GuideDetails = () => {
  const { id } = useParams();
  console.log(id,'id');
  
  const [guide, setGuide] = useState();
  const[Rating,setRating]=useState([]);

  useEffect(() => {
    fetchGuideDetails();
    handleGuideRatings();
  }, [id]);

  const handleGuideRatings=()=>{
    axios
    .get(`${import.meta.env.VITE_BASEURL}/api/Rating/Guide`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      },params:{
        GuidId:id
      }
    })
    .then((res)=>setRating(res.data.data))
    .catch((error)=>console.error("Error in rating",error));
    
  }

  const fetchGuideDetails =async () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { id: id },
      })
      .then((res) => {
        
        setGuide(res.data.data);
        console.log(res.data, "dtas");
      })
      .catch((err) => {
        console.error("Error fetching guide details:", err);
      });
  };

  if (!guide || !guide.getGuideProfileDto) {
    return (
      <div className="text-center mt-32 text-gray-600 text-lg">
        Loading guide details...
      </div>
    );
  } else {
    return (
      <>
      <Navbar/>
      <div className="bg-gray-100 min-h-screen pt-24 px-4 text-black">
        
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <img
              src={guide?.getGuideProfileDto.profileImage}
              alt={guide.name}
              className="w-[250px] h-[350px] object-cover  shadow-md border-4 border-primary"
            />
          </div>

          {/* Guide Info */}
          <h1 className="text-3xl font-bold text-center text-third mb-2">
            🧭 {guide?.name}
          </h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            <FaMapMarkerAlt className="inline mr-1" />{" "}
            {guide.getGuideProfileDto.placeName}
          </p>

          <div className="text-lg space-y-2 mb-6">
            <p>
              <FaUserTie className="inline mr-2 text-primary" />{" "}
              <strong>Experience:</strong> {guide?.getGuideProfileDto.experience}{" "}
              years
            </p>
            <p>
              <FaGlobe className="inline mr-2 text-primary" />{" "}
              <strong>Languages:</strong> {guide?.getGuideProfileDto.languages}
            </p>
            <p>
              <FaMapMarkerAlt className="inline mr-2 text-primary" />{" "}
              <strong>Areas Covered:</strong>{" "}
              {guide.getGuideProfileDto.areasCovered}
            </p>
            <p>
              <FaPhone className="inline mr-2 text-primary" />{" "}
              <strong>Mobile:</strong> {guide.getGuideProfileDto.mobile}
            </p>
            <p>
              <FaEnvelope className="inline mr-2 text-primary" />{" "}
              <strong>Email:</strong> {guide.email}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-third mb-2">📝 Bio</h2>
            <p className="text-gray-700">{guide.getGuideProfileDto.bio}</p>
          </div>

          {/* Why Travel With Me */}
          <div className="bg-primary p-4 rounded-lg shadow text-white">
            <h2 className="text-2xl font-semibold mb-2">
              ✨ Why Travel With Me?
            </h2>
            <p>{guide.getGuideProfileDto.whyTravelWithMe}</p>
          </div>
        </div>
        {Rating.length > 0 && (
  <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold text-third mb-4">⭐ Ratings & Reviews</h2>
    {Rating.map((rate) => (
      <div key={rate.id} className="border-b border-gray-200 pb-4 mb-4">
        <p className="text-lg font-semibold text-primary">Rating: {rate.ratingValue} / 5</p>
        <p className="text-gray-700 italic">"{rate.review}"</p>
      </div>
    ))}
  </div>
)}
      </div>
      </>
    );
  }
};

export default GuideDetails;
