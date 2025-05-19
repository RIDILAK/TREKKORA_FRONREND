import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../Layout/SideBar";
import { useNavigate } from "react-router-dom";

const GuidesList = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/GuidProfile/get-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGuides(response.data.data);
      console.log(response.data.data,"dataaa");
      
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (guide) => {
    const { getGuideProfileDto } = guide;
    const info = `
    id:${guide.guideId}
Name: ${guide.name}
Email: ${guide.email}
Mobile: ${getGuideProfileDto.mobile}
Place: ${getGuideProfileDto.placeName}
Experience: ${getGuideProfileDto.experience} years
Languages: ${getGuideProfileDto.languages}
Areas Covered: ${getGuideProfileDto.areasCovered}
Available: ${getGuideProfileDto.isAvailable ? "Yes" : "No"}
Approved: ${getGuideProfileDto.isApproved ? "Yes" : "No"}
Bio: ${getGuideProfileDto.bio}
Why Travel With Me: ${getGuideProfileDto.whyTravelWithMe}
Certificates: ${getGuideProfileDto.certificates}
    `;
    alert(info);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading guides...</div>;
  }

  return (
    <div className="flex bg-secondary min-h-screen">
      <SideBar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-third mb-6">Guide List</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-primary text-black">
              <tr>
                <th className="py-3 px-4 text-left">Profile</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Mobile</th>
                <th className="py-3 px-4 text-left">Place</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {guides.map((guide, index) => {
                const profile = guide.getGuideProfileDto;
                return (
                  <tr key={profile.guideId || index} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">
                      <img
                        src={profile.profileImage}
                        alt={guide.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">{guide.name}</td>
                    <td className="py-3 px-4">{profile.mobile}</td>
                    <td className="py-3 px-4">{profile.placeName}</td>
                    <td className="py-3 px-4 text-center">
                      {/* <button
                        onClick={() => handleViewMore(guide)}
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-80"
                      >
                        View More
                      </button> */}
                      <button onClick={()=>navigate(`/guidelistdetails/${profile.guideId }`)}
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-80">
                        View More
                      </button>
                    </td>
                  </tr>
                );
              })}
              {guides.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No guides found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuidesList;
