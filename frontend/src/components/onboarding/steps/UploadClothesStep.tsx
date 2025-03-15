import React from 'react';

const UploadClothesStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Upload your clothing items</h2>
      
      <div className="w-full max-w-md bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-8">
        <div className="flex flex-col items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-gray-400 mb-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <p className="text-gray-600 mb-2">Upload photos of your clothing items</p>
          <p className="text-gray-400 text-sm mb-4">You can add multiple items</p>
          <button 
            className="px-4 py-2 bg-prim-darkest text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Select Photos
          </button>
        </div>
      </div>
      
      <p className="text-center text-gray-500">
        We'll organize these items in your digital wardrobe
      </p>
    </div>
  );
};

export default UploadClothesStep;