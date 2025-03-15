"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import EmptyWardrobe from "@/components/wardrobe/EmptyWardrobe";
import WardrobeGrid from "@/components/wardrobe/WardrobeGrid";
import UploadModal from "@/components/wardrobe/UploadModal";
import COLORS from "../../../constants/colors";

type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function Wardrobe() {
  const router = useRouter();

  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for hidden file inputs
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

        const res = await fetch(`${apiUrl}/api/images`);
        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        setItems(
          data.map((img: { url: string }, index: number) => ({
            id: index.toString(),
            name: `Item ${index + 1}`,
            imageUrl: img.url,
          }))
        );
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Could not load wardrobe items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

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
    <main className="min-h-screen bg-black text-white px-8 py-6 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => router.back()} // or any other navigation
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">My Wardrobe</h2>
        <Button
          variant="secondary"
          className="hover:bg-gray-200 rounded-3xl px-6"
          style={{ background: COLORS.secondary }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Done" : "Edit"}
        </Button>
      </header>

      {/* Loading or Error States */}
      {loading && <p className="text-center">Loading wardrobe...</p>}
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
          isEditing={isEditing}
        />
      )}

      {isModalOpen && (
        <UploadModal
          onClose={() => setIsModalOpen(false)}
          onUploadFromRoll={handleUploadFromRoll}
          onTakePhoto={handleOpenCamera}
          onBrowseCatalogue={handleBrowseCatalogue}
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
    </main>
  );
}
