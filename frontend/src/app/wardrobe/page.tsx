import React, { Suspense } from "react";
import { ClothingItem, WardrobeClient } from "@/components/wardrobe/WardrobeClient";
import WardrobeSkeleton from "@/components/wardrobe/WardrobeSkeleton";

// Server-side data fetching
async function fetchWardrobeItems(): Promise<ClothingItem[]> {
  try {
    const apiUrl = process.env.NEXT_SERVER_API_URL || "";
    const res = await fetch(`${apiUrl}/api/images`, { cache: 'no-store' }); // Use no-store for fresh data
    
    if (!res.ok) {
      throw new Error("Failed to fetch images");
    }
    
    const data = await res.json();
    return data.map((img: { url: string }, index: number) => ({
      id: index.toString(),
      name: `Item ${index + 1}`,
      imageUrl: img.url,
    }));
  } catch (error) {
    console.error("Error fetching wardrobe items:", error);
    return []; // Return empty array on error
  }
}

// Wardrobe content with data fetching
async function WardrobeContent() {
  const items = await fetchWardrobeItems();
  
  return (
    <WardrobeClient initialItems={items} />
  );
}

export default function Wardrobe() {
  return (
    <main className="min-h-screen min-v-screen text-white px-8 py-6 flex flex-col">
      <Suspense fallback={<WardrobeSkeleton />}>
        <WardrobeContent />
      </Suspense>
    </main>
  );
}
