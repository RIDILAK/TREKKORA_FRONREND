import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { name: "Users", icon: "👤", path: "/admin/users" },
    { name: "Requests", icon: "📥", path: "/admin/requests" },
    { name: "Guides", icon: "🧭", path: "/admin/guides" },
    { name: "Places", icon: "🗺️", path: "/admin/places" },
    {name:"Bookings",icon:"🧾",path:"/admin/bookings"}
  ];

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/register");
  };

  return (
    <div className="h-screen w-64 bg-primary text-white flex flex-col shadow-lg">
      <div className="text-2xl font-bold p-6 text-center border-b border-fourth">
        Admin Panel
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 
              ${isActive ? "bg-primary text-black font-semibold" : "hover:bg-fourth"}`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleSignOut}
        className="w-full p-4 bg-third text-black font-semibold hover:bg-fourth"
      >
        🚪 Sign Out
      </button>
    </div>
  );
};

export default SideBar;
