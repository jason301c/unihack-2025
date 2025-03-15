'use client';

import { QueryResult } from "@/app/catalogue/page";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ItemsSectionProps {
  query: QueryResult['query'],
  images: QueryResult['images'],
}

export function ItemsSection({ query, images }: ItemsSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-medium text-gray-200">{query}</h3>
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
                className="object-contain"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImcxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMTgxODFiIiAvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjMjAyMDI1IiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE4MTgxYiIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnMSkiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDEwMCAxMDAiIHRvPSIzNjAgMTAwIDEwMCIgZHVyPSI0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3JlY3Q+PC9zdmc+"
                loading="lazy"
              />
                {image.brand && (
                  <Badge
                    className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 transition-colors duration-200 text-white font-sm px-2 py-1 text-sm rounded-sm shadow-lg backdrop-blur-sm"
                  >
                    {image.brand}
                  </Badge>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}