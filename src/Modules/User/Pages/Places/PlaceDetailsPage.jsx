import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import ImageViewer from "../../../../Components/ImageViewer";
import Navbar from "../../LayOut/NavBar";

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState({});
  const[ratings,setRatings ]=useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    placeAdd();
    getWeather();
    FetchRating();
  }, [id]);

  const FetchRating = () => {
  console.log("triggerssss");

  axios
    .get(`${import.meta.env.VITE_BASEURL}/api/Rating/Place`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: { PlaceId:id },
    })
    .then((res) => {
      console.log(res.data.data); 
      setRatings(res.data.data,"rates"); 
    })
    .catch((error) => console.error("Error in Fetching Rating:", error));
};


  const placeAdd = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/Place/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { id },
      })
      .then((response) => {
        setPlace(response.data.data);
        console.log(response.data.data,"new");
        
      })
      .catch((error) => {
        console.error("Error fetching place details:", error);
      });
  };

  const getWeather = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/Place/GetWeather`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { placeId: id },
      })
      .then((res) => {
        setWeather(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching weather:", error);
      });
  };

  const handleAddToWishlist = (id) => {
    console.log("Wishlist ID:", id);
  };

  console.log(place);
  

  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 text-black min-h-screen flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex-grow w-[700px]  pt-28 px-4 block m-auto justify-center">
        <div className="w-full max-w-4xl bg-fourth rounded-lg shadow-md p-6">
          {/* Image */}
          <div className="relative w-full h-64 lg:h-96 overflow-hidden rounded-lg shadow-lg mb-6">
          <ImageViewer base64Data={place.imageUrl } alt={place.placeName}
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />

            
            {/* <button
              onClick={() => handleAddToWishlist(place.id)}
              className="absolute top-3 right-3 text-2xl text-primary bg-white p-2 rounded-full shadow-md hover:bg-secondary hover:text-white duration-200"
            >
              <FaHeart />
            </button> */}
          </div>

          {/* Details */}
          <h1 className="text-3xl font-bold text-third mb-4">{place.placeName}-{place.stateName}, {place.countryName}</h1>
          <p className="text-lg mb-2 text-third">Minimum Days: {place.minimumDays}</p>
          <p className="mt-4 mb-6 text-third">{place.description}</p>
          <p className="text-xl text-third font-semibold mb-4">
            Price: ₹ <span className="text-third">{place.price}</span>
          </p>
          <p className="text-lg mb-2 text-third">
            Best Time to Travel: <span className="text-third">{place.bestTimeToTravel}</span>
          </p>
          <p className="text-lg mb-2 text-third">Pincode: {place.pincode}</p>
          <p className="text-lg mb-2 text-third"></p>

          {/* Climate Section */}
          <div className="mt-6 p-4 bg-primary rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-third mb-3 text-center">Climate 🌤️</h2>
            <p className="text-lg mb-2">
              Temperature: <span className="text-black">{weather.temperature} °C</span>
            </p>
            <p className="text-lg mb-2">
              Humidity: <span className="text-black">{weather.humidity} %</span>
            </p>
            <p className="text-lg mb-2">
              Weather: <span className="text-black">{weather.weather}</span>
            </p>
            <p className="text-lg mb-4">
              Wind Speed: <span className="text-black">{weather.windSpeed} km/h</span>
            </p>
             <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate(`/booking/${place.id}`)}
                className="px-8 py-3 bg-third text-white font-semibold rounded-md shadow hover:bg-secondary hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                Book Now
              </button>
            </div>
            {/* Rating Summary */}
<div className="mt-6">
  <h2 className="text-xl font-semibold text-third text-center mb-2">Rating ⭐</h2>
  {ratings.length > 0 ? (
    <>
      {/* Average Rating */}
      <p className="text-lg text-center mb-4 text-black font-medium">
        Average Rating: {(
          ratings.reduce((acc, item) => acc + item.ratingValue, 0) / ratings.length
        ).toFixed(1)}{" "}
        / 5 ({ratings.length} reviews)
      </p>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {ratings.map((r) => (
          <div key={r.id} className="p-4 bg-white rounded-md shadow">
            <p className="text-base text-gray-800">
              <span className="font-semibold">Rating:</span> {r.ratingValue} / 5
            </p>
            <p className="text-gray-700 italic">"{r.review}"</p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <p className="text-gray-600 italic text-center">No ratings yet</p>
  )}
</div>


            {/* Book Button placed below climate */}
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PlaceDetails;
