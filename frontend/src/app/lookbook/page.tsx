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
    name: "Emerald Forest",
    image: "/aiman.png",
    itemsUsed: [
      "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/444527/item/goods_00_444527_3x4.jpg?width=494",
      "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/444527/item/goods_00_444527_3x4.jpg?width=494",
    ],
  },
  {
    id: "2",
    name: "Urban Street",
    image: "https://image-pre-raw.s3.ap-southeast-2.amazonaws.com/IMG_2071.jpg",
    itemsUsed: [
      "https://image.uniqlo.com/UQ/ST3/au/imagesgoods/477984/item/augoods_00_477984_3x4.jpg",
      "https://image.uniqlo.com/UQ/ST3/au/imagesgoods/477984/item/augoods_00_477984_3x4.jpg",
    ],
  },
  {
    id: "3",
    name: "High Time",
    image: "/aiman.png",
    itemsUsed: [
      "https://image-pre-raw.s3.ap-southeast-2.amazonaws.com/tops/4152283_1500x.jpg",
      "https://image-pre-raw.s3.ap-southeast-2.amazonaws.com/tops/53326_GPFR_480x.jpg",
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
