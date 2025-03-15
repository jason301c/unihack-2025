"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowDown } from "lucide-react";

export type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

interface WardrobeProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectItem: (item: { id: string; imageUrl: string; type: "tops" | "bottoms" }) => void;
  selectionType: "tops" | "bottoms"; // Force selection type based on what's missing
}

export default function Wardrobe({ isOpen, onOpenChange, onSelectItem, selectionType }: WardrobeProps) {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch wardrobe items on component mount
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

      try {
        const res = await fetch(`${apiUrl}/api/images`);
        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        setItems(
          data.map((img: { url: string }, index: number) => ({
            id: index.toString(),
            name: `Item ${index + 1}`,
            imageUrl: img.url,
          })),
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

  const handleItemClick = (item: ClothingItem) => {
    onSelectItem({
      id: item.id,
      imageUrl: item.imageUrl,
      type: selectionType,
    });
    onOpenChange(false);
  };

  return (
    <div className="bg-prim-darkest">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[60vh] rounded-t-[16px] px-0 bg-prim-darkest motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95"
        >
          {/* Sheet Header and Close Button */}
          <SheetHeader className="flex justify-between items-center px-4 pt-6 sticky top-0 z-10 bg-prim-darkest">
            <div className="flex justify-between items-center w-full px-2">
              <SheetTitle className="text-xl font-semibold text-prim-light">
                Select {selectionType === "tops" ? "Top" : "Bottom"}
              </SheetTitle>
              <button 
                onClick={() => onOpenChange(false)}
                className="transform transition-transform duration-200 hover:scale-110"
              >
                <ArrowDown className="w-6 h-6 text-prim-light" />
              </button>
            </div>
          </SheetHeader>

          {/* Wardrobe Content */}
          <div className="flex flex-col h-full relative">
            {/* Scrollable Grid Container */}
            <div className="flex-1 overflow-y-auto pb-24">
              <div className="grid grid-cols-3 gap-6 justify-items-center mt-6 py-4 w-full px-4">
                {loading && <p className="text-center text-prim-light">Loading wardrobe...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading &&
                  items.map((item) => (
                    <div 
                      key={item.id} 
                      className="relative w-24 h-24 overflow-hidden cursor-pointer transition-transform hover:scale-105"
                      onClick={() => handleItemClick(item)}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </SheetContent>
        <style jsx global>{`
          .fixed.inset-0 {
            background-color: transparent !important;
            transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
          
          [data-state="closed"] {
            animation: slideDown 200ms cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            pointer-events: none;
          }
          
          [data-state="open"] {
            animation: slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 1;
          }
          
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes slideDown {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(100%);
              opacity: 0;
            }
          }
          
          /* Ensure content fades with drawer */
          [data-state="closed"] * {
            opacity: 0;
            transition: opacity 150ms ease-out;
          }
          
          [data-state="open"] * {
            opacity: 1;
            transition: opacity 200ms ease-in;
          }
        `}</style>
      </Sheet>
    </div>
  );
}
