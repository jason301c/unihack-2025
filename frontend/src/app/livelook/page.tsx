"use client";

import { createContext, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectClothes from "@/components/livelook/select-clothes/SelectClothes";
import UploadPhoto from "@/components/livelook/UploadPhoto";
import Generated from "@/components/livelook/Generated";

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
    setUploadedPhoto
  };

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <SelectClothes onBack={goBack} onNext={() => goToStep(1)} />;
      case 1:
        return <UploadPhoto onBack={goBack} onNext={() => goToStep(2)} />;
      case 2:
        return <Generated onBack={goBack} onFinish={goToHome} />;
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
