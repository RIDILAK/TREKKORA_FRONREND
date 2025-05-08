import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Create Context
const WishListContext = createContext();

// Create custom hook
export const useWishList = () => useContext(WishListContext);

// Provider component
export const WishListProvider = ({ children }) => {
  const [wishList, SetWishList] = useState([]);
  const { id } = useParams();

  useEffect(()=>{
    GetWishList();
  },[])

  const GetWishList = () => {
    console.log("trigerring");
    
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/WishList/GetAll`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          id: id,
        },
      })
      .then((response) => {
        SetWishList(response.data.data);
        console.log(response.data.data,"get");
      })
      
    //   console.log(response.data.data);
      
      .catch((error) => console.error("Error fetching wishlist", error));
  };

  const AddOrRemoveWishList = (id) => {
    console.log(id,"fgh");
    
    axios
      .post(
        `${import.meta.env.VITE_BASEURL}/api/WishList/Add-or-Remove`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            placeId: id,
          },
        }
      )
      .then((response) => {
        GetWishList();
        toast.success(response.data.message);
        console.log(response);
        
      })
      .catch((error) => console.error("Error in add or remove", error));
  };

  return (
    <WishListContext.Provider
      value={{ wishList, SetWishList, AddOrRemoveWishList, GetWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
};
