"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "@/components/wardrobe/ShakeAnimation.css";
import { X, Plus, Search } from "lucide-react";
import BackButton from "./BackButton";
import SearchSheet from "./search-clothes/SearchSheet";

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
  const [isEditing, setIsEditing] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between mb-6 w-full">
        <div className="flex items-center">
          <BackButton />
          <div className="text-lg font-semibold text-black ml-2">
            My Wardrobe
          </div>
        </div>
        <Button
          variant="secondary"
          className="hover:bg-prim-dark text-white rounded-3xl px-6 bg-prim-darkest"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Done" : "Edit"}
        </Button>
      </header>

      <div className="grid grid-cols-3 gap-4 justify-items-center flex-grow">
        {items.map((item: ClothingItem) => (
          <div
            key={item.id}
            className={`relative w-26 h-26 item-container ${isEditing ? "shake" : ""}`}
          >
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
          className="relative w-26 h-26 border-2 border-dashed border-black 
                    rounded-lg flex items-center justify-center
                    text-black hover:border-zinc-800 transition-colors bg-white hover:bg-gray-100"
        >
          <Plus className="w-10 h-10" />
        </Button>
      </div>

      {/* Search button at the bottom */}
      <div className="mt-6 w-full flex justify-center">
        <Button
          onClick={() => setIsSearchOpen(true)}
          className="rounded-full px-8 py-2 flex items-center gap-2 bg-prim-darkest hover:bg-prim-dark text-white"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </Button>
      </div>

      {/* SearchSheet component */}
      <SearchSheet isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  );
}
