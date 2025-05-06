import React, { useEffect, useState } from "react";
import axios from "axios";
import mainimage from "../../../assets/image.png";
import { useNavigate } from "react-router-dom";
import ImageViewer from "../../../Components/ImageViewer";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchPlaces();
    fetchGuides();
  }, []);

  const hndlenavigate=()=>{
    navigate('/explore')
  }
  const fetchPlaces = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/Place/GettAll`
      );
      setPlaces(res.data.data);
      console.log(res.data.data,"error");
      
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const fetchGuides = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/GuidProfile/All`
      );
      setGuides(res.data.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/User/Search`,{
          params:{
            query:search
          }
        }
      );
      setFilteredResults(res.data.data || []);
      console.log(res.data.data,"search");
      
      setShowResults(true);
    } catch (error) {
      console.error("Error in search", error);
      setFilteredResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    handleSearch();
  };

  

  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-white py-16 px-6 md:px-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10 rounded-lg mb-16">
        {/* Left */}
        <div className="md:w-1/2 text-[#333] space-y-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            Discover <br /> Plan & Explore with{" "}
            <span className="text-secondary">Trekkora 🌍</span>
          </h1>

          {/* Search bar */}
          <div className="flex flex-col items-center justify-center gap-4 w-full relative">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
                placeholder="Search place ..."
                className="w-full px-4 py-2 bg-secondary rounded text-black focus:outline-none"
              />

              {showResults && (
                <div className="absolute z-10 w-full mt-1 max-h-64 overflow-y-auto bg-white shadow-lg rounded-md border border-gray-200">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((place) => (
                      <div
                        key={place.placeId}
                        className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          
                          setSearch(place.placeName);
                          if(place.type=="Place"){
                          navigate(`/PlaceDetails/${place.id}`)}
                          else{
                            navigate(`/guideDetails/${place.id}`)
                          }
                          setShowResults(false);
                        }}
                      >
                        <ImageViewer base64Data={place.imageUrl } alt={place.placeName}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {place.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {place.countryName}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : search.trim() ? (
                    <div className="p-3 text-center text-gray-500">
                      No results found
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <button
              onClick={hndlenavigate}
              className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              Explore
            </button>
          </div>

          <p className="text-sm text-gray-700 mt-4">
            Find top-rated places and guides to make your journey unforgettable.
            Explore the best treks and professional guides with us.
          </p>

          <div className="flex gap-6">
            <div className="w-28 h-28 bg-white rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-100 transition">
              <img
                src="https://i.pinimg.com/736x/72/2e/32/722e325178b40eed8c05670bf10bee3f.jpg"
                alt="Place"
                className="w-[60px] h-[60px] rounded-full"
              />
              <span className="text-sm font-bold mt-2">1000+ Places</span>
            </div>
            <div className="w-28 h-28 bg-white rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-100 transition">
              <img
                src="https://i.pinimg.com/736x/bd/20/11/bd20113ccd1d7bafd1e32a18c2acf44e.jpg"
                alt="Guide"
                className="w-[60px] h-[60px] rounded-full"
              />
              <span className="text-sm font-bold mt-2">500+ Guides</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={mainimage}
            alt="Adventure"
            className="w-[500px] h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Rest of your components remain exactly the same */}
      {/* Popular Places */}
      <div className="px-6 md:px-20 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-third text-center">
          Popular Places
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {places.length > 0 ? (
            places.map((place) => (
              <div
                key={place.placeId}
                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl hover:scale-105 transition duration-300"
              >
                <ImageViewer base64Data={place.imageUrl } alt={place.placeName}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2 text-third">
                  {place.placeName} - {place.countryName}
                </h3>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No places found.
            </p>
          )}
        </div>
      </div>

      {/* Top Guides */}
      <div className="px-6 md:px-20 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-third text-center">
          Top Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {guides.length > 0 ? (
            guides.map((guide) => (
              <div
                key={guide.guideId}
                className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl hover:scale-105 transition duration-300"
              >
                <img
                  src={
                    guide.getGuideProfileDto?.profileImage ||
                    "https://via.placeholder.com/150"
                  }
                  alt={guide.name}
                  className="w-full h-100 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2 text-third">
                  {guide.name} - {guide.getGuideProfileDto?.placeName}
                </h3>
                <p className="text-sm text-third">
                  Experience: {guide.getGuideProfileDto?.experience || "2"}+
                  years
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No guides found.
            </p>
          )}
        </div>
      </div>

      {/* Trip Themed Section */}
      <div className="px-6 md:px-20 py-16 bg-gray-50 flex flex-col md:flex-row items-center gap-10 rounded-lg">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-primary">
            Start Your Next Adventure!
          </h2>
          <p className="text-gray-700 text-md leading-relaxed">
            Whether you're hiking the Himalayas or exploring local trails,
            Trekkora helps you find the perfect place and the right guide. Join
            thousands of travelers who have already started their journeys with
            us.
          </p>
          <button className="bg-secondary text-white px-6 py-3 rounded shadow hover:scale-105 transition">
            Start Planning Now
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://i.pinimg.com/736x/b8/c3/f4/b8c3f4354cffe2431d97e000bf7352ee.jpg"
            alt="Trip Preview"
            className="w-[350px] h-[350px] object-cover rounded-full shadow-md"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
