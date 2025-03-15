/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";

interface UploadBoxProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onSelectFiles: () => void;
  onOpenCamera?: () => void;
  buttonText?: string;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  title,
  subtitle,
  icon,
  onSelectFiles,
  onOpenCamera,
  buttonText = "Browse files",
}) => {
  return (
    <div className="w-full max-w-md bg-[#3E3A66] border-2 border-dashed border-[#5E5A86] rounded-lg p-6 text-center">
      <div className="flex flex-col items-center">
        {icon}
        <p className="text-white mb-1">{title}</p>
        {subtitle && <p className="text-white text-sm mb-2">{subtitle}</p>}
        <button
          onClick={onSelectFiles}
          className="mt-2 px-4 py-2 bg-white text-[#3E3A66] rounded-md hover:bg-gray-100 transition-all"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default UploadBox;
