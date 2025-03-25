"use client";

import React from "react";
import { Look } from "@/app/lookbook/page";
import Image from "next/image";

type LookBookGalleryProps = {
  looks: Look[];
  onSelectLook: (index: number) => void;
};

export default function LookBookGallery({
  looks,
  onSelectLook,
}: LookBookGalleryProps) {
  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-semibold mb-6 text-prim-darkest">
        Your Look Book
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {looks.map((look, index) => (
          <div
            key={look.id}
            onClick={() => onSelectLook(index)}
            className="cursor-pointer rounded-lg overflow-hidden shadow-md"
          >
            <Image
              width={100}
              height={100}
              src={look.image}
              alt={look.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 transition-colors duration-200 hover:bg-gray-200">
              <p className="font-semibold text-center text-prim-darkest">
                {look.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
