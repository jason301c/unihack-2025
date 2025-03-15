"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface UploadPhotoProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function UploadPhoto({ onBack, onNext }: UploadPhotoProps) {
  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Header with Back Button & Title */}
      <header className="flex items-center p-4 border-b">
        <button className="text-black" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto">Upload Your Photo</h1>
      </header>
      
      {/* Centered Portrait (Takes Up Most Space) */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-86 h-115 border-2 border-gray-300 rounded-md flex items-center justify-center">
          <Image 
            src="/images/portrait-placeholder.png" 
            alt="Portrait" 
            width={120} 
            height={160} 
            className="w-full h-full object-fill object-top"
          />
        </div>
      </div>
      
      {/* Input and Buttons at Bottom */}
      <div className="p-4 w-full max-w-md mx-auto">
        {/* Upload Button */}
        <button className="w-full p-3 bg-prim-darkest text-white rounded-md shadow-md hover:opacity-90 transition mb-3">
          Upload Photo
        </button>
        
        {/* Next Button */}
        <button 
          onClick={onNext}
          className="w-full p-3 bg-prim-dark text-white rounded-md shadow-md hover:opacity-90 transition mb-3"
        >
          Next
        </button>
        
        {/* Cancel Button */}
        <button 
          onClick={onBack}
          className="w-full p-3 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}