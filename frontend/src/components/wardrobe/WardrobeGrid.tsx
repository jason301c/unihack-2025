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
      {/* Modified header layout to match LookBook page */}
      <div className="mb-6">
        <BackButton />
        <div className= "flex items-center justify-between p-2">
          <h1 className="text-3xl font-semibold text-prim-darkest">
            My Wardrobe
          </h1>
          <Button
            variant="secondary"
            className="hover:bg-prim-dark text-white rounded-3xl px-6 bg-prim-darkest"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Done" : "Edit"}
          </Button>
        </div>
      </div>
      
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

      {/* Updated Catalogue button at the bottom */}
      <div className="mt-6 w-full fixed bottom-6 left-0 right-0 px-6">
        <Button
          onClick={() => setIsSearchOpen(true)}
          className="w-full rounded-full py-6 flex items-center justify-center gap-2 bg-prim-darkest hover:bg-prim-dark text-white text-lg font-medium"
        >
          Catalogue
        </Button>
      </div>

      {/* SearchSheet component */}
      <SearchSheet isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  );
}
