import React from "react";
import mainLogo from "../../../assets/Trekkora-Logo.png"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (role) => {
    navigate("/signup", { state: { role } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-fourth">
      <div className="bg-primary rounded-xl p-10 w-[90%] max-w-xl text-center shadow-lg">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto">
            {/* Replace with your actual logo */}
            <img src={mainLogo} alt="Trekkora" className="w-20 h-20 rounded-full object-cover" />

          </div>
         
        </div>
        {/* <p className="text-sm text-white mb-6">
          Registration form for user and guide
        </p> */}
        <div className="flex justify-center gap-4">
          <button
            className="bg-secondary text-black px-6 py-2 rounded-full hover:bg-third hover:text-white transition"
            onClick={() => handleRegister("User")}
          >
            REGISTER AS USER
          </button>
          <button
            className="bg-secondary text-black px-6 py-2 rounded-full hover:bg-third hover:text-white transition"
            onClick={() => handleRegister("Guide")}
          >
            REGISTER AS GUIDE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
