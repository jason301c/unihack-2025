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
}

export default function Wardrobe({ isOpen, onOpenChange }: WardrobeProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  // Static wardrobe items
  const tops: ClothingItem[] = [
    { id: "1", name: "T-Shirt", imageUrl: "/images/tshirt.png" },
    { id: "2", name: "Jacket", imageUrl: "/images/jacket.png" },
    { id: "3", name: "Hoodie", imageUrl: "/images/hoodie.png" },
  ];

  const bottoms: ClothingItem[] = [
    { id: "4", name: "Jeans", imageUrl: "/images/jeans.png" },
    { id: "5", name: "Shorts", imageUrl: "/images/shorts.png" },
    { id: "6", name: "Joggers", imageUrl: "/images/joggers.png" },
  ];

  useEffect(() => {
    setSelectedValue("tops");
  }, []);

  if (selectedValue === null) return null;

  return (
    <div className="bg-prim-darkest">
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[60vh] rounded-t-[16px] px-0 bg-prim-darkest"
        >
          {/* Sheet Header and Close Button */}
          <SheetHeader className="flex justify-between items-center px-4 pt-6">
            <div className="flex justify-between items-center w-full px-2">
              <SheetTitle className="text-xl font-semibold text-prim-light">
                Wardrobe Assistant
              </SheetTitle>
              <button onClick={() => onOpenChange(false)}>
                <ArrowDown className="w-6 h-6 text-prim-light" />
              </button>
            </div>
          </SheetHeader>

            {/* Wardrobe Content */}
            <div className="flex flex-col h-full relative px-4">

            {/* Wardrobe Grid */}
            <div className="grid grid-cols-3 gap-4 justify-items-center mt-6 py-4 w-full">
              {(selectedValue === "tops" ? tops : bottoms).map((item) => (
              <div key={item.id} className="relative w-24 h-24">
                <Image
                src={item.imageUrl}
                alt={item.name}
                width={96}
                height={96}
                className="rounded-md object-cover"
                />
              </div>
              ))}
            </div>

            {/* Segmented Control for "Tops" & "Bottoms" */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <div className="flex bg-gray-200 rounded-full w-[300px]">
              <button
                onClick={() => setSelectedValue("tops")}
                className={`flex-1 px-4 py-2 rounded-full text-center transition-all ${
                selectedValue === "tops"
                  ? "bg-prim-dark text-white shadow-md"
                  : "text-prim-darkest"
                }`}
              >
                Tops
              </button>
              <button
                onClick={() => setSelectedValue("bottoms")}
                className={`flex-1 px-4 py-2 rounded-full text-center transition-all ${
                selectedValue === "bottoms"
                  ? "bg-prim-dark text-white shadow-md"
                  : "text-prim-darkest"
                }`}
              >
                Bottoms
              </button>
              </div>
            </div>
          </div>
        </SheetContent>
        <style jsx global>{`
          .fixed.inset-0 {
            background-color: rgba(
              0,
              0,
              0,
              0.2
            ) !important; /* Reduced darkness */
          }
        `}</style>
      </Sheet>
    </div>
  );
}
