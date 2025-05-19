import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../Layout/SideBar";

const GuideRequests = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnapprovedGuides();
  }, []);

  const fetchUnapprovedGuides = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/GuidProfile/UnApprovedGuides`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGuides(response.data.data);
    } catch (error) {
      console.error("Error fetching unapproved guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (guideId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/GuidProfile/Approval?GuideId=${guideId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the approved guide from the list
      setGuides((prev) => prev.filter((g) => g.getGuideProfileDto.guideId !== guideId));
    } catch (error) {
      console.error("Error approving guide:", error);
      alert("Approval failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading pending requests...</div>;
  }

  return (
    <div className="flex bg-secondary min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-third mb-6">
          Pending Guide Requests
        </h2>

        {guides.length === 0 ? (
          <p className="text-fourth text-center">No pending guide requests.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {guides.map((guide, index) => {
              const profile = guide.getGuideProfileDto;

              return (
                <div
                  key={profile.guideId || index}
                  className="bg-white rounded-xl shadow-lg p-5 flex flex-col"
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={profile.profileImage}
                      alt={guide.name}
                      className="w-24 h-24 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold text-primary">{guide.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{guide.email}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Mobile:</strong> {profile.mobile}
                    </p>
                  </div>

                  <div className="text-sm text-gray-800 space-y-1 mt-4">
                    <p><strong>Place:</strong> {profile.placeName || "N/A"}</p>
                    <p><strong>Experience:</strong> {profile.experience} years</p>
                    <p><strong>Languages:</strong> {profile.languages}</p>
                    <p><strong>Areas Covered:</strong> {profile.areasCovered}</p>
                    <p><strong>Available:</strong> {profile.isAvailable ? "Yes" : "No"}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold">Bio</h4>
                    <p className="text-sm text-gray-700">{profile.bio}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold">Why Travel With Me</h4>
                    <p className="text-sm text-gray-700">{profile.whyTravelWithMe}</p>
                  </div>

                  {profile.certificates && (
                    <div className="mt-4">
                      <a
                        href={profile.certificates}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-blue-600 text-sm hover:underline"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => handleApprove(profile.guideId)}
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideRequests;
