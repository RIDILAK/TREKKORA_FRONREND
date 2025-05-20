import React, { useEffect, useState } from "react";
import axios from "axios";
// import Sidebar from "../components/Sidebar"; // Adjust the path as needed
import SideBar from "../../Layout/SideBar";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/api/User/Get-All`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  return (
    <div className="flex ml-64 p-6 bg-secondary min-h-screen">
      <SideBar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-third mb-6">User List</h2>

        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-primary text-black">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 text-center">
                    {/* <button
                      onClick={() => alert(JSON.stringify(user, null, 2))}
                      className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-80"
                    >
                      View More
                    </button> */}
                    <button onClick={()=>navigate(`/userlistdetails/${user.id}`)}
                        className="bg-primary text-white px-3 py-1 rounded hover:bg-opacity-80">
                        View More
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
