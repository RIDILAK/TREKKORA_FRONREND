import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/Booking/User`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      })
      .then((res) => {
        setBookings(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
        toast.error("Failed to load bookings");
      });
  }, [userId]);

  const handleDelete = async (bookingId) => {
    setDeletingId(bookingId);
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/api/Booking/Delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { id: bookingId },
      });

      // Optimistically update booking as cancelled
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId ? { ...b, isDeleted: true } : b
        )
      );

      toast.success("Booking Cancelled");
    } catch (error) {
      const status = error.response?.status;
      if (status === 409) {
        toast.error("You have already cancelled the booking");
      } else if (status === 403) {
        toast.error("Booking can only be cancelled if it's Approved or Pending.");
      } else if (status === 400) {
        toast.error("Booking not found");
      } else {
        toast.error("Error in cancelling booking");
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-fourth py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Your Bookings
        </h1>

        {bookings?.length > 0 ? (
          <ul className="space-y-6">
            {bookings.map((item) => (
              <li key={item.bookingId} className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-primary">
                    {item.placeName?.trim()}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Booking ID: {item.bookingId}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <p><strong>Guide:</strong> {item.guideName}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <p><strong>People:</strong> {item.numberOfPeople}</p>
                  <p><strong>Total Price:</strong> ₹{item.totalPrice}</p>
                  <p><strong>Booking Date:</strong> {new Date(item.bookingDate).toLocaleDateString()}</p>
                  <p><strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(item.endDate).toLocaleDateString()}</p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <Link
                    to={`/PlaceDetails/${item.placeId}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Place Details
                  </Link>

                  {item.isDeleted ? (
                    <span className="text-red-600 font-semibold text-sm">Cancelled</span>
                  ) : (
                    <button
                      onClick={() => handleDelete(item.bookingId)}
                      disabled={deletingId === item.bookingId}
                      className={`text-sm font-medium ${
                        deletingId === item.bookingId
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-red-600 hover:text-red-800"
                      }`}
                    >
                      {deletingId === item.bookingId ? "Cancelling..." : "Cancel Booking"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-secondary text-lg mt-8">
            You have no bookings yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
