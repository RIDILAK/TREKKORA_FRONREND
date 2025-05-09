// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const Booking = () => {
//   const { placeId } = useParams();
//   const [numberOfPeople, setNumberOfPeople] = useState(1);
//   const [dateRange, setDateRange] = useState([new Date(), new Date()]);
//   const [guides, setGuides] = useState([]);
//   const [selectedGuide, setSelectedGuide] = useState(null);
//   const [requestSent, setRequestSent] = useState(false);

//   const fetchGuides2= async()=>{
//     console.log(placeId,"derfghj");
    
//    try {
//     const res= await axios.get(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/GetByPlace`,{
//         headers:{
//             Authorization:`Bearer ${localStorage.getItem("token")}`,
//         },
//         params:{
//             placeId:placeId
//         },
//     });
//     console.log(res.data.data,"Fetched Guides");
//     console.log(res,"res");
    
//      setGuides(res.data.data ||[])
    
//    } catch (error) {
//     console.error("Errorin fetching guides",error);
    
//    }
//   }

//   useEffect(() => {
//     fetchGuides2();
//   }, [placeId]);

//   const handleRequest = (guideId) => {
//     setSelectedGuide(guideId);
//     setRequestSent(true);
//   };

//   const handlePayment = async () => {
//     const payload = {
//       placeId,
//       guideId: selectedGuide,
//       numberOfPeople: numberOfPeople,
//       startDate: dateRange[0].toISOString().split("T")[0],
//       endDate: dateRange[1].toISOString().split("T")[0],
     
      
//     };
//     console.log(payload,"payllod");
//     try {
//         console.log(dateRange,"dsfgh");
        
//       const res = await axios.post(`${import.meta.env.VITE_BASEURL}/api/Booking/Create`, payload,{
//         headers:{
//             Authorization:`Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       log(res.data.data,"vgbn")
//       alert("Booking Created Successfully!");
//     } catch (err) {
//       console.error("Booking failed:", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4" style={{ color: "#1E3D2F" }}>
//         Book Your Trek
//       </h2>

//       <div className="mb-4">
//         <label className="block mb-2 text-sm">Number of People</label>
//         <input
//           type="number"
//           min="1"
//           value={numberOfPeople}
//           onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
//           className="p-2 border rounded w-32"
//         />
//       </div>

//       <div className="mb-6">
//         <label className="block mb-2 text-sm">Select Date Range</label>
//         <Calendar
//           selectRange={true}
//           value={dateRange}
//           onChange={setDateRange}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {guides.map((guide, index) => (
//           <div key={index} className="border rounded p-4 shadow-md bg-white">
//             <img
//               src={guide.getGuideProfileDto.profileImage}
//               alt={guide.name}
//               className="w-full h-48 object-cover rounded mb-3"
//             />
//             <h3 className="text-xl font-semibold" style={{ color: "#1E3D2F" }}>
//               {guide.name}
//             </h3>
//             <p className="text-sm text-gray-600">
//               {guide.getGuideProfileDto.languages}
//             </p>
//             <p className="text-sm">
//               Experience: {guide.getGuideProfileDto.experience} years
//             </p>
//             <p className="text-sm">
//               Areas Covered: {guide.getGuideProfileDto.areasCovered}
//             </p>
//             <p className="text-sm mt-2 text-gray-700">
//               {guide.getGuideProfileDto.bio}
//             </p>
//             <p className="text-sm mt-1 text-gray-700 italic">
//               "{guide.getGuideProfileDto.whyTravelWithMe}"
//             </p>

//             <div className="mt-4 flex gap-2">
//               <button
//                 className="px-4 py-2 bg-[#9AB3A5] text-white rounded"
//                 onClick={() => handleRequest(guide.getGuideProfileDto.guideId)}
//               >
//                 Request
//               </button>
//               <button
//                 className="px-4 py-2 bg-[#D9D9D9] text-black rounded"
//                 disabled={
//                   !requestSent ||
//                   selectedGuide !== guide.getGuideProfileDto.guideId
//                 }
//               >
//                 Message
//               </button>
//               <button
//                 className="px-4 py-2 bg-[#1E3D2F] text-white rounded"
//                 disabled={
//                   !requestSent ||
//                   selectedGuide !== guide.getGuideProfileDto.guideId
//                 }
//                 onClick={handlePayment}
//               >
//                 Payment
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Booking;
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
  const [place, setPlace] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch place info
  const fetchPlaceDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/Place/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          placeId: placeId,
        },
      });
      setPlace(res.data.data);
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
    if (!place) return;

    const days = (dateRange[1] - dateRange[0]) / (1000 * 3600 * 24) + 1;
    if (days >= place.minimumDays) {
      const price = numberOfPeople * place.price;
      setTotalPrice(price);
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
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/api/Booking/Create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Booking Created Successfully!");
      re
      setRequestSent(false);
      setSelectedGuide(null);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking Failed!");
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

      <div className="mb-4">
        <label className="block mb-2 text-sm">Select Date Range</label>
        <Calendar selectRange={true} value={dateRange} onChange={setDateRange} />
      </div>

      {place && (
        <div className="mb-6">
          <p className="text-md">
            <strong>Per Person Price:</strong> ₹{place.price}
          </p>
          <p className="text-md">
            <strong>Minimum Days Required:</strong> {place.minimumDays}
          </p>
          <p className="text-md text-green-700 font-semibold">
            <strong>Total Price:</strong> ₹{totalPrice}
          </p>
        </div>
      )}

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
            <p className="text-sm mt-2 text-gray-700">{guide.getGuideProfileDto.bio}</p>
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
                  !requestSent || selectedGuide !== guide.getGuideProfileDto.guideId
                }
              >
                Message
              </button>
              <button
                className="px-4 py-2 bg-[#1E3D2F] text-white rounded"
                disabled={
                  !requestSent || selectedGuide !== guide.getGuideProfileDto.guideId
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
