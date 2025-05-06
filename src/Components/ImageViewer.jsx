import React from 'react';
import { getImageSrcFromBase64 } from '../Utils/ImageHelper'; // adjust path

const ImageViewer = ({ base64Data, alt = "Image", className = "" }) => {
  if (!base64Data) {
    return <p className="text-sm text-gray-400">No image available</p>;
  }

  const src = getImageSrcFromBase64(base64Data);

  return (
    <img src={src} alt={alt} className={`rounded-lg ${className}`} />
  );
};

export default ImageViewer;
