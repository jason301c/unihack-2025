"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "@/components/wardrobe/ShakeAnimation.css";
import { X, Plus } from "lucide-react";


export type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type WardrobeGridProps = {
  items: ClothingItem[];
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
  isEditing: boolean; // Controls whether remove buttons are shown
};

export default function WardrobeGrid({
  items,
  onRemoveItem,
  onAddItem,
  isEditing,
}: WardrobeGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      {items.map((item: ClothingItem) => (
        <div key={item.id} className={`relative w-26 h-26 item-container ${isEditing ? "shake" : ""}`}>
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="rounded-md object-cover"
          />
          {isEditing && (
            <button
              onClick={() => onRemoveItem(item.id)}
              className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      ))}

      {/* Plus tile to add a new item */}
      <Button
        onClick={onAddItem}
        className="relative w-26 h-26 border-2 border-dashed border-gray-300 
                   rounded-lg flex items-center justify-center
                   text-white hover:border-white transition-colors"
      >
        <Plus className="w-10 h-10" />
      </Button>
    </div>
  );
}
