import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../LayOut/NavBar";


const calendarStyles = `
  .react-calendar {
    border: 1px solid #9AB3A5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif;
    width: 100%;
    max-width: 350px;
  }
  
  .react-calendar__tile--active {
    background: #1E3D2F !important;
    color: white;
  }
  
  .react-calendar__tile--now {
    background: #9AB3A5;
    color: white;
  }
  
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #BFBFBF;
  }
  
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #9AB3A5;
    color: white;
  }
  
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1E3D2F;
  }
`;

const Booking = () => {
  const { placeId } = useParams();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [place, setPlace] = useState(null);
  console.log("place",place);
  
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Fetch place info
  const fetchPlaceDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/Place/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          id: placeId ,
        },
      });
      setPlace(res.data.data);
      setPlace(res.data.data,"Places")
        console.log("res",res);

    } catch (error) {
      console.error("Error fetching place info", error);
    }
  };
  

  // Fetch guide info
  const fetchGuides = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/GetByPlace`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          placeId: placeId,
        },
      });
      setGuides(res.data.data || []);
    } catch (error) {
      console.error("Error fetching guides", error);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!place || !dateRange ||dateRange.length!==2) return;

    const days = (dateRange[1] - dateRange[0]) / (1000 * 3600 * 24) + 1;
    if (days >= place.minimumDays) {
      const pricePerPersonPerDay=place.price;
      const total = numberOfPeople * days* pricePerPersonPerDay;
      setTotalPrice(total);
    } else {
      setTotalPrice(0); 
    }
  };

  useEffect(() => {
    fetchPlaceDetails();
    fetchGuides();
  }, [placeId]);

  useEffect(() => {
    calculateTotalPrice();
  }, [numberOfPeople, dateRange, place]);

  const handlePayment = async (guideId) => {
    setSelectedGuide(guideId);
    setRequestSent(true);
    const payload = {
      placeId,
      guideId: guideId,
      numberOfPeople: numberOfPeople,
      startDate: dateRange[0].toISOString().split("T")[0],
      endDate: dateRange[1].toISOString().split("T")[0],
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/Booking/Create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // toast.success("Request Send");
      if(res.status===200){
        toast.success("Request Send")
      }
      setRequestSent(false);
      setSelectedGuide(null);
      navigate('/userbooking');
    } catch (err) {
      console.error("Booking failed:", err)
      if(err.response && err.response.status===400){
        toast.error("you must be book atleast minimum days for the trip")
      };
      toast.error("Booking Failed")
    }
  };

  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen">
      <style>{calendarStyles}</style>
      
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-l-[#1E3D2F]">
          <h2 className="text-3xl font-bold mb-2 text-[#1E3D2F]">
            Book Your Trek Adventure
          </h2>
          <p className="text-gray-600">Select your preferences and choose a guide for your journey</p>
        </div>
        
        {/* Booking Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#1E3D2F] border-b pb-2">Trip Details</h3>
            
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Number of People</label>
              <div className="flex items-center">
                <button 
                  className="bg-[#9AB3A5] text-white px-3 py-1 rounded-l-md"
                  onClick={() => numberOfPeople > 1 && setNumberOfPeople(numberOfPeople - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                  className="p-2 border-y text-center w-16"
                  readOnly
                />
                <button 
                  className="bg-[#9AB3A5] text-white px-3 py-1 rounded-r-md"
                  onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Select Date Range</label>
              <div className="flex justify-center">
                <Calendar 
                  selectRange={true} 
                  value={dateRange} 
                  onChange={setDateRange} 
                  className="rounded-md"
                  minDate={new Date()}
                />
              </div>
            </div>
          </div>
          
          {/* Price Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#1E3D2F] border-b pb-2">Price Summary</h3>
            
            {place ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Price per person Per day</span>
                  <span className="font-medium">₹{place.price.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Number of people</span>
                  <span className="font-medium">x {numberOfPeople}</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {Math.round((dateRange[1] - dateRange[0]) / (1000 * 3600 * 24) + 1)} days
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Minimum stay required</span>
                  <span className="font-medium">{place.minimumDays} days</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-[#1E3D2F]">Total Price</span>
                  <span className="text-lg font-bold text-[#1E3D2F]">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                
                {(dateRange[1] - dateRange[0]) / (1000 * 3600 * 24) + 1 < place.minimumDays && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mt-3">
                    <p className="text-sm">Your selected duration is less than the minimum required stay of {place.minimumDays} days.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Loading price information...</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Guides Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-6 text-[#1E3D2F] pb-2 border-b">Available Guides</h3>
          
          {guides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <div 
                  key={index} 
                  className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={guide.getGuideProfileDto.profileImage}
                      alt={guide.name}
                      className="w-full h-100 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-xl font-semibold text-white">{guide.name}</h3>
                      <p className="text-sm text-gray-200">
                        {guide.getGuideProfileDto.experience} years experience
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#9AB3A5] text-white text-xs px-2 py-1 rounded-full">
                          {guide.getGuideProfileDto.languages}
                        </span>
                        <span className="bg-[#BFBFBF] text-gray-800 text-xs px-2 py-1 rounded-full">
                          {guide.getGuideProfileDto.areasCovered}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">
                        {guide.getGuideProfileDto.bio}
                      </p>
                      
                      <div className="bg-gray-50 border-l-2 border-[#1E3D2F] p-3 italic text-sm text-gray-700">
                        "{guide.getGuideProfileDto.whyTravelWithMe}"
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        className="flex-1 px-4 py-2 bg-[#9AB3A5] text-white rounded hover:bg-[#8aa396] transition-colors font-medium"
                        onClick={() => handlePayment(guide.getGuideProfileDto.guideId)}
                      >
                        Request Guide
                      </button>
                      
                      <button
                        className="px-4 py-2 bg-[#D9D9D9] text-gray-800 rounded hover:bg-[#BFBFBF] transition-colors"
                        disabled={!requestSent || selectedGuide !== guide.getGuideProfileDto.guideId}
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-lg shadow text-center">
              <p className="text-gray-600">No guides available for this location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Booking;