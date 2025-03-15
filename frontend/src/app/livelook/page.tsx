"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import COLORS from "../../../constants/colors";
import ILLUSTRATIONS from "../../../constants/illustrations";
import { ArrowLeft, Shirt } from "lucide-react";
import { Sheet } from "react-modal-sheet";

export type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [snapHeight, setSnapHeight] = useState("60vh");
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
    <div
      className="flex flex-col h-screen relative"
      style={{ backgroundColor: COLORS.background, color: COLORS.text }}
    >
      {/* Header */}
      <header className="relative flex py-10 items-center h-16 px-4 shadow-md">
        <button className="text-white-800">
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Button to open bottom sheet */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
          style={{ backgroundColor: COLORS.secondary, color: COLORS.background }}
        >
          Try it out!
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden px-10">
        <img
          src={ILLUSTRATIONS.mannequin}
          alt="Description"
          className="w-full h-full object-fill object-top"
        />
      </div>

      {/* Reopen Button - Fixed at Bottom Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-green-600 transition"
        >
          Open Wardrobe!
        </button>
      )}

      {/* Bottom Sheet */}
      <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sheet.Container
          style={{
            height: snapHeight,
            transition: "height 0.3s ease-in-out",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
          className="bg-white shadow-lg"
        >
          <Sheet.Header />
          <Sheet.Content>
            <div className="flex flex-col items-center p-4">
              <h2 className="text-xl font-bold text-gray-900">Wardrobe Assistant</h2>

              {/* Segmented Control for "Tops" & "Bottoms" */}
              <div className="flex bg-gray-200 rounded-full mt-4 w-[300px]">
                <button
                  onClick={() => setSelectedValue("tops")}
                  className={`flex-1 px-4 py-2 rounded-full text-center transition-all ${
                    selectedValue === "tops" ? "bg-blue-500 text-white shadow-md" : "text-gray-700"
                  }`}
                >
                  Tops
                </button>
                <button
                  onClick={() => setSelectedValue("bottoms")}
                  className={`flex-1 px-4 py-2 rounded-full text-center transition-all ${
                    selectedValue === "bottoms" ? "bg-green-500 text-white shadow-md" : "text-gray-700"
                  }`}
                >
                  Bottoms
                </button>
              </div>

              {/* Wardrobe Grid */}
              <div className="grid grid-cols-3 gap-4 justify-items-center mt-6 py-4">
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
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </div>
  );
}
