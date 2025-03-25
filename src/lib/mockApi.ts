// Mock API service for LiveLook feature
// This simulates backend interactions without actually using localStorage

// Type definitions
export interface ClothingItem {
  id: string;
  imageUrl: string;
  position: { x: number; y: number };
  scale: number;
}

export interface Look {
  id: string;
  name: string;
  image: string;
  itemsUsed: string[];
}

// Sample generated images to use for demo purposes
const sampleGeneratedImages = [
  "/demo/gen-1.webp",
  "/demo/gen-2.webp",
  "/demo/gen-3.webp",
  "/demo/gen-4.webp",
  "/demo/gen-5.webp",
];

// Mock in-memory storage (replaces localStorage)
let mockDatabase = {
  looks: [] as Look[],
  generatedImage: null as string | null,
};

/**
 * Mock API to upload a photo
 * @param photoData Base64 encoded photo data
 */
export const uploadUserPhoto = async (
  photoData: string
): Promise<{ success: boolean }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Always return success - no need to store the image
  return { success: true };
};

/**
 * Mock API to generate an outfit based on selected clothing and user photo
 * @param topClothing Selected top clothing item
 * @param bottomClothing Selected bottom clothing item
 */
export const generateOutfit = async (
  topClothing: ClothingItem | null,
  bottomClothing: ClothingItem | null
): Promise<{ image: string }> => {
  // Simulate API processing time (2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Select a demo image based on clothing selection to make it more realistic
  let selectedImage;

  // If no clothing selected, use last image as fallback
  if (!topClothing && !bottomClothing) {
    selectedImage = sampleGeneratedImages[sampleGeneratedImages.length - 1];
  } else {
    // Select image based on which clothing items were chosen
    const index = Math.max(
      0,
      (topClothing ? 1 : 0) + (bottomClothing ? 2 : 0) - 1
    );
    selectedImage =
      sampleGeneratedImages[index >= sampleGeneratedImages.length ? 0 : index];
  }

  // Store in mock database
  mockDatabase.generatedImage = selectedImage;

  return { image: selectedImage };
};

/**
 * Mock API to save a look to the lookbook
 * @param look The look object to save
 */
export const saveLook = async (lookDetails: {
  image: string;
  topClothingUrl?: string;
  bottomClothingUrl?: string;
}): Promise<{ success: boolean; redirectUrl: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  try {
    const newLook: Look = {
      id: Date.now().toString(),
      name: `Look ${mockDatabase.looks.length + 1}`,
      image: lookDetails.image,
      itemsUsed: [
        lookDetails.topClothingUrl || "",
        lookDetails.bottomClothingUrl || "",
      ].filter(Boolean),
    };

    // Add to mock database
    mockDatabase.looks.push(newLook);

    return {
      success: true,
      redirectUrl: "/lookbook",
    };
  } catch (error) {
    console.error("Error in mock API saveLook:", error);
    return {
      success: false,
      redirectUrl: "/livelook",
    };
  }
};

/**
 * Mock API to get all saved looks
 */
export const getLooks = async (): Promise<Look[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [...mockDatabase.looks];
};
