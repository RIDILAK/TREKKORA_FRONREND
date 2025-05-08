import React from 'react';
import { Link } from 'react-router-dom';
import { useWishList } from '../../Context.jsx/WishListContext';
import ImageViewer from '../../../../Components/ImageViewer';

const WishList = () => {
  const { wishList } = useWishList();
   console.log(wishList,"gh");
   
  return (
    <div className="min-h-screen flex flex-col bg-fourth">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-primary text-center mb-6">
          Your Wishlist
        </h1>

        {wishList?.length > 0 ? (
          <ul className="space-y-4">
            {wishList.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-third shadow-md p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Link to={`/PlaceDetails/${item.placeId}`}>
                    
                       <ImageViewer base64Data={item.imageUrl } alt={item.placeName}
                      className="w-16 h-16 object-cover rounded-md cursor-pointer"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/PlaceDetails/${item.placeId}`}
                      className="text-lg font-semibold text-primary hover:underline"
                    >
                      {item.placeName}
                    </Link>
                    <p className="text-secondary font-medium">${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-secondary text-lg mt-8">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishList;
