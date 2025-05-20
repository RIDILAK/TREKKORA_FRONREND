import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddPlace = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [countryForm, setCountryForm] = useState({ countryName: "", countryCode: "" });
  const [editingCountryId, setEditingCountryId] = useState(null);

  const [stateForm, setStateForm] = useState({ stateName: "", countryId: "" });
  const [editingStateId, setEditingStateId] = useState(null);

  const [placeForm, setPlaceForm] = useState({
    placeName: "",
    stateId: "",
    minimumDays: "",
    pincode: "",
    bestTimeToTravel: "",
    description: "",
    price: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCountries();
    fetchStates();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/Country/All`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCountries(res.data.data || []);
    } catch {
      toast.error("Failed to fetch countries");
    }
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/api/State/Get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStates(res.data.data || []);
    } catch {
      toast.error("Failed to fetch states");
    }
  };

  // Country Handlers
  const handleCountrySubmit = async () => {
    if (!countryForm.countryName || !countryForm.countryCode) return toast.error("Fill all country fields");
    const url = editingCountryId
      ? `${import.meta.env.VITE_BASEURL}/api/Country/Add?id=${editingCountryId}`
      : `${import.meta.env.VITE_BASEURL}/api/Country/Add`;
    try {
      await axios.post(url, countryForm, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(editingCountryId ? "Country updated" : "Country added");
      setCountryForm({ countryName: "", countryCode: "" });
      setEditingCountryId(null);
      fetchCountries();
    } catch {
      toast.error("Error saving country");
    }
  };

  const handleDeleteCountry = async (id) => {
    if (!confirm("Delete this country?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/api/Country/Delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Country deleted");
      fetchCountries();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEditCountry = (c) => {
    setEditingCountryId(c.id);
    setCountryForm({ countryName: c.countryName, countryCode: c.countryCode });
  };

  // State Handlers
  const handleStateSubmit = async () => {
    if (!stateForm.stateName || !stateForm.countryId) return toast.error("Fill all state fields");
    const url = editingStateId
      ? `${import.meta.env.VITE_BASEURL}/api/State/Update?id=${editingStateId}`
      : `${import.meta.env.VITE_BASEURL}/api/State/Add`;
    const method = editingStateId ? "put" : "post";

    try {
      await axios[method](url, stateForm, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(editingStateId ? "State updated" : "State added");
      setStateForm({ stateName: "", countryId: "" });
      setEditingStateId(null);
      fetchStates();
    } catch {
      toast.error("State save failed");
    }
  };

  const handleDeleteState = async (id) => {
    if (!confirm("Delete this state?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/api/State/Delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("State deleted");
      fetchStates();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEditState = (s) => {
    setEditingStateId(s.id);
    setStateForm({ stateName: s.stateName, countryId: s.countryId });
  };

  const getCountryName = (id) => countries.find((c) => c.id === id)?.countryName || "Unknown";

  // Add Place Handler (with image upload)
  const handlePlaceSubmit = async () => {
    const {
      placeName,
      stateId,
      minimumDays,
      pincode,
      bestTimeToTravel,
      description,
      price,
      image,
    } = placeForm;

    if (
      !placeName || !stateId || !minimumDays || !pincode ||
      !bestTimeToTravel || !description || !price || !image
    ) {
      toast.error("Fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("placeName", placeName);
    formData.append("stateId", stateId);
    formData.append("minimumDays", minimumDays);
    formData.append("pincode", pincode);
    formData.append("bestTimeToTravel", bestTimeToTravel);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image); // Actual file

    try {
      await axios.post(`${import.meta.env.VITE_BASEURL}/api/Place/AddPlace`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Place added");
      setPlaceForm({
        placeName: "",
        stateId: "",
        minimumDays: "",
        pincode: "",
        bestTimeToTravel: "",
        description: "",
        price: "",
        image: null,
      });
    } catch {
      toast.error("Failed to add place");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Country Management */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">🌍 Country Management</h2>
          <input className="w-full border p-2 mb-2 rounded" placeholder="Country Name"
            value={countryForm.countryName} onChange={(e) => setCountryForm({ ...countryForm, countryName: e.target.value })} />
          <input className="w-full border p-2 mb-2 rounded" placeholder="Country Code (e.g. IN)"
            value={countryForm.countryCode} onChange={(e) => setCountryForm({ ...countryForm, countryCode: e.target.value })} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCountrySubmit}>
            {editingCountryId ? "Update" : "Add"} Country
          </button>
          <table className="w-full mt-4 text-sm border">
            <thead className="bg-gray-200"><tr><th className="p-2 text-left">Name</th><th className="p-2">Code</th><th className="p-2">Actions</th></tr></thead>
            <tbody>
              {countries.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-2">{c.countryName}</td>
                  <td className="p-2">{c.countryCode}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => handleEditCountry(c)}>✏️</button>
                    <button onClick={() => handleDeleteCountry(c.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* State Management */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">🏞 State Management</h2>
          <input className="w-full border p-2 mb-2 rounded" placeholder="State Name"
            value={stateForm.stateName} onChange={(e) => setStateForm({ ...stateForm, stateName: e.target.value })} />
          <select className="w-full border p-2 mb-2 rounded"
            value={stateForm.countryId} onChange={(e) => setStateForm({ ...stateForm, countryId: e.target.value })}>
            <option value="">Select Country</option>
            {countries.map((c) => <option key={c.id} value={c.id}>{c.countryName}</option>)}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleStateSubmit}>
            {editingStateId ? "Update" : "Add"} State
          </button>
          <table className="w-full mt-4 text-sm border">
            <thead className="bg-gray-200"><tr><th className="p-2 text-left">State</th><th className="p-2">Country</th><th className="p-2">Actions</th></tr></thead>
            <tbody>
              {states.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.stateName}</td>
                  <td className="p-2">{getCountryName(s.countryId)}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => handleEditState(s)}>✏️</button>
                    <button onClick={() => handleDeleteState(s.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Place Section */}
      <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">📍 Add New Place</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Place Name" className="border p-2 rounded"
            value={placeForm.placeName} onChange={(e) => setPlaceForm({ ...placeForm, placeName: e.target.value })} />
          <select className="border p-2 rounded" value={placeForm.stateId}
            onChange={(e) => setPlaceForm({ ...placeForm, stateId: e.target.value })}>
            <option value="">Select State</option>
            {states.map((s) => <option key={s.id} value={s.id}>{s.stateName}</option>)}
          </select>
          <input placeholder="Minimum Days" className="border p-2 rounded"
            value={placeForm.minimumDays} onChange={(e) => setPlaceForm({ ...placeForm, minimumDays: e.target.value })} />
          <input placeholder="Pincode" className="border p-2 rounded"
            value={placeForm.pincode} onChange={(e) => setPlaceForm({ ...placeForm, pincode: e.target.value })} />
          <input placeholder="Best Time To Travel" className="border p-2 rounded"
            value={placeForm.bestTimeToTravel} onChange={(e) => setPlaceForm({ ...placeForm, bestTimeToTravel: e.target.value })} />
          <input placeholder="Price" className="border p-2 rounded"
            value={placeForm.price} onChange={(e) => setPlaceForm({ ...placeForm, price: e.target.value })} />
          <input type="file" accept="image/*" className="border p-2 rounded"
            onChange={(e) => setPlaceForm({ ...placeForm, image: e.target.files[0] })} />
          <textarea placeholder="Description" rows="3" className="border p-2 rounded col-span-1 md:col-span-2"
            value={placeForm.description} onChange={(e) => setPlaceForm({ ...placeForm, description: e.target.value })}></textarea>
        </div>
        <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded" onClick={handlePlaceSubmit}>
          Add Place
        </button>
      </div>
    </div>
  );
};

export default AddPlace;
