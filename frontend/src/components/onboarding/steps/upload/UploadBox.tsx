/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from 'react';

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
  buttonText = "Browse files"
}) => {
  return (
    <div className="w-full max-w-md bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <div className="flex flex-col items-center">
        {icon}
        <p className="text-gray-600 mb-2">{title}</p>
        {subtitle && <p className="text-gray-400 text-sm mb-4">{subtitle}</p>}
        <button 
          onClick={onSelectFiles}
          className="mt-4 px-4 py-2 bg-prim-darkest text-white rounded-md hover:bg-opacity-90 transition-all"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default UploadBox;