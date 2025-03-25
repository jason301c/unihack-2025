"use client";
import { createContext, useContext, useState, useEffect } from "react";
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
  saveLookToLocalStorage: () => void;
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

// Sample generated images to cycle through
const sampleGeneratedImages = [
  "/demo/gen-1.webp",
  "/demo/gen-2.webp",
  "/demo/gen-3.webp",
  "/demo/gen-4.webp",
  "/demo/gen-5.webp",
];

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

  // Load any saved state from localStorage on component mount
  useEffect(() => {
    try {
      const savedTopClothing = localStorage.getItem("liveLookTopClothing");
      const savedBottomClothing = localStorage.getItem(
        "liveLookBottomClothing"
      );
      const savedPhoto = localStorage.getItem("uploadedUserPhoto");

      if (savedTopClothing) setTopClothing(JSON.parse(savedTopClothing));
      if (savedBottomClothing)
        setBottomClothing(JSON.parse(savedBottomClothing));
      if (savedPhoto) setUploadedPhoto(savedPhoto);
    } catch (err) {
      console.error("Error loading saved LiveLook state:", err);
    }
  }, []);

  // Save clothing selections to localStorage when they change
  useEffect(() => {
    if (topClothing) {
      localStorage.setItem("liveLookTopClothing", JSON.stringify(topClothing));
    }
    if (bottomClothing) {
      localStorage.setItem(
        "liveLookBottomClothing",
        JSON.stringify(bottomClothing)
      );
    }
  }, [topClothing, bottomClothing]);

  // Client-side image generation function (uses demo images)
  const generateImage = async () => {
    return new Promise<void>((resolve) => {
      setIsGenerating(true);

      setTimeout(() => {
        // Select a demo image based on clothing selection to make it more realistic
        let selectedImage;

        // If no clothing selected, use last image as fallback
        if (!topClothing && !bottomClothing) {
          selectedImage =
            sampleGeneratedImages[sampleGeneratedImages.length - 1];
        } else {
          // Select image based on which clothing items were chosen
          const index = (topClothing ? 1 : 0) + (bottomClothing ? 2 : 0) - 1;
          selectedImage = sampleGeneratedImages[index];
        }

        setGeneratedImage(selectedImage);
        setIsGenerating(false);
        resolve();
      }, 2000); // Simulate a 2-second delay for image generation
    });
  };

  // Save the generated look to localStorage for the LookBook
  const saveLookToLocalStorage = () => {
    if (!generatedImage) return;

    try {
      // Get existing looks from localStorage
      const savedLooksJSON = localStorage.getItem("lookbookLooks");
      const savedLooks = savedLooksJSON ? JSON.parse(savedLooksJSON) : [];

      // Create a new look
      const newLook = {
        id: Date.now().toString(),
        name: `Look ${savedLooks.length + 1}`,
        image: generatedImage,
        itemsUsed: [
          topClothing?.imageUrl || "",
          bottomClothing?.imageUrl || "",
        ].filter(Boolean),
      };

      // Add to saved looks and store back
      savedLooks.push(newLook);
      localStorage.setItem("lookbookLooks", JSON.stringify(savedLooks));

      // Provide feedback or navigate as needed
      router.push("/lookbook");
    } catch (error) {
      console.error("Error saving look to localStorage:", error);
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
    setGeneratedImage,
    saveLookToLocalStorage,
  };

  // Render the appropriate component based on the current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <SelectClothes onBack={goBack} onNext={() => goToStep(1)} />;
      case 1:
        return <UploadPhoto onBack={goBack} onNext={() => goToStep(2)} />;
      case 2:
        return <Loading onBack={goBack} onNext={() => goToStep(3)} />;
      case 3:
        return (
          <Generated onBack={goToHome} onFinish={saveLookToLocalStorage} />
        );
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
