import React from 'react';

const UploadPhotoStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Upload a photo of your outfit</h2>
      
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
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            <line x1="16" x2="22" y1="5" y2="5" />
            <line x1="19" x2="19" y1="2" y2="8" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <p className="text-gray-600 mb-2">Drag and drop your photo here</p>
          <p className="text-gray-400 text-sm">or</p>
          <button 
            className="mt-4 px-4 py-2 bg-prim-darkest text-white rounded-md hover:bg-opacity-90 transition-all"
          >
            Browse files
          </button>
        </div>
      </div>
      
      <p className="text-center text-gray-500">
        This helps us analyze your style and provide better recommendations
      </p>
    </div>
  );
};

export default UploadPhotoStep;