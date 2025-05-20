import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "../../Layout/SideBar";
import ImageViewer from "@/Components/ImageViewer";
import toast from "react-hot-toast";

const PlaceListDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    placeName: "",
    description: "",
    imageUrl: "",
    price: 0,
    stateId: "",
    countryId: "",
    minimumDays: 0,
    bestTimeToTravel: "",
    pincode: "",
    image: null,
  });

  useEffect(() => {
    fetchPlaceDetails();
    fetchStates();
    fetchCountries();
  }, []);

  const fetchPlaceDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/Place/GetById?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setPlace(data);
      setFormData({
        placeName: data.placeName,
        description: data.description,
        price: data.price,
        stateId: data.stateId,
        countryId: data.countryId,
        minimumDays: data.minimumDays,
        bestTimeToTravel: data.bestTimeToTravel,
        pincode: data.pincode,
        imageUrl: data.imageUrl,
        image: null,
      });
    } catch (error) {
      console.error("Error fetching place:", error);
    } finally {
      setLoading(false);
    }
  };
  const deletePlace=async ()=>{
    try{
        const token=localStorage.getItem("token");
        const res= await axios.delete(`${import.meta.env.VITE_BASEURL}/api/Place/Delete?id=${id} `,{
            headers:{Authorization:`Bearer ${token}`}
        });
        toast.success("place Deleted Succesfully!")
        navigate('/placelist')
    }catch(error){
        toast.error("Failed to delete place")
    }
  }

  const fetchStates = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/State/Get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(res.data.data || []);
      console.log(res.data.data,"states");
      
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/Country/All`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCountries(res.data.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) payload.append(key, formData[key]);
      }

      await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/Place/Update-Place?id=${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Place updated successfully!");
      setIsModalOpen(false);
      fetchPlaceDetails();
    } catch (error) {
      console.error("Failed to update place:", error);
      toast.error("Failed to update!");
    }
  };

  if (loading) return <div className="ml-64 p-6 text-center">Loading...</div>;
  if (!place) return <div className="ml-64 p-6 text-center">Place not found.</div>;

  return (
    <div className="flex ml-64 p-6 bg-secondary min-h-screen">
      <SideBar />
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 relative">
        <h2 className="text-3xl font-bold text-third mb-4">{place.placeName}</h2>

        <ImageViewer
          base64Data={place.imageUrl}
          alt={place.placeName}
          className="w-[500px] h-80 object-cover rounded-lg mb-6"
        />

        <div className="space-y-2 text-gray-800">
          <p><strong>Description:</strong> {place.description}</p>
          <p><strong>Price:</strong> ₹{place.price}</p>
          <p><strong>Location:</strong> {place.stateName}, {place.countryName}</p>
          <p><strong>Minimum Days:</strong> {place.minimumDays}</p>
          <p><strong>Best Time to Travel:</strong> {place.bestTimeToTravel}</p>
          <p><strong>Pincode:</strong> {place.pincode}</p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded mt-4"
          >
            ✏️ Update Place
          </button>
              <button
  onClick={deletePlace}
  className="bg-red-600 text-white px-4 py-2 rounded mt-4 ml-4"
>
  🗑️ Delete Place
</button>
        </div>
    

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative">
              <button
                className="absolute top-2 right-3 text-xl text-gray-500 hover:text-black"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>

              <h3 className="text-2xl font-bold mb-4">Edit Place</h3>

              <div className="space-y-3">
                <input name="placeName" value={formData.placeName} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Place Name" />
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Description" />
                <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Price" />

                <select name="stateId" value={formData.stateId} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>{state.stateName},{state.countryName}</option>
                  ))}
                </select>

                <select name="countryId" value={formData.countryId} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>{country.countryName}</option>
                  ))}
                </select>

                <input name="minimumDays" type="number" value={formData.minimumDays} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Minimum Days" />
                <input name="bestTimeToTravel" value={formData.bestTimeToTravel} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Best Time to Travel" />
                <input name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Pincode" />
                <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded" />

                <div className="flex gap-4 mt-4">
                  <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                  <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceListDetails;
