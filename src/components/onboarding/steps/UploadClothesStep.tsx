"use client";
import React, { useState, useRef, useEffect } from "react";
import UploadBox from "./upload/UploadBox";
import { UploadFileIcon, CameraIcon } from "./upload/UploadIcons";

const UploadClothesStep: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem("onboardingUploadedImage");
    if (savedImage) {
      setSelectedImage(savedImage);
    }
  }, []);

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        // Save to localStorage
        try {
          localStorage.setItem("onboardingUploadedImage", base64String);
        } catch (error) {
          console.error("Error storing image in localStorage:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCamera = () => {
    cameraInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    localStorage.removeItem("onboardingUploadedImage");
  };

  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <h2 className="text-4xl font-semibold text-prim-darkest mb-6 mr-24">
        Upload <span className="text-prim-dark">photos</span> of your favourite{" "}
        <span className="text-prim-dark">clothes</span>
      </h2>
      <p className="text-dark font-extralight leading-tight text-lg mb-12 mr-24">
        Flat-laid clothing against a light background works best for our
        processing algorithm. Feel free to skip if you do not wish to upload a
        photo.
      </p>
      {selectedImage ? (
        <div className="mb-8">
          <img
            src={selectedImage}
            alt="Selected clothing"
            className="w-64 h-64 object-cover rounded-lg border-2 border-prim-darkest"
          />
          <button
            onClick={handleRemoveImage}
            className="mt-2 text-prim-dark underline"
          >
            Remove image
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md flex flex-col items-center">
          <UploadBox
            title=""
            subtitle=""
            icon={<UploadFileIcon />}
            onSelectFiles={handleSelectFiles}
            buttonText="Upload Image"
          />
          <div className="flex items-center my-6 w-full">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-lg text-prim-darkest">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <button
            onClick={handleOpenCamera}
            className="w-full max-w-md flex items-center justify-center gap-2 px-4 py-6 bg-[#2A2646] text-white rounded-lg hover:bg-[#1A1636] transition-all"
          >
            <CameraIcon className="text-white" />
            <span>Open Camera & Take Photo</span>
          </button>
        </div>
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
        capture="environment"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default UploadClothesStep;
