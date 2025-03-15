"use client";

import { ItemsSection } from "./ItemsSection";
import { QueryResult } from "@/app/catalogue/page";

interface CatalogueClientProps {
  items: QueryResult[];
}

export function CatalogueClient({ items }: CatalogueClientProps) {
  return (
    <div>
      <div className="space-y-4">
        {items.map((item) => (
          <ItemsSection
            key={item.query}
            query={item.query}
            images={item.images}
          />
        ))}
      </div>
    </div>
  );
}
