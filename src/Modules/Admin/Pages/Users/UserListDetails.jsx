import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserListDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/User/userByIdAdmin`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { id: id },
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/Booking/Userbyid`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: { userId: id },
        }
      );
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleToggleBlock = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASEURL}/api/User/Block/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUser();
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchUser();
    fetchBookings();
  }, [id]);

  if (loading) {
    return <div className="text-center p-6">Loading user details...</div>;
  }

  if (!userData) {
    return <div className="text-center p-6">User not found.</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 text-primary font-sans">
      <button
        onClick={handleBack}
        className="mb-6 bg-primary text-white px-4 py-2 rounded-md hover:bg transition shadow-lg"
      >
        ⇦ Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-300">
        <h1 className="text-3xl font-bold text-primary mb-4">User Details</h1>
        <div className="flex flex-col items-center">
          <div className="text-6xl mb-4">👤</div>
          <p className="text-xl font-semibold text-primary">
            {userData?.name || "N/A"}
          </p>
          <p className="text-gray-600">{userData?.email || "N/A"}</p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleToggleBlock}
          className={`px-6 py-2 font-medium text-white rounded-lg shadow-md transition duration-300 ${
            userData?.isBlocked
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {userData?.isBlocked ? "Unblock User" : "Block User"}
        </button>
      </div>

      {/* Bookings Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-primary">User Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found for this user.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="p-6 border rounded-lg shadow bg-white"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={`data:image/jpeg;base64,${booking.placeImage}`}
                    alt="Place"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {booking.placeName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.startDate).toLocaleDateString()} -{" "}
                      {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {booking.status}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Guide:</strong> {booking.guideName}
                  </p>
                  <p>
                    <strong>People:</strong> {booking.numberOfPeople}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{booking.totalPrice}
                  </p>
                  <p>
                    <strong>Guide Salary:</strong> ₹{booking.guideSalary}
                  </p>
                  <p>
                    <strong>Booked On:</strong>{" "}
                    {new Date(booking.bookingDate).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListDetails;
