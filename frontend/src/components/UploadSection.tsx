"use client";

import React, { ChangeEvent, Ref } from "react";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import COLORS from "../../constants/colors";

type UploadSectionProps = {
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onTakePhoto: () => void;
  cameraInputRef: Ref<HTMLInputElement>;
};

export default function UploadSection({
  onImageUpload,
  onTakePhoto,
  cameraInputRef,
}: UploadSectionProps) {
  return (
    <div>
      <label 
        htmlFor="imageUpload"
        className="border-2 rounded-lg p-8 py-20 flex flex-col items-center justify-center cursor-pointer transition-colors"
        style={{borderColor: COLORS.secondary}}
      >
        <div className="flex items-center mb-2">
          <Image aria-label="upload image icon" size={24} 
          style={{color: COLORS.secondary}} />
          <span className="ml-2">Upload Image</span>
        </div>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={onImageUpload}
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
        onClick={onTakePhoto}
        className="w-full bg-zinc-800 text-white py-6 rounded-lg hover:bg-zinc-700"
      >
        Take Photo
      </Button>

      {/* Hidden file input for camera capture */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onImageUpload}
        className="hidden"
      />
    </div>
  );
}
