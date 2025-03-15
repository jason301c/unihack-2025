'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import UploadSection from "@/components/UploadSection";

export default function UploadClothes() {
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
        Flat lay images of clothing against a clean background work best. Feel free to skip if you do not wish to upload a photo.
        </h3>
      </div>

      <UploadSection
        onImageUpload={handleImageUpload}
        onTakePhoto={handleTakePhoto}
        cameraInputRef={cameraInputRef}
      />

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
