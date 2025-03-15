"use client";
import React, { useState, useRef } from "react";
import UploadBox from "@/components/onboarding/steps/upload/UploadBox";
import {
  UploadFileIcon,
  CameraIcon,
} from "@/components/onboarding/steps/upload/UploadIcons";
import { ArrowLeft } from "lucide-react";

interface UploadPhotoProps {
  onBack: () => void;
  onNext: () => void;
}

export default function UploadPhoto({ onBack, onNext }: UploadPhotoProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFiles = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
    onNext();
  };

  const handleOpenCamera = () => {
    // Trigger the hidden camera input
    cameraInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <button className="w-full flex justify-start mb-12" onClick={onBack}>
        <ArrowLeft className="w-6 h-6" />
      </button>

      <h2 className="text-4xl font-semibold text-prim-darkest mb-6 mr-24">
        Upload a <span className="text-prim-dark">photo</span> of yourself to
        use Live Look.
      </h2>

      <p className="text-dark font-extralight leading-tight text-lg mb-12 mr-24">
        A clear, unobstructed shot of your whole body works best.
      </p>

      {selectedImage ? (
        <div className="mb-8">
          <img
            src={selectedImage}
            alt="User selfie"
            className="w-64 h-64 object-cover rounded-lg border-2"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="mt-2 text-prim-dark underline"
          >
            Remove image
          </button>
        </div>
      ) : (
        <>
          <UploadBox
            title="Upload Image"
            subtitle=""
            icon={<UploadFileIcon />}
            onSelectFiles={handleSelectFiles}
            buttonText="Upload Image"
          />

          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-lg text-prim-darkest">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            onClick={handleOpenCamera}
            className="flex items-center gap-2 px-4 py-4 bg-[#3E3A66] text-white rounded-md hover:bg-[#2E2A56] transition-all"
          >
            <CameraIcon className="text-white mb-0" />
            <span>Open Camera & Take Photo</span>
          </button>
        </>
      )}

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user" /* Use 'user' for front camera */
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
