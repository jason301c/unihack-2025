import React from 'react';

const ClothingTypeStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">What type of clothing are you looking for?</h2>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:border-prim-darkest cursor-pointer transition-all">
          <div className="w-16 h-16 bg-gray-100 rounded-full mb-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Top</span>
          </div>
          <p className="font-medium">Tops</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:border-prim-darkest cursor-pointer transition-all">
          <div className="w-16 h-16 bg-gray-100 rounded-full mb-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Bottom</span>
          </div>
          <p className="font-medium">Bottoms</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:border-prim-darkest cursor-pointer transition-all">
          <div className="w-16 h-16 bg-gray-100 rounded-full mb-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Dress</span>
          </div>
          <p className="font-medium">Dresses</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:border-prim-darkest cursor-pointer transition-all">
          <div className="w-16 h-16 bg-gray-100 rounded-full mb-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Accessory</span>
          </div>
          <p className="font-medium">Accessories</p>
        </div>
      </div>
      
      <p className="text-center text-gray-500 mt-6">
        Select one or more types to help us personalize your experience
      </p>
    </div>
  );
};

export default ClothingTypeStep;