import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../LayOut/NavBar";

const GuidePage = () => {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/GuidProfile/AllAvaailableGuides`
      );
      setGuides(res.data.data);
      console.log(res.data.data,"ddcfvg");
      
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="px-6 md:px-20 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Meet Our Expert Guides
      </h2>
      <div className="flex justify-center gap-4 mb-8">
  <button
    className="bg-[#9AB3A5] text-white px-6 py-2 rounded-full font-semibold  transition"
    onClick={() => navigate('/explore')}
  >
    Places
  </button>
  <button
    className="bg-[#9AB3A5] text-white px-6 py-2 rounded-full font-semibold cursor-default"
  >
    Guide
  </button>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {guides.length > 0 ? (
          guides.map((guide) => (
            <div
              key={guide.guideId}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <img
                src={
                  guide.getGuideProfileDto?.profileImage ||
                  "https://via.placeholder.com/150"
                }
                alt={guide.name}
                className="w-full h-86 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2 text-third">
                {guide.name}
              </h3>
              <p className="text-sm text-gray-600">
                {guide.getGuideProfileDto?.placeName || "Unknown Location"}
              </p>
              <p className="text-sm text-gray-600">
                Experience: {guide.getGuideProfileDto?.experience || "2"}+ years
              </p>
              <button
                className="mt-4 bg-primary text-white px-4 py-2 rounded hover:scale-105 transition"
                onClick={() => navigate(`/GuideDetails/${guide.getGuideProfileDto.guideId}`)}
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No guides found.
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default GuidePage;
