"use client";

import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useLiveLook } from "@/app/livelook/page";
import Loading from "@/components/livelook/Loading";

interface GeneratedProps {
  onBack?: () => void;
  onFinish?: () => void;
}

export default function Generated({ onBack, onFinish }: GeneratedProps) {
  const { selectedClothes, uploadedPhoto } = useLiveLook();
  const [isLoading, setIsLoading] = useState(true);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Simulate API call to generate the image
  useEffect(() => {
    if (!uploadedPhoto || selectedClothes.length === 0) {
      // If no photo uploaded or no clothes selected, go back
      onBack?.();
      return;
    }

    const timer = setTimeout(() => {
      // This would be replaced with actual API call to AI image service
      // For now, just use the uploaded photo as a placeholder
      setGeneratedImage(uploadedPhoto);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [uploadedPhoto, selectedClothes, onBack]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between py-10 px-4 bg-white">
        <button className="text-prim-darkest" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-prim-darkest">Your Live Look</h1>
        <div className="w-6" /> {/* Empty div for balance */}
      </header>

      {/* Generated Image */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 bg-gray-100">
        <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md">
          {generatedImage && (
            <img
              src={generatedImage}
              alt="Generated outfit"
              className="w-full h-auto rounded-lg"
            />
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col p-4 bg-white">
        <button
          onClick={onFinish}
          className="bg-prim-darkest text-white py-3 rounded-xl mb-2"
        >
          Save to Lookbook
        </button>
        <button
          onClick={onBack}
          className="border border-prim-darkest text-prim-darkest py-3 rounded-xl"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
