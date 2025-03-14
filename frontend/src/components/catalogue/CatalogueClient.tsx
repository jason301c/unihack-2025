'use client';

import { ItemsSection } from './ItemsSection';
import { NavigationFooter } from './NavigationFooter';
import { QueryResult } from '@/app/catalogue/page';

interface CatalogueClientProps {
    items: QueryResult[];
}

export function CatalogueClient({ items }: CatalogueClientProps) {
  return (
    <>      
      <div className="space-y-8">
        {items.map(item => (
          <ItemsSection 
            key={item.query}
            query={item.query}
            images={item.images}
          />
        ))}
      </div>

      <NavigationFooter />
    </>
  );
}