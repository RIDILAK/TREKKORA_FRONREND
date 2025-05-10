import React from 'react';
import { Link } from 'react-router-dom';
import { useWishList } from '../../Context.jsx/WishListContext';
import ImageViewer from '../../../../Components/ImageViewer';

const WishList = () => {
  const { wishList } = useWishList();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-[#1E3D2F] py-8 px-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">
            My Wishlist
          </h1>
          <p className="text-[#D9D9D9] text-center mt-2">
            Your collection of dream destinations
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        {wishList?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {wishList.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/PlaceDetails/${item.placeId}`} className="block relative">
                  <div className="relative h-48 overflow-hidden">
                    <ImageViewer 
                      base64Data={item.imageUrl} 
                      alt={item.placeName}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-4">
                      <p className="text-white font-semibold text-lg">{item.placeName}</p>
                    </div>
                  </div>
                </Link>
                
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[#1E3D2F] font-bold text-lg">₹{item.price}</p>
                    <span className="bg-[#9AB3A5] text-white text-xs px-2 py-1 rounded-full">
                      Destination
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/PlaceDetails/${item.placeId}`}
                      className="text-[#1E3D2F] hover:text-[#9AB3A5] transition-colors duration-300 flex items-center"
                    >
                      <span>View Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    {/* <button className="text-[#BFBFBF] hover:text-red-500 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-[#9AB3A5] bg-opacity-10 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#9AB3A5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#1E3D2F] mb-3">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Discover amazing destinations and add them to your wishlist</p>
            <Link 
              to="/explore" 
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1E3D2F] text-white rounded-md hover:bg-opacity-90 transition-colors duration-300"
            >
              Start Exploring
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
      
      {/* Quick Tips Section */}
      {wishList?.length > 0 && (
        <div className="container mx-auto px-4 pb-12 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#9AB3A5] mt-8">
            <h3 className="text-lg font-semibold text-[#1E3D2F] mb-2">Travel Tips</h3>
            <p className="text-gray-600">
              Plan your journey ahead by exploring details about your wishlist destinations. 
              Click on any destination to learn more about experiences, accommodations, and local guides.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;