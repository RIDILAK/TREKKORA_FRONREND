import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const location = useLocation();
  const role = location.state?.role;

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handlenavigate=()=>{
    navigate('/login')
}
  const handleSubmit = async (e) => {
    console.log(role);
    
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASEURL}/api/Auth/Register`, {
        name: formData.fullName,
        email: formData.email,
        role:role,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("Registration successful");
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setMessage(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 bg-third text-white p-10 flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
          <p className="text-center text-lg">Start your journey with us. Join today!</p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold text-third mb-2">Sign Up</h2>
          <p className="text-fourth mb-6">Create your account</p>

          {message && <div className="mb-4 text-sm text-red-600">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-third">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full mt-1 px-4 py-2 border border-fourth rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-third">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full mt-1 px-4 py-2 border border-fourth rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-third">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border border-fourth rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-third">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border border-fourth rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-md hover:bg-third transition"
              onClick={handlenavigate}
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
