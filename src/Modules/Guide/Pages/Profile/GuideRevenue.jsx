import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import moment from "moment";

const GuideRevenue = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASEURL}/api/Booking/GetByGuide`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  const approvedBookings = bookings.filter((b) => b.status === "Approved");
  const completedBookings = bookings.filter((b) => b.status === "Completed");

  const totalPendingSalary = approvedBookings.reduce(
    (sum, b) => sum + b.guideSalary,
    0
  );
  const totalCompletedSalary = completedBookings.reduce(
    (sum, b) => sum + b.guideSalary,
    0
  );

  const chartData = {
    labels: ["Pending Revenue", "Completed Revenue"],
    datasets: [
      {
        label: "Guide Salary (₹)",
        data: [totalPendingSalary, totalCompletedSalary],
        backgroundColor: ["#9AB3A5", "#1E3D2F"],
        barThickness: 40,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#1E3D2F",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#1E3D2F",
        },
        grid: {
          color: "#D9D9D9",
        },
      },
      x: {
        ticks: {
          color: "#1E3D2F",
        },
        grid: {
          color: "#D9D9D9",
        },
      },
    },
  };

  return (
    <div className="p-6 bg-secondary min-h-screen">
      <h2 className="text-3xl font-bold text-third mb-6">Guide Revenue</h2>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-xl font-semibold text-primary mb-4">
          Revenue Summary
        </h3>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Pending Revenue
          </h3>
          {approvedBookings.length === 0 ? (
            <p className="text-fourth">No pending revenues available.</p>
          ) : (
            approvedBookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="border-b border-fourth py-3"
              >
                <p>
                  <strong>Booking ID:</strong> {booking.bookingId}
                </p>
                <p>
                  <strong>User:</strong> {booking.userName}
                </p>
                <p>
                  <strong>Place:</strong> {booking.placeName}
                </p>
                <p>
                  <strong>No. of People:</strong> {booking.numberOfPeople}
                </p>
                <p>
                  <strong>Guide Salary:</strong> ₹{booking.guideSalary}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {moment(booking.startDate).format("YYYY-MM-DD")}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {moment(booking.endDate).format("YYYY-MM-DD")}
                </p>
                <p>
                  <strong>Booked On:</strong>{" "}
                  {moment(booking.bookingDate).format("YYYY-MM-DD")}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Completed Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Completed Revenue
          </h3>
          {completedBookings.length === 0 ? (
            <p className="text-fourth">No completed revenues available.</p>
          ) : (
            completedBookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="border-b border-fourth py-3"
              >
                <p>
                  <strong>Booking ID:</strong> {booking.bookingId}
                </p>
                <p>
                  <strong>User:</strong> {booking.userName}
                </p>
                <p>
                  <strong>Place:</strong> {booking.placeName}
                </p>
                <p>
                  <strong>No. of People:</strong> {booking.numberOfPeople}
                </p>
                <p>
                  <strong>Guide Salary:</strong> ₹{booking.guideSalary}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {moment(booking.startDate).format("YYYY-MM-DD")}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {moment(booking.endDate).format("YYYY-MM-DD")}
                </p>
                <p>
                  <strong>Booked On:</strong>{" "}
                  {moment(booking.bookingDate).format("YYYY-MM-DD")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideRevenue;
