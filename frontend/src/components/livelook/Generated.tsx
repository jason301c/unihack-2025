"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import ILLUSTRATIONS from "../../../constants/illustrations";

interface GeneratedProps {
  onBack?: () => void;
  onFinish?: () => void;
}

export default function Generated({ onBack, onFinish }: GeneratedProps) {
  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Header with Back Button & Title */}
      <header className="flex items-center p-4 border-b">
        <button className="text-black" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold mx-auto">Your Live Look</h1>
      </header>

      {/* Centered Generated Image */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-86 h-115 border-2 border-gray-300 rounded-md flex items-center justify-center">
          <Image
            src={ILLUSTRATIONS.pianoGirl}
            alt="Generated Look"
            width={300}
            height={400}
            className="w-full h-full obje   ct-contain"
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

        {/* Save Button */}
        <button
          onClick={onFinish}
          className="w-full p-3 bg-prim-darkest text-white rounded-md shadow-md hover:opacity-90 transition mb-3"
        >
          Save Look
        </button>

        {/* Try Again Button */}
        <button
          onClick={onBack}
          className="w-full p-3 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
