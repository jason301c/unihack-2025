import React from 'react';

interface ClothingButtonProps {
  label: string;
}

const ClothingButton: React.FC<ClothingButtonProps> = ({ label }) => {
  return (
    <button className="bg-prim-darkest text-white rounded-lg p-4 w-full text-left text-lg hover:bg-prim-neutral hover:text-prim-darkest">
      {label}
    </button>
  );
};

const ClothingTypeStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <h1 className="text-4xl pr-12 text-prim-darkest font-medium mb-12 mt-6">What 
        <span className="text-prim-dark"> type</span> of <span className="text-prim-dark"> clothing </span> 
        would you like to explore?</h1>
      
      <div className="w-full text-left">
        <p className="text-xl font-semibold text-prim-darkest mb-4 mt-4">
          Choose your preferred style.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        <ClothingButton label="Masculine styles" />
        <ClothingButton label="Feminine styles" />
        <ClothingButton label="Unisex styles" />
        <ClothingButton label="Prefer not to say" />
      </div>
    </div>
  );
};

export default ClothingTypeStep;