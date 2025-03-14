'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface ClothingItem {
  id: string;
  image: string;
  name: string;
  brand: string;
}

const brands = ['Uniqlo', 'Zara', 'H&M'];

const clothingItems: Record<string, ClothingItem[]> = {
  'Uniqlo': [
    { id: '1', image: '/uniqlo-tshirt.png', name: 'Graphic T-Shirt', brand: 'Uniqlo' },
    { id: '2', image: '/uniqlo-shirt.png', name: 'Linen Shirt', brand: 'Uniqlo' },
    { id: '3', image: '/uniqlo-shirt-2.png', name: 'Linen Shirt', brand: 'Uniqlo' },
  ],
  'Zara': [
    { id: '4', image: '/zara-tshirt.png', name: 'Graphic T-Shirt', brand: 'Zara' },
    { id: '5', image: '/zara-shirt.png', name: 'Linen Shirt', brand: 'Zara' },
    { id: '6', image: '/zara-shirt-2.png', name: 'Linen Shirt', brand: 'Zara' },
  ],
  'H&M': [
    { id: '7', image: '/hm-tshirt.png', name: 'Graphic T-Shirt', brand: 'H&M' },
    { id: '8', image: '/hm-shirt.png', name: 'Linen Shirt', brand: 'H&M' },
    { id: '9', image: '/hm-pants.png', name: 'Cargo Pants', brand: 'H&M' },
  ],
};

export default function CataloguePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="p-4">
        <Link href="/" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
        </Link>
      </div>

      <div className="flex flex-col p-4 gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Choose items</h1>
          <h2 className="text-3xl font-bold">from the brands</h2>
          <h2 className="text-3xl font-bold">you <span className="text-yellow-200">love</span>.</h2>
        </div>

        {/* Search input */}
        <div className="mb-4">
          <p className="mb-2">Search for brands</p>
          <Input 
            type="text" 
            placeholder="E.g. Zara" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-none text-white placeholder:text-gray-500"
          />
        </div>

        {/* Brand sections */}
        <div className="space-y-8">
          {brands.map(brand => (
            <div key={brand} className="space-y-4">
              <h3 className="text-xl font-medium">{brand}</h3>
              <div className="grid grid-cols-3 gap-2">
                {clothingItems[brand].map(item => (
                  <div 
                    key={item.id} 
                    className={`relative cursor-pointer ${selectedItems.includes(item.id) ? 'ring-2 ring-yellow-200' : ''}`}
                    onClick={() => handleItemSelect(item.id)}
                  >
                    <div className="bg-gray-800 aspect-square rounded-md overflow-hidden flex items-center justify-center">
                      {/* This would be an actual image in production */}
                      <div className="text-xs text-center p-1">{item.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots and Next button */}
      <div className="mt-auto p-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
        </div>
        
        <button 
          className="bg-yellow-50 text-black px-6 py-2 rounded-full font-medium"
          onClick={() => console.log('Selected items:', selectedItems)}
        >
          Next
        </button>
      </div>
    </div>
  );
}