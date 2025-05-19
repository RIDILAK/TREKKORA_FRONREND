import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 

  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_BASEURL}/api/Auth/Login`, {
        email,
        password,
      })
      .then((res) => {
      if (res.status === 200) {
        const token = res.data.data;
        const role = res.data.message;

        localStorage.setItem("token", token);
        toast.success("Login Successful!");

        if (email === "admin@gmail.com") {
          navigate("/dashboard");
        } else if (role === "User") {
          navigate("/");
        } else if (role === "Guide") {
          navigate("/guidehome");
        }
      }
    })
      .catch((err) => {
        console.error(err);
        // Swal.fire({
        //   icon: "error",
        //   text: err.response?.data?.message || "Invalid email or password",
        // });
    
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-fourth">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary text-center mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-primary mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium text-primary mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
