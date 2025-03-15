"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, PlusCircle } from "lucide-react";

export type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

type WardrobeGridProps = {
  items: ClothingItem[];
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
};

export default function WardrobeGrid({
  items,
  onRemoveItem,
  onAddItem,
}: WardrobeGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative w-28 h-28" // fixed square for consistent layout
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill // fill the parent w-32/h-32
            className="rounded-md object-cover"
          />
          <button
            onClick={() => onRemoveItem(item.id)}
            className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      ))}

      {/* Plus tile to add a new item */}
      <Button
        onClick={onAddItem}
        className="relative w-28 h-28 border-2 border-dashed border-gray-600 
                   rounded-lg flex items-center justify-center
                   text-white hover:border-gray-400 transition-colors"
      >
        <PlusCircle className="w-8 h-8" />
      </Button>
    </div>
  );
}
