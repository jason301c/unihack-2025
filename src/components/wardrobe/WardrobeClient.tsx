"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import EmptyWardrobe from "@/components/wardrobe/EmptyWardrobe";
import WardrobeGrid from "@/components/wardrobe/WardrobeGrid";
import UploadModal from "@/components/wardrobe/UploadModal";

export type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type WardrobeClientProps = {
  initialItems?: ClothingItem[];
};

export function WardrobeClient({ initialItems = [] }: WardrobeClientProps) {
  const router = useRouter();
  const [items, setItems] = useState<ClothingItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for hidden file inputs
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load items from localStorage on component mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem("wardrobeItems");
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      }
    } catch (err) {
      console.error("Error loading wardrobe items from localStorage:", err);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("wardrobeItems", JSON.stringify(items));
    } catch (err) {
      console.error("Error saving wardrobe items to localStorage:", err);
    }
  }, [items]);

  // Add item logic (triggered when uploading a new image)
  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  // Remove an item by ID
  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // -----------------------------
  //  PHOTO / FILE UPLOAD LOGIC
  // -----------------------------
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        setError(null);

        // Use FileReader to convert file to data URL
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result as string;

          // Create a new clothing item with the data URL
          const newItem: ClothingItem = {
            id: Math.random().toString(36).substring(2),
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension from name
            imageUrl: base64String,
          };

          setItems((prev) => [...prev, newItem]);
          setLoading(false);
        };

        reader.onerror = () => {
          setError("Failed to read file. Please try again.");
          setLoading(false);
        };

        reader.readAsDataURL(file);
      } catch (err) {
        console.error("Error processing file:", err);
        setError("Failed to process image. Please try again.");
        setLoading(false);
      }
    }
  };

  // Trigger hidden input for "Open Camera & Take Photo"
  const handleOpenCamera = () => {
    cameraInputRef.current?.click();
  };

  // Trigger hidden input for "Upload from Camera Roll"
  const handleUploadFromRoll = () => {
    fileInputRef.current?.click();
  };

  // Trigger hidden input for "Browse Catalogue"
  const handleBrowseCatalogue = () => {
    router.push("/catalogue");
  };

  return (
    <>
      {/* Loading or Error States */}
      {loading && <p className="text-center">Processing upload...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Check if wardrobe is empty or not */}
      {items.length === 0 ? (
        <EmptyWardrobe
          onUploadFromRoll={handleUploadFromRoll}
          onTakePhoto={handleOpenCamera}
          onBrowseCatalogue={handleBrowseCatalogue}
        />
      ) : (
        <WardrobeGrid
          items={items}
          onRemoveItem={handleRemoveItem}
          onAddItem={handleAddItem}
        />
      )}

      {isModalOpen && (
        <UploadModal
          onClose={() => setIsModalOpen(false)}
          onUploadFromRoll={handleUploadFromRoll}
          onTakePhoto={handleOpenCamera}
        />
      )}

      {/* Hidden inputs for camera & file upload */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}
