import axios from "axios";
import { createContext, useContext, useState } from "react";

// Create context
const userContext = createContext();

// Hook to use the context
export const useUser = () => useContext(userContext);

// Corrected Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const handleUser = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/User/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setUser(res.data.data);
        console.log("User fetched:", res.data.data);
      })
      .catch((error) => console.error("Error fetching user", error));
  };

  return (
    <userContext.Provider value={{ user, setUser, handleUser }}>
      {children}
    </userContext.Provider>
  );
};
