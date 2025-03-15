"use client";
import React from "react";
import UploadBox from "./upload/UploadBox";
import { UploadFileIcon, CameraIcon } from "./upload/UploadIcons";

const UploadClothesStep: React.FC = () => {
  const handleSelectFiles = () => {
    // Implement file selection logic here
    console.log("Select files clicked");
  };

  const handleOpenCamera = () => {
    // Implement camera opening logic here
    console.log("Open camera clicked");
  };

  return (
    <div className="flex flex-col items-center h-[70vh] px-6 py-8">
      <h2 className="text-4xl font-semibold text-prim-darkest mb-6 mr-24">
        Upload <span className="text-prim-dark">photos</span> of your favourite{" "}
        <span className="text-prim-dark">clothes</span>
      </h2>

      <p className="text-dark font-extralight leading-tight text-lg mb-12 mr-24">
        Flat-laid clothing against a light background works best for our processing algorithm.
        Feel free to skip if you do not wish to upload a photo. 
      </p>

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
    </div>
  );
};

export default UploadClothesStep;
