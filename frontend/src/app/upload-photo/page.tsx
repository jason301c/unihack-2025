'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Image } from 'lucide-react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // This function triggers the hidden camera input
  const handleTakePhoto = () => {
    cameraInputRef.current?.click();
  };

  return (
    <main className="min-h-screen bg-black text-white px-10 py-4 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <Button variant="ghost" size="icon" className="mb-4">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-3xl font-bold mb-10">
          Upload photos of your favourite clothes
        </h1>
        <h3 className="text-xl mb-4 font-thin">
          Mix and match clothes to create billions of different combinations.
        </h3>
      </div>

      {/* Middle (Upload Area) */}
      <div>
        <label 
          htmlFor="imageUpload"
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 py-20 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center mb-2">
            <Image aria-label="upload image icon" size={24} />
            <span className="ml-2">Upload Image</span>
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <div className="text-center my-12 flex items-center justify-center w-full">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <Button 
          variant="secondary"
          onClick={handleTakePhoto}
          className="w-full bg-gray-800 text-white py-6 rounded-lg hover:bg-gray-700"
        >
          Take Photo
        </Button>

        {/* Hidden file input for camera capture */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Bottom Navigation Bar */}
      <div className="mt-6 mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>
        <Button 
          variant="default"
          className="bg-white text-black hover:bg-gray-200"
        >
          Next
        </Button>
      </div>
    </main>
  );
}
