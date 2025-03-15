"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {ArrowLeft } from "lucide-react";
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
  
  const [items, setItems] = useState<ClothingItem[]>([
    {
      id: "1",
      name: "Sample Shirt",
      imageUrl: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/444527/item/goods_00_444527_3x4.jpg?width=494",
    },
    {
      id: "2",
      name: "Sample Pants",
      imageUrl: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/444527/item/goods_00_444527_3x4.jpg?width=494",
    },
    {
      id: "3",
      name: "Sample Pants",
      imageUrl: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/444527/item/goods_00_444527_3x4.jpg?width=494",
    },
    {
      id: "4",
      name: "Sample Pants",
      imageUrl: "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/444527/item/goods_00_444527_3x4.jpg?width=494",
    },
  ]);


  // Refs for hidden file inputs
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -----------------------------
  //  ADD / REMOVE ITEM LOGIC
  // -----------------------------
  // Simple placeholder for adding a new item
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
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // In a real app, you might want to push the item to your state or upload it
      const newItem: ClothingItem = {
        id: Math.random().toString(36).substring(2),
        name: file.name,
        imageUrl,
      };
      setItems((prev) => [...prev, newItem]);
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

   // Trigger hidden input for "Upload from Camera Roll"
   const handleBrowseCatalogue = () => {
    router.push("/catalogue")
  };

  // -----------------------------
  //  RENDER
  // -----------------------------
  return (
    <main className="min-h-screen bg-black text-white px-8 py-6 flex flex-col">
      {/* Top bar */}
      {/* Left side: Back arrow + Title */}
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
        <Button variant="secondary" className="hover:bg-gray-200 rounded-3xl px-6" style={{background: COLORS.secondary}}onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Done" : "Edit"}
        </Button>
      </header>

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

      {isModalOpen &&
        <UploadModal
        onClose={() => setIsModalOpen(false)}
        onUploadFromRoll={handleUploadFromRoll}
        onTakePhoto={handleOpenCamera}
        onBrowseCatalogue={handleBrowseCatalogue}
      />
      }
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
