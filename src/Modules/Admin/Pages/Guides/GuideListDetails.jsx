import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../../Layout/SideBar";

const GuideListDetails = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingBlockStatus, setUpdatingBlockStatus] = useState(false);
  const [bookings, setBookings] = useState([]);

  const fetchGuideDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/GuidProfile/GetById?id=${guideId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGuide(response.data.data);
    } catch (error) {
      console.error("Error fetching guide details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/Booking/Guide?guideId=${guideId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const toggleBlockStatus = async () => {
    try {
      setUpdatingBlockStatus(true);
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_BASEURL}/api/GuidProfile/Block?id=${guide.getGuideProfileDto.guideId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchGuideDetails(); // Refresh status
    } catch (error) {
      console.error("Error updating block status:", error);
    } finally {
      setUpdatingBlockStatus(false);
    }
  };

  useEffect(() => {
    fetchGuideDetails();
    fetchBookings();
  }, [guideId]);

  if (loading) {
    return <div className="p-4 text-center">Loading guide details...</div>;
  }

  if (!guide) {
    return <div className="p-4 text-center">Guide not found.</div>;
  }

  const profile = guide.getGuideProfileDto;

  return (
    <div className="flex ml-64 p-6 bg-secondary min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            ⇦ Back
          </button>

          <button
            onClick={toggleBlockStatus}
            disabled={updatingBlockStatus}
            className={`px-4 py-2 rounded text-white transition ${
              guide.isBlocked
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {updatingBlockStatus
              ? "Updating..."
              : guide.isBlocked
              ? "Unblock Guide"
              : "Block Guide"}
          </button>
        </div>

        {/* Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-xl border">
          <div className="flex flex-col items-center mb-6">
            <img
              src={profile.profileImage}
              alt={guide.name}
              className="w-32 h-32 rounded-full object-cover shadow"
            />
            <h2 className="text-3xl font-bold mt-4 text-primary">
              {guide.name}
            </h2>
            <p className="text-gray-600">{guide.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
            <p><strong>Mobile:</strong> {profile.mobile}</p>
            <p><strong>Place:</strong> {profile.placeName}</p>
            <p><strong>Experience:</strong> {profile.experience} years</p>
            <p><strong>Languages:</strong> {profile.languages}</p>
            <p><strong>Areas Covered:</strong> {profile.areasCovered}</p>
            <p><strong>Available:</strong> {profile.isAvailable ? "Yes" : "No"}</p>
            <p><strong>Approved:</strong> {profile.isApproved ? "Yes" : "No"}</p>
            <p>
              <strong>Certificate:</strong><br />
              <a
                href={profile.certificates}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Certificate
              </a>
            </p>
            <p className="md:col-span-2">
              <strong>Bio:</strong> {profile.bio}
            </p>
            <p className="md:col-span-2">
              <strong>Why Travel With Me:</strong> {profile.whyTravelWithMe}
            </p>
          </div>
        </div>

        {/* Bookings */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-primary">Bookings</h3>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings found for this guide.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="bg-white border shadow-md rounded-lg p-4"
                >
                  <h4 className="text-lg font-semibold text-primary mb-2">
                    {booking.placeName}
                  </h4>
                  <p><strong>User:</strong> {booking.userName}</p>
                  <p><strong>People:</strong> {booking.numberOfPeople}</p>
                  {/* <p><strong>Total Price:</strong> ₹{booking.totalPrice.toLocaleString()}</p> */}
                  <p><strong>Guide Salary:</strong> ₹{booking.guideSalary.toLocaleString()}</p>
                  <p><strong>Start:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                  <p><strong>End:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        booking.status === "Completed"
                          ? "bg-green-600"
                          : booking.status === "Cancelled"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideListDetails;
