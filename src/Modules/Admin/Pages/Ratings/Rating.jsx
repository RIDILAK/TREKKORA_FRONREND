import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const Rating = () => {
  const [guideRatings, setGuideRatings] = useState([]);
  const [placeRatings, setPlaceRatings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGuideRatings();
    fetchPlaceRatings();
  }, []);

  const fetchGuideRatings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/Rating/GetAllGuides`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGuideRatings(res.data?.data || []);
    } catch {
      toast.error("Failed to fetch guide ratings");
    }
  };

  const fetchPlaceRatings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/Rating/GetAllPlace`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaceRatings(res.data?.data || []);
    } catch {
      toast.error("Failed to fetch place ratings");
    }
  };

  const deleteRating = async (id) => {
    if (!window.confirm("Are you sure you want to delete this rating?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/api/Rating?RatingId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Rating deleted successfully");
      fetchGuideRatings();
      fetchPlaceRatings();
    } catch {
      toast.error("Failed to delete rating");
    }
  };

  const renderStars = (value) => (
    <>
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={i < value ? solidStar : regularStar}
          className={`mr-1 ${i < value ? "text-yellow-500" : "text-gray-300"}`}
        />
      ))}
    </>
  );

  return (
    <div className="p-6 space-y-10">

      {/* Guide Ratings */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">🧭 Guide Ratings</h2>
        {guideRatings.length === 0 ? (
          <p>No guide ratings available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guideRatings.map((rating) => (
              <div key={rating.id} className="border p-4 rounded shadow-sm relative">
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => deleteRating(rating.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <h3 className="font-semibold text-lg">{rating.guideName}</h3>
                <p className="text-sm text-gray-600">User: {rating.userName}</p>
                <div className="my-2">{renderStars(rating.ratingValue)}</div>
                <p className="text-sm italic">"{rating.review}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Place Ratings */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">📍 Place Ratings</h2>
        {placeRatings.length === 0 ? (
          <p>No place ratings available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {placeRatings.map((rating) => (
              <div key={rating.id} className="border p-4 rounded shadow-sm relative">
                <button
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => deleteRating(rating.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <h3 className="font-semibold text-lg">{rating.placeName}</h3>
                <p className="text-sm text-gray-600">User: {rating.userName}</p>
                <div className="my-2">{renderStars(rating.ratingValue)}</div>
                <p className="text-sm italic">"{rating.review}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating;
