"use client";
import { createContext, useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SelectClothes from "@/components/livelook/select-clothes/SelectClothes";
import UploadPhoto from "@/components/livelook/UploadPhoto";
import Generated from "@/components/livelook/Generated";
import Loading from "@/components/livelook/Loading";
import { uploadUserPhoto, generateOutfit, saveLook } from "@/lib/mockApi";

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
  saveLookToLookbook: () => void;
}

// Create the context with a default value
const LiveLookContext = createContext<LiveLookContextType | undefined>(
  undefined
);

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
  const [bottomClothing, setBottomClothing] = useState<ClothingItem | null>(
    null
  );
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Use API to generate image when requested
  const generateImage = async () => {
    if (!uploadedPhoto) return;

    // First store the user photo (not actually stored in our mock API)
    try {
      setIsGenerating(true);
      goToStep(2); // Navigate to loading screen

      // Upload photo first (this is just a mock, no actual storage happens)
      await uploadUserPhoto(uploadedPhoto);

      // Then generate the outfit
      const result = await generateOutfit(topClothing, bottomClothing);

      // Set the generated image and go to results screen
      setGeneratedImage(result.image);
      setIsGenerating(false);
      goToStep(3); // Go to generated image screen
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGenerating(false);
      // Stay on the current step if there was an error
    }
  };

  // Save the generated look to lookbook via API
  const saveLookToLookbook = async () => {
    if (!generatedImage) return;

    try {
      const result = await saveLook({
        image: generatedImage,
        topClothingUrl: topClothing?.imageUrl,
        bottomClothingUrl: bottomClothing?.imageUrl,
      });

      if (result.success) {
        router.push(result.redirectUrl);
      }
    } catch (error) {
      console.error("Error saving look to lookbook:", error);
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

  const goLivelook = () => {
    router.push("/livelook");
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
    setGeneratedImage,
    saveLookToLookbook,
  };

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <SelectClothes onBack={goBack} onNext={() => goToStep(1)} />;
      case 1:
        return <UploadPhoto onBack={goBack} onNext={() => goToStep(2)} />;
      case 2:
        return <Loading onBack={goBack} />;
      case 3:
        return <Generated onBack={goLivelook} onFinish={saveLookToLookbook} />;
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
