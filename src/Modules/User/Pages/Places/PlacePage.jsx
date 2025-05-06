import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageViewer from '../../../../Components/ImageViewer';

const PlacePage = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim() === '') {
        fetchAllPlaces();
      } else {
        fetchSearchResults(searchTerm);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchAllPlaces = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/Place/GettAll`);
      setPlaces(res.data.data)
      console.log(res.data.data,"new");
      ;
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchSearchResults = async (term) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/User/Search?query=${term}`);
      setPlaces(res.data.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f5] text-gray-800 px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-[#2F4F4F] mb-8">
        Let's Explore Together <span role="img" aria-label="travel">✈️</span>
      </h1>
      {/* <button>Places</button>
       <button onClick={navigate('/guide')}>Guides</button>   */}
      {/* Search */}
      {/* <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search places or countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 px-5 pl-10 rounded-full border-2 border-[#9AB3A5] focus:outline-none focus:ring-2 focus:ring-[#9AB3A5]"
          />
          <FaSearch className="absolute top-3.5 left-4 text-[#9AB3A5]" />
        </div>
      </div> */}

      {/* Cards */}
      {/* Navigation Buttons */}
<div className="flex justify-center gap-4 mb-8">
  <button
    className="bg-[#9AB3A5] text-white px-6 py-2 rounded-full font-semibold  transition"
    onClick={() => navigate('/guide')}
  >
    Guides
  </button>
  <button
    className="bg-[#9AB3A5] text-white px-6 py-2 rounded-full font-semibold cursor-default"
  >
    Places
  </button>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {places.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
          >
            <div className="relative">
            <ImageViewer base64Data={place.imageUrl } alt={place.placeName} className="w-full h-52 object-cover" />
              <button className="absolute top-3 right-3 text-white bg-white/70 hover:bg-white/90 rounded-full p-2 shadow">
                <FaHeart size={18} className="text-red-500" />
              </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{place.placeName}-{place.countryName}</h2>
              <p className="text-sm text-gray-500 mb-4"></p>

              <div className="mt-auto">
                <button
                  onClick={() => navigate(`/PlaceDetails/${place.id}`)}
                  className="w-full bg-gradient-to-r from-[#6bb48d] to-[#9AB3A5] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {places.length === 0 && (
        <p className="text-center mt-10 text-gray-500 text-lg">No places found.</p>
      )}
    </div>
  );
};

export default PlacePage;
