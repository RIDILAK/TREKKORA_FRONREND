import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../Layout/SideBar";
import ImageViewer from "@/Components/ImageViewer";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/Place/GettAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaces(response.data.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (place) => {
    setSelectedPlace(place);
  };

  const closeModal = () => {
    setSelectedPlace(null);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading places...</div>;
  }

  return (
    <div className="flex bg-secondary min-h-screen">
      <SideBar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-third mb-6">Places List</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-primary text-black">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Place Details</th>
                <th className="py-3 px-4 text-left">Price (₹)</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {places.map((place, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <ImageViewer
                      base64Data={place.imageUrl}
                      alt={place.placeName}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold">{place.placeName}</p>
                    <p className="text-sm text-gray-600">
                      {place.stateName}, {place.countryName}
                    </p>
                  </td>
                  <td className="py-3 px-4">₹{place.price}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleViewMore(place)}
                      className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-80"
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))}
              {places.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No places found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedPlace && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl relative">
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                onClick={closeModal}
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-2">{selectedPlace.placeName}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {selectedPlace.stateName}, {selectedPlace.countryName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Minimum Days:</strong> {selectedPlace.minimumDays}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Best Time to Travel:</strong> {selectedPlace.bestTimeToTravel}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Pincode:</strong> {selectedPlace.pincode}
              </p>
              <p className="text-gray-800 mt-4">
                <strong>Description:</strong><br />
                {selectedPlace.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesList;
