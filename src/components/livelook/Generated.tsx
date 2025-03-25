"use client";
import { ArrowLeft } from "lucide-react";
import { useLiveLook } from "@/app/livelook/page";
import Loading from "@/components/livelook/Loading";
import Image from "next/image";

interface GeneratedProps {
  onBack?: () => void;
  onFinish?: () => void;
}

export default function Generated({ onBack, onFinish }: GeneratedProps) {
  const { generatedImage, isGenerating, saveLookToLocalStorage } =
    useLiveLook();

  if (isGenerating) {
    return <Loading />;
  }

  const handleSaveToLookbook = () => {
    // Use the saveLookToLocalStorage function from context
    saveLookToLocalStorage();
    if (onFinish) onFinish();
  };

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
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={generatedImage}
                alt="Generated outfit"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col p-4 bg-white">
        <button
          onClick={handleSaveToLookbook}
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
