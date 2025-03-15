import React from 'react';

const ChooseItemsStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Choose items you like</h2>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {/* Sample clothing items - these would typically come from an API or state */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index}
            className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-prim-darkest cursor-pointer transition-all"
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">Item {index + 1}</span>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-gray-500 mt-6">
        Tap on the items that match your style preferences
      </p>
    </div>
  );
};

export default ChooseItemsStep;