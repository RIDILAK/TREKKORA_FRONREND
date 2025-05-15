import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('Pending');

  const fetchRequests = (status) => {
    let endpoint = '';

    switch (status) {
      case 'Pending':
        endpoint = '/api/Booking/Pending=Requests';
        break;
      case 'Approved':
        endpoint = '/api/Booking/ApprovedRequests';
        break;
      case 'Rejected':
        endpoint = '/api/Booking/RejectedRequests';
        break;
      case 'Completed':
        endpoint = '/api/Booking/CompletedRequests';
        break;
      default:
        return;
    }

    axios
      .get(`${import.meta.env.VITE_BASEURL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setRequests(res.data.data);
      })
      .catch((err) => {
        console.error(`Error fetching ${status.toLowerCase()} requests`, err);
      });
  };

  useEffect(() => {
    fetchRequests(activeTab);
  }, [activeTab]);

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASEURL}/api/Booking/Update-Status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },params:{
            Id:bookingId
          }
        }
      );
      fetchRequests(activeTab); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-fourth py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Booking Requests
      </h1>

      {/* Tab Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {['Pending', 'Approved', 'Rejected', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeTab === status
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Requests List */}
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req.bookingId}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-primary">{req.userName}</h2>
                <p className="text-gray-500 text-sm">Booking ID: {req.bookingId}</p>
              </div>

              <div className="text-gray-700 text-sm space-y-1">
                <p><strong>Number of People:</strong> {req.numberOfPeople}</p>
                <p><strong>Total Price:</strong> ₹{req.totalPrice}</p>
                <p><strong>Booking Date:</strong> {new Date(req.bookingDate).toLocaleDateString()}</p>
                <p><strong>Start Date:</strong> {new Date(req.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(req.endDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {calculateDuration(req.startDate, req.endDate)}</p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
                    req.status
                  )}`}
                >
                  {req.status}
                </p>

                {/* Action Buttons */}
                {activeTab === 'Pending' && (
                  <div className="space-x-2">
                    <button
                      onClick={() => updateStatus(req.bookingId, 'Approved')}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(req.bookingId, 'Rejected')}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {activeTab === 'Approved' && (
                  <button
                    onClick={() => updateStatus(req.bookingId, 'Completed')}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary mt-10">
          No {activeTab.toLowerCase()} requests found.
        </p>
      )}
    </div>
  );
};

export default Requests;
