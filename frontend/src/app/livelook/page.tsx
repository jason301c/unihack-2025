"use client";

import { createContext, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectClothes from "@/components/livelook/select-clothes/SelectClothes";
import UploadPhoto from "@/components/livelook/UploadPhoto";
import Generated from "@/components/livelook/Generated";
import Loading from "@/components/livelook/Loading";

// Define the type for a clothing item
interface ClothingItem {
  id: string;
  imageUrl: string;
  position: { x: number; y: number };
  scale: number;
}

// Define the context type
interface LiveLookContextType {
  topClothing: ClothingItem | null;
  bottomClothing: ClothingItem | null;
  setTopClothing: (clothing: ClothingItem | null) => void;
  setBottomClothing: (clothing: ClothingItem | null) => void;
  uploadedPhoto: string | null;
  setUploadedPhoto: (photo: string | null) => void;
  isGenerating: boolean;
  generateImage: () => Promise<void>;
  generatedImage: string | null;
  setGeneratedImage: (image: string | null) => void;
}

// Create the context with a default value
const LiveLookContext = createContext<LiveLookContextType | undefined>(undefined);

// Custom hook for accessing the context
export const useLiveLook = () => {
  const context = useContext(LiveLookContext);
  if (!context) {
    throw new Error("useLiveLook must be used within a LiveLookProvider");
  }
  return context;
};

// The page itself
export default function LiveLook() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") || "0");

  // State that will be shared across components
  const [topClothing, setTopClothing] = useState<ClothingItem | null>(null);
  const [bottomClothing, setBottomClothing] = useState<ClothingItem | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Generate function
  const generateImage = async () => {
    if (!uploadedPhoto || (!topClothing && !bottomClothing)) {
      return;
    }

    setIsGenerating(true);
    goToStep(2);
    try {
      // TODO: Add actual API call here
      await new Promise(resolve => setTimeout(resolve, 5000)); // Simulated delay
      setGeneratedImage(uploadedPhoto); // This will be replaced with actual generated image
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
      goToStep(3);
    }
  };

  // Handle navigation between steps
  const goToStep = (newStep: number) => {
    router.push(`/livelook?step=${newStep}`);
  };

  const goBack = () => {
    if (step > 0) {
      goToStep(step - 1);
    } else {
      router.push("/home"); // Go to home if at first step
    }
  };

  const goToHome = () => {
    router.push("/");
  };

  // Context value
  const contextValue: LiveLookContextType = {
    topClothing,
    bottomClothing,
    setTopClothing,
    setBottomClothing,
    uploadedPhoto,
    setUploadedPhoto,
    isGenerating,
    generateImage,
    generatedImage,
    setGeneratedImage
  };

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <SelectClothes onBack={goBack} onNext={() => goToStep(1)} />;
      case 1:
        return <UploadPhoto onBack={goBack} onNext={() => goToStep(2)} />;
      case 2:
        return <Loading onBack={goBack} onNext={() => goToStep(3)}/>;
      case 3:
        return <Generated onBack={goToHome} onFinish={goToHome} />;
      default:
        return <SelectClothes onBack={goBack} onNext={() => goToStep(1)} />;
    }
  };

  return (
    <LiveLookContext.Provider value={contextValue}>
      {renderStep()}
    </LiveLookContext.Provider>
  );
}
