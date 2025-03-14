'use client';

import { QueryResult } from "@/app/catalogue/page";
import Image from "next/image";

interface ItemsSectionProps {
  query: QueryResult['query'],
  images: QueryResult['images'],
}

// Remember to add brand name late
export function ItemsSection({ query, images }: ItemsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">{query}</h3>
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, idx) => (
          <div 
            key={idx}
            className="relative cursor-pointer"
          >
            <div className="bg-gray-800 aspect-square rounded-md overflow-hidden flex items-center justify-center">
              <Image
                src={image.link}
                alt={`Image for ${query}`}
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}