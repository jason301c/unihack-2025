"use client";

import React, { useState, useRef, ChangeEvent } from "react";
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
      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "src-img-unihack")

      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

        // Send file to backend for upload to S3
        const res = await fetch(`${apiUrl}/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to upload image");

        // Assuming the server responds with the URL of the uploaded image
        const data = await res.json();
        const newItem: ClothingItem = {
          id: Math.random().toString(36).substring(2),
          name: file.name,
          imageUrl: data.url, // Assuming the response contains the URL
        };
        setItems((prev) => [...prev, newItem]);
      } catch (err) {
        console.error("Error uploading file:", err);
        setError("Failed to upload image. Please try again.");
      } finally {
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
