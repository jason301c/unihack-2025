/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useRef } from "react";
import UploadBox from "@/components/onboarding/steps/upload/UploadBox";
import {
  UploadFileIcon,
  CameraIcon,
} from "@/components/onboarding/steps/upload/UploadIcons";
import { ArrowLeft } from "lucide-react";
import { useLiveLook } from "@/app/livelook/page";
import Image from "next/image";

interface UploadPhotoProps {
  onBack: () => void;
  onNext: () => void;
}

export default function UploadPhoto({ onBack, onNext }: UploadPhotoProps) {
  const {  topClothing, bottomClothing, uploadedPhoto, setUploadedPhoto, generateImage, isGenerating } = useLiveLook();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFiles = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const bucketName = "dest-img-unihack";
  
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucketName);
  
    try {
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }
  
      const data = await res.json();
      setUploadedPhoto(data.url); // Set uploaded image URL from S3
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  

  const handleOpenCamera = () => {
    // Trigger the hidden camera input
    cameraInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setUploadedPhoto(null);
  };

  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <button className="w-full flex justify-start mb-6" onClick={onBack}>
        <ArrowLeft className="w-6 h-6" />
      </button>

      {!topClothing && !bottomClothing && (
        <h2 className="text-xl font-bold bg-red-200 w-full text-center py-4 mb-6">
          Warning: No clothing items selected.
        </h2>
      )}

      <h2 className="text-4xl font-semibold text-prim-darkest mb-6 mr-24">
        Upload a <span className="text-prim-dark">photo</span> of yourself to
        use Live Look.
      </h2>

      <p className="text-dark font-extralight leading-tight text-lg mb-12 mr-24">
        A clear, unobstructed shot of your whole body works best.
      </p>

      {uploadedPhoto ? (
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <div className="relative w-64 h-64">
              <Image
                src={uploadedPhoto}
                alt="User selfie"
                fill
                className="object-cover rounded-lg border-2"
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className="mt-2 text-prim-dark underline"
            >
              Remove image
            </button>
          </div>
          <button
            onClick={generateImage}
            disabled={isGenerating}
            className="px-8 py-4 bg-[#3E3A66] text-white rounded-md hover:bg-[#2E2A56] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
      ) : (
        <>
          <UploadBox
            title=""
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
