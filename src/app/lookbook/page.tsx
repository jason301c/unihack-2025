"use client";

import { useState } from "react";
import EmptyLookBook from "@/components/lookbook/EmptyLookBook";
import LookBookGallery from "@/components/lookbook/LookBookGallery";
import LookBookDetail from "@/components/lookbook/LookBookDetail";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export type Look = {
  id: string;
  name: string;
  image: string; // single cover image
  itemsUsed: string[]; // e.g. ["Green Jacket", "Black Jeans"]
};
//
const initialLooks: Look[] = [
  {
    id: "1",
    name: "John's Basic Look",
    image: "/demo/gen-1.webp",
    itemsUsed: [
      "/demo/used-1.png",
      "/demo/base-white.jpg",
    ],
  },
  {
    id: "2",
    name: "John's Summer Look 🥵",
    image: "/demo/gen-2.webp",
    itemsUsed: [
      "/demo/use-123.png",
      "/demo/use-2.png",
    ],
  },
  {
    id: "3",
    name: "John's Uni Look",
    image: "/demo/gen-3.webp",
    itemsUsed: [
      "/demo/use-123.png",
      "/demo/use-3.webp",
    ],
  },
  {
    id: "4",
    name: "John's Studying Look",
    image: "/demo/gen-4.webp",
    itemsUsed: [
      "/demo/use-4.png",
      "/demo/use-45.jpeg",
    ],
  },
  {
    id: "5",
    name: "John's Winter Look",
    image: "/demo/gen-5.webp",
    itemsUsed: [
      "/demo/use-45.jpeg",
      "/demo/use-5.webp",
    ],
  },
];

export default function LookBookPage() {
  const [looks] = useState<Look[]>(initialLooks);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleSelectLook = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Link href="/home" className="flex justify-start p-4">
        <ArrowLeft className="w-6 h-6" />
      </Link>
      {looks.length === 0 ? (
        <EmptyLookBook />
      ) : selectedIndex >= 0 ? (
        <LookBookDetail looks={looks} initialIndex={selectedIndex} />
      ) : (
        <LookBookGallery looks={looks} onSelectLook={handleSelectLook} />
      )}
    </div>
  );
}
