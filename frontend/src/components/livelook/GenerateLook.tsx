"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface GenerateLookProps {
  onBack?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function GenerateLook({ onBack, onSave, onCancel }: GenerateLookProps) {
  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Header with Back Button & Title */}
      <header className="flex items-center p-4 border-b">
        <button className="text-black" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto">Your Live Look</h1>
      </header>
      
      {/* Centered Portrait (Takes Up Most Space) */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-86 h-115 border-2 border-gray-300 rounded-md flex items-center justify-center">
          <Image 
            src="/images/portrait-placeholder.png" 
            alt="Portrait" 
            width={120} 
            height={160} 
          />
        </div>
      </div>
      
      {/* Input and Buttons at Bottom */}
      <div className="p-4 w-full max-w-md mx-auto">
        {/* Text Input */}
        <input
          type="text"
          placeholder="Describe your outfit..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
        />
        
        {/* Stacked Buttons */}
        <button 
          onClick={onSave}
          className="w-full p-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition mb-3"
        >
          Save Look
        </button>
        
        <button 
          onClick={onCancel}
          className="w-full p-3 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}