import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageViewer from "../../../../Components/ImageViewer";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [booking, setBooking] = useState([]);
  const [RatePlace, setRatePlace] = useState({});
  const [RateGuide, setRateGuide] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    fetchUser();
    fetchBooking();
  }, [userId]);

  const fetchUser = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/User/GetById`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      })
      .then((res) => setUser(res.data.data))
      .catch((error) => console.error("Error in Fetching User", error));
  };

  const fetchBooking = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/api/Booking/User`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId },
      })
      .then((res) => {
        setBooking(res.data.data);
        console.log(res, "cfvgbhn");
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
      });
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const handleRatePlace = (placeId, ratingValue, review) => {
    axios
      .post(
        `${import.meta.env.VITE_BASEURL}/api/Rating/Place`,
        {
          placeId,
          ratingValue,
          review,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setRatePlace((prev) => ({
          ...prev,
          [placeId]: {
            ...prev[placeId],
            submitted: true,
          },
        }));
        console.log("Place Rating submitted successfully", res.data.data);
        if (res.status === 200) {
          toast.success("Rating Submitted");
        }
      })

      .catch((err) => {
        console.error("Error in rating Place", err);
        if (err.response && err.response.status === 400) {
          toast.error("You have already rated this place");
        }
      });
  };

  const handleRateGuide = (guideId, ratingValue, review) => {
    axios
      .post(
        `${import.meta.env.VITE_BASEURL}/api/Rating/Guide`,
        {
          guideId,
          ratingValue,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
  setRateGuide((prev) => ({
    ...prev,
    [guideId]: {
      ...prev[guideId],
      submitted: true,
    },
  }));
  console.log("Guide Rating submitted Successfully", res.data.data);
  if (res.success === 200) {
    toast.success("Rating Submitted");
  }
})
.catch((error) => {
  console.error("Error in Guide rating", error);
  if (error.response && error.response.status === 400) {
    toast.error("You have already rated this guide");
  }
});

  };

  const confirmDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/api/User/DeleteUser`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        localStorage.removeItem("token");
        window.location.href = "/register";
      })
      .catch((error) => console.error("Error deleting account", error));

    setShowDeleteConfirm(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      {user ? (
        <>
          <div className="bg-gradient-to-r from-[#1E3D2F] to-[#9AB3A5] p-8 flex justify-center">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-[#D9D9D9] flex items-center justify-center border-4 border-white shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12 text-[#1E3D2F]"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-[#1E3D2F] text-center border-b border-gray-200 pb-4 tracking-tight">
              {user.name}
            </h2>

            <div className="mb-8">
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#9AB3A5] mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleDeleteAccount}
              className="w-full py-3 px-4 bg-red-100 text-red-700 rounded-md border border-red-300 hover:bg-red-200 transition-all font-medium flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Account
            </button>

            {/* Booking List */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-[#1E3D2F] mb-6">
                Your Bookings
              </h3>
              {booking.length > 0 ? (
                <ul className="space-y-6">
                  {[...booking]
                    .sort(
                      (a, b) => new Date(a.startDate) - new Date(b.startDate)
                    )
                    .map((item) => {
                      const start = new Date(item.startDate);
                      const end = new Date(item.endDate);
                      const visitedDays = Math.ceil(
                        (end - start) / (1000 * 60 * 60 * 24)
                      );

                      return (
                        <li
                          key={item.bookingId}
                          className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <div className="flex gap-5 mb-4">
                            <ImageViewer
                              base64Data={item.imageUrl}
                              alt={item.placeName}
                              className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h4 className="text-lg font-semibold text-[#1E3D2F]">
                                  {item.placeName}
                                </h4>
                                <span
                                  className={`text-sm px-2 py-1 rounded-full ${
                                    item.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {item.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium text-[#1E3D2F]">
                                  Start:
                                </span>{" "}
                                {start.toLocaleDateString()}{" "}
                                <span className="font-medium text-[#1E3D2F]">
                                  — End:
                                </span>{" "}
                                {end.toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-[#1E3D2F]">
                                  Duration:
                                </span>{" "}
                                {visitedDays}{" "}
                                {visitedDays === 1 ? "day" : "days"}
                              </p>
                            </div>
                          </div>

                          {item.status === "Completed" && (
                            <div className="mt-4 border-t pt-4">
                              <h4 className="text-md font-semibold text-[#1E3D2F] mb-2">
                                Rate your experience:
                              </h4>
                              <div className="flex items-center mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    role="button"
                                    aria-label={`Rate ${star} star`}
                                    onClick={() =>
                                      setRatePlace((prev) => ({
                                        ...prev,
                                        [item.placeId]: {
                                          ...(prev[item.placeId] || {}),
                                          ratingValue: star,
                                          submitted: false,
                                          review:
                                            prev[item.placeId]?.review || "",
                                        },
                                      }))
                                    }
                                    className={`w-6 h-6 cursor-pointer ${
                                      RatePlace[item.placeId]?.ratingValue >=
                                      star
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.293 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                                  </svg>
                                ))}
                              </div>
                              <textarea
                                rows="2"
                                placeholder="Write your review..."
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                                value={RatePlace[item.placeId]?.review || ""}
                                onChange={(e) =>
                                  setRatePlace((prev) => ({
                                    ...prev,
                                    [item.placeId]: {
                                      ...(prev[item.placeId] || {}),
                                      review: e.target.value,
                                      ratingValue:
                                        prev[item.placeId]?.ratingValue || 0,
                                      submitted: false,
                                    },
                                  }))
                                }
                              ></textarea>
                              <button
                                className="mt-2 px-4 py-2 bg-[#1E3D2F] text-white text-sm rounded hover:bg-[#2e5545] disabled:opacity-50"
                                onClick={() => {
                                  handleRatePlace(
                                    item.placeId,
                                    RatePlace[item.placeId]?.ratingValue,
                                    RatePlace[item.placeId]?.review
                                  );
                                  setRatePlace((prev) => ({
                                    ...prev,
                                    [item.placeId]: {
                                      ...prev[item.placeId],
                                      submitted: true,
                                    },
                                  }));
                                }}
                                disabled={
                                  RatePlace[item.placeId]?.submitted ||
                                  !RatePlace[item.placeId]?.ratingValue ||
                                  !RatePlace[item.placeId]?.review
                                }
                              >
                                {RatePlace[item.placeId]?.submitted
                                  ? "Rating Submitted"
                                  : "Submit Rating"}
                              </button>
                            </div>
                          )}

                          {item.status === "Completed" && (
                            <div className="mt-6 border-t pt-4">
                              <h4 className="text-md font-semibold text-[#1E3D2F] mb-2">
                                Rate your guide:
                              </h4>
                              <div className="flex items-center mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg
                                    key={star}
                                    onClick={() =>
                                      setRateGuide((prev) => ({
                                        ...prev,
                                        [item.guideId]: {
                                          ...(prev[item.guideId] || {}),
                                          ratingValue: star,
                                          submitted: false,
                                          review:
                                            prev[item.guideId]?.review || "",
                                        },
                                      }))
                                    }
                                    className={`w-6 h-6 cursor-pointer ${
                                      RateGuide[item.guideId]?.ratingValue >=
                                      star
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.293 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                                  </svg>
                                ))}
                              </div>
                              <textarea
                                rows="2"
                                placeholder="Write your review about the guide..."
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                                value={RateGuide[item.guideId]?.review || ""}
                                onChange={(e) =>
                                  setRateGuide((prev) => ({
                                    ...prev,
                                    [item.guideId]: {
                                      ...(prev[item.guideId] || {}),
                                      review: e.target.value,
                                      ratingValue:
                                        prev[item.guideId]?.ratingValue || 0,
                                      submitted: false,
                                    },
                                  }))
                                }
                              ></textarea>
                              <button
                                className="mt-2 px-4 py-2 bg-[#1E3D2F] text-white text-sm rounded hover:bg-[#2e5545] disabled:opacity-50"
                                onClick={() =>
                                  handleRateGuide(
                                    item.guideId,
                                    RateGuide[item.guideId]?.ratingValue,
                                    RateGuide[item.guideId]?.review
                                  )
                                }
                                disabled={
                                  RateGuide[item.guideId]?.submitted ||
                                  !RateGuide[item.guideId]?.ratingValue ||
                                  !RateGuide[item.guideId]?.review
                                }
                              >
                                {RateGuide[item.guideId]?.submitted
                                  ? "Rating Submitted"
                                  : "Submit Rating"}
                              </button>
                            </div>
                          )}

                          <div className="flex items-center mt-4 border-t pt-4 border-gray-100">
                            <img
                              src={item.guideImage || "/default-guide.jpg"}
                              onError={(e) =>
                                (e.target.src = "/default-guide.jpg")
                              }
                              alt={item.guideName}
                              className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-300"
                            />
                            <div>
                              <p className="text-sm font-medium text-[#1E3D2F]">
                                {item.guideName}
                              </p>
                              <p className="text-xs text-gray-500">
                                Tour Guide
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <div className="text-center py-10 bg-gray-100 rounded-xl border border-gray-200">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#1E3D2F]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                  <p className="text-[#1E3D2F] font-semibold mb-1">
                    No bookings found
                  </p>
                  <p className="text-sm text-gray-500">
                    Your travel bookings will appear here
                  </p>
                </div>
              )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-[#1E3D2F] mb-4">
                    Confirm Account Deletion
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-8 animate-pulse">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#D9D9D9]"></div>
          </div>
          <div className="h-7 bg-[#D9D9D9] rounded w-3/4 mx-auto mb-6"></div>
          <div className="h-5 bg-[#D9D9D9] rounded w-full mb-6"></div>
          <div className="h-10 bg-[#D9D9D9] rounded w-full"></div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
