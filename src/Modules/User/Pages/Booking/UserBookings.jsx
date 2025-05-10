import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const{bookingId}=useParams();
  const { userId } = useParams();

  useEffect(() => {
    // if (!userId) return;

    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/Booking/User`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      })
      .then((res) => {
        setBookings(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
      });
  }, []);

  const handleDelete=(bookingId)=>{
    try {
         axios
    .delete(`${import.meta.env.VITE_BASEURL}/api/Booking/Delete`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
        },params:{
            id:bookingId
        }
        
       
    })
  toast.success("Booking Deleted Succesfully")
        
    } catch (error) {
       console.error("Error in deleting product",error);
        
    }
}

  return (
    <div className="min-h-screen flex flex-col bg-fourth">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Your Bookings
        </h1>

        {bookings?.length > 0 ? (
          <ul className="space-y-6">
            {bookings.map((item) => (
              <li
                key={item.bookingId}
                className="bg-white shadow-lg rounded-lg p-6"
              >
                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-primary">
                    {item.placeName}
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

                <div className="mt-4">
                  <Link
                    to={`/PlaceDetails/${item.placeId}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Place Details
                  </Link>
                  <button onClick={()=>handleDelete(item.bookingId)}>Cancel Booking</button>
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
