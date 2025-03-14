"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { X, PlusCircle, Camera } from "lucide-react";

type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function Wardrobe() {
  // Store the user’s wardrobe items
  const [items, setItems] = useState<ClothingItem[]>([]);

  // Refs for hidden file inputs
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -----------------------------
  //  ADD / REMOVE ITEM LOGIC
  // -----------------------------
  // Simple placeholder for adding a new item
  const handleAddItem = () => {
    const newItem: ClothingItem = {
      id: Math.random().toString(36).substring(2),
      name: "Green Jacket",
      // Placeholder image
      imageUrl: "https://via.placeholder.com/150/5c5c5c/FFFFFF?text=Jacket",
    };
    setItems((prev) => [...prev, newItem]);
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

  // -----------------------------
  //  RENDER
  // -----------------------------
  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Wardrobe</h2>
        <Button variant="secondary" className="hover:bg-gray-200 rounded-3xl">
          Edit
        </Button>
      </header>

      {/* Check if wardrobe is empty or not */}
      {items.length === 0 ? (
        // -----------------------------------
        // EMPTY STATE
        // -----------------------------------
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-2">My Wardrobe</h1>
          <p className="text-gray-400 max-w-xs mb-8">
            Oops... No items found. Please choose one of the options below to add items.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 w-full max-w-sm">
            <Button
              variant="secondary"
              className="w-full rounded-3xl"
              onClick={handleUploadFromRoll}
            >
              Upload from Camera Roll
            </Button>
            <Button
              className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-3xl"
              onClick={handleOpenCamera}
            >
              Take Photo
            </Button>
            <Button
              className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-3xl"
            >
              Browse Catalogue
            </Button>
          </div>
        </div>
      ) : (
        // -----------------------------------
        // POPULATED WARDROBE
        // -----------------------------------
        <>
          {/* Title */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold">My Wardrobe</h1>
            <p className="text-gray-400">You have {items.length} item(s) in your wardrobe.</p>
          </div>

          {/* Grid of items */}
          <div className="flex-grow">
            <div className="grid grid-cols-3 gap-4">
              {items.map((item) => (
                <div key={item.id} className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-auto object-cover rounded-md"
                  />
                  {/* Remove button (X) in top-right corner */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ))}

              {/* Plus tile to add a placeholder item */}
              <Button
                onClick={handleAddItem}
                className="border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-4 text-white hover:border-gray-400 transition-colors"
              >
                <PlusCircle className="w-6 h-6 mb-1" />
                <span>Add Item</span>
              </Button>
            </div>
          </div>

          {/* Bottom action buttons */}
          <div className="mt-6 space-y-3 w-full max-w-sm">
            <Button
              variant="secondary"
              className="w-full bg-gray-800 hover:bg-gray-700"
              onClick={handleUploadFromRoll}
            >
              Upload from Camera Roll
            </Button>
            <Button
              variant="secondary"
              className="w-full bg-gray-800 hover:bg-gray-700"
              onClick={handleOpenCamera}
            >
              Open Camera &amp; Take Photo
            </Button>
            <Button
              variant="secondary"
              className="w-full bg-gray-800 hover:bg-gray-700"
            >
              Browse Catalogue
            </Button>
          </div>
        </>
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
