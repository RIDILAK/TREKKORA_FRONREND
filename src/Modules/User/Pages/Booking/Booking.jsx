import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Booking = () => {
  const { placeId } = useParams();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const fetchGuides2= async()=>{
    console.log(placeId,"derfghj");
    
   try {
    const res= await axios.get(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/GetByPlace`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        params:{
            placeId:placeId
        },
    });
    console.log(res.data.data,"Fetched Guides");
    console.log(res,"res");
    
     setGuides(res.data.data ||[])
    
   } catch (error) {
    console.error("Errorin fetching guides",error);
    
   }
  }

//   const fetchGuides = async () => {
//     try {
//       console.log("edrfgthyj");
//       const res = await axios.get(`/api/GuidProfile/GetByPlace`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         params: {
//           placeId: placeId,
//         },
//       });
//       console.log(res?.data?.data, "Fetched guides");

//       setGuides(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching guides:", err);
//     }
//   };
  
  useEffect(() => {
    fetchGuides2();
  }, [placeId]);

  const handleRequest = (guideId) => {
    setSelectedGuide(guideId);
    setRequestSent(true);
  };

  const handlePayment = async () => {
    const payload = {
      placeId,
      guideId: selectedGuide,
      numberOfPeople: numberOfPeople,
      startDate: dateRange[0].toISOString().split("T")[0],
      endDate: dateRange[1].toISOString().split("T")[0],
    };
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASEURL}/api/Booking/Create`, payload);
      alert("Booking Created Successfully!");
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E3D2F" }}>
        Book Your Trek
      </h2>

      <div className="mb-4">
        <label className="block mb-2 text-sm">Number of People</label>
        <input
          type="number"
          min="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
          className="p-2 border rounded w-32"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm">Select Date Range</label>
        <Calendar
          selectRange={true}
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((guide, index) => (
          <div key={index} className="border rounded p-4 shadow-md bg-white">
            <img
              src={guide.getGuideProfileDto.profileImage}
              alt={guide.name}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold" style={{ color: "#1E3D2F" }}>
              {guide.name}
            </h3>
            <p className="text-sm text-gray-600">
              {guide.getGuideProfileDto.languages}
            </p>
            <p className="text-sm">
              Experience: {guide.getGuideProfileDto.experience} years
            </p>
            <p className="text-sm">
              Areas Covered: {guide.getGuideProfileDto.areasCovered}
            </p>
            <p className="text-sm mt-2 text-gray-700">
              {guide.getGuideProfileDto.bio}
            </p>
            <p className="text-sm mt-1 text-gray-700 italic">
              "{guide.getGuideProfileDto.whyTravelWithMe}"
            </p>

            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-[#9AB3A5] text-white rounded"
                onClick={() => handleRequest(guide.getGuideProfileDto.guideId)}
              >
                Request
              </button>
              <button
                className="px-4 py-2 bg-[#D9D9D9] text-black rounded"
                disabled={
                  !requestSent ||
                  selectedGuide !== guide.getGuideProfileDto.guideId
                }
              >
                Message
              </button>
              <button
                className="px-4 py-2 bg-[#1E3D2F] text-white rounded"
                disabled={
                  !requestSent ||
                  selectedGuide !== guide.getGuideProfileDto.guideId
                }
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
