"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import COLORS from "../../../constants/colors";
import ILLUSTRATIONS from "../../../constants/illustrations";

interface LoadingProps {
  onBack?: () => void;
}

export default function Loading({ onBack }: LoadingProps) {
  return (
    <div className="flex flex-col h-screen items-center justify-center relative bg-white text-black"
    style={{ backgroundColor: COLORS.background, color: COLORS.text }}>
      {/* Header with Back Button */}
      <header className="absolute top-0 left-0 p-4">
        <button className="text-white" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>
      
      {/* Centered Image and Loader */}
      <div className="flex flex-col items-center">
        {/* Weaving Text as an Image */}
        <Image src={ILLUSTRATIONS.pianoGirl} alt="Weaving" width={200} height={50} />
        <h1 className="text-2xl font-semibold pt-8">Weaving your perfect fit..</h1>
        {/* Spinning Loader */}
        <div className="mt-4 animate-spin rounded-full h-10 w-10 border-4 border-black-300 border-t-yellow-500"></div>
      </div>
    </div>
  );
}