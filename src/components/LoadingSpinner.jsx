import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white text-xl font-semibold">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid mr-4"></div>
      Loading...
    </div>
  );
};

export default LoadingSpinner;
