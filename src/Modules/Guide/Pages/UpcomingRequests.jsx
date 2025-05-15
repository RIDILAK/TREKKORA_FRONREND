import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpcomingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/Booking/ApprovedRequests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const today = new Date();
        // const upcoming = res.data.data.filter((req) => new Date(req.startDate) >= today);
        console.log(res.data.data,"Data");
        
        setRequests(res.data.data);
        // console.log(upcoming,"upcoming");
        
      })
      .catch((err) => {
        console.error('Error fetching approved bookings', err);
      });
  }, []);

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-fourth py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Upcoming Bookings
      </h1>

      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req.bookingId}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-primary">{req.userName}</h2>
                <p className="text-gray-500 text-sm">Booking ID: {req.bookingId}</p>
              </div>

              <div className="text-gray-700 text-sm space-y-1">
                <p><strong>Number of People:</strong> {req.numberOfPeople}</p>
                <p><strong>Total Price:</strong> ₹{req.totalPrice}</p>
                <p><strong>Booking Date:</strong> {new Date(req.bookingDate).toLocaleDateString()}</p>
                <p><strong>Start Date:</strong> {new Date(req.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(req.endDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {calculateDuration(req.startDate, req.endDate)}</p>
              </div>

              <div className="mt-4">
                <p className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  Upcoming
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary mt-10">
          No upcoming bookings found.
        </p>
      )}
    </div>
  );
};

export default UpcomingRequests;
