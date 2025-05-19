import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import SideBar from '../Layout/SideBar';

const DashBoard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    completed: 0,
    users: 0,
    blockedUsers: 0,
    deletedAccounts: 0,
    guides: 0,
    availableGuides: 0,
    approvedGuides: 0,
    places: 0,
    revenue: 0,
    expenses: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [ordersRes, usersRes, guidesRes, placesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASEURL}/api/Booking/Get-All`),
        axios.get(`${import.meta.env.VITE_BASEURL}/api/User/Get-All`),
        axios.get(`${import.meta.env.VITE_BASEURL}/api/GuidProfile/get-all`),
        axios.get(`${import.meta.env.VITE_BASEURL}/api/Place/GettAll`),
      ]);

      const bookings = ordersRes.data?.data || [];
      const users = usersRes.data?.data || [];
      const guides = guidesRes.data?.data || [];

      const approved = bookings.filter(b => b.status === 'Approved').length;
      const pending = bookings.filter(b => b.status === 'Pending').length;
      const rejected = bookings.filter(b => b.status === 'Rejected').length;
      const completed = bookings.filter(b => b.status === 'Completed').length;

      const availableGuides = guides.filter(g => g.getGuideProfileDto?.isAvailable && g.getGuideProfileDto.isApproved).length;
      const approvedGuides = guides.filter(g => g.getGuideProfileDto?.isApproved).length;

      const blockedUsers = users.filter(u => u.isBlocked).length;
      const deletedAccounts = users.filter(u => u.isDeleted).length;

      const revenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      const expenses = bookings.reduce((sum, b) => sum + (b.guideSalary || 0), 0);

      setStats({
        orders: bookings.length,
        approved,
        pending,
        rejected,
        completed,
        users: users.length,
        blockedUsers,
        deletedAccounts,
        guides: guides.length,
        availableGuides,
        approvedGuides,
        places: placesRes.data?.data?.length || 0,
        revenue,
        expenses,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const revenueData = {
    labels: ['Revenue', 'Expenses'],
    datasets: [
      {
        label: 'Amount (₹)',
        data: [stats.revenue, stats.expenses],
        backgroundColor: ['#4CAF50', '#F44336'],
        barThickness: 50,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#1E3D2F',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#1E3D2F',
        },
        grid: {
          color: '#E0E0E0',
        },
      },
      x: {
        ticks: {
          color: '#1E3D2F',
        },
        grid: {
          color: '#E0E0E0',
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-fourth p-10 text-third">
        <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">Total Bookings</h2>
            <p className="text-3xl font-bold text-third mb-4">{stats.orders}</p>
            <div className="text-sm space-y-1 text-gray-600">
              <p>✅ Approved: {stats.approved}</p>
              <p>⏳ Pending: {stats.pending}</p>
              <p>❌ Rejected: {stats.rejected}</p>
              <p>📦 Completed: {stats.completed}</p>
            </div>
          </div>

          {/* Guides */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">Total Guides</h2>
            <p className="text-3xl font-bold text-third mb-4">{stats.guides}</p>
            <div className="text-sm space-y-1 text-gray-600">
              <p>✅ Approved: {stats.approvedGuides}</p>
              <p>⏳Pendings: {stats.availableGuides}</p>
            </div>
          </div>

          {/* Users */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-third mb-4">{stats.users}</p>
            <div className="text-sm space-y-1 text-gray-600">
              <p>🚫 Blocked: {stats.blockedUsers}</p>
              <p>🗑️ Deleted: {stats.deletedAccounts}</p>
            </div>
          </div>

          {/* Places */}
          <StatCard label="Total Places" value={stats.places} />
        </div>

        {/* Revenue vs Expenses Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">Revenue vs Expenses</h2>
          <div className="h-64">
            <Bar data={revenueData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
    <h2 className="text-2xl font-semibold text-primary mb-2">{label}</h2>
    <p className="text-3xl font-bold text-third">{value}</p>
  </div>
);

export default DashBoard;
