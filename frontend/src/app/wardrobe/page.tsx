"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EmptyWardrobe from "@/components/wardrobe/EmptyWardrobe";
import WardrobeGrid from "@/components/wardrobe/WardrobeGrid";

type ClothingItem = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function Wardrobe() {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images`);
        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        setItems(
          data.map((img: { url: string }, index: number) => ({
            id: index.toString(),
            name: `Item ${index + 1}`,
            imageUrl: img.url,
          }))
        );
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Could not load wardrobe items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <header className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">My Wardrobe</h2>
        <Button variant="secondary" className="hover:bg-gray-200 rounded-3xl">
          Edit
        </Button>
      </header>

      {/* Loading state */}
      {loading && <p className="text-center">Loading wardrobe...</p>}

      {/* Error state */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show wardrobe items or empty state */}
      {!loading && !error && (
        items.length === 0 ? (
          <EmptyWardrobe />
        ) : (
          <WardrobeGrid 
            items={items} 
            onRemoveItem={(id) => console.log("Remove item:", id)} 
            onAddItem={() => console.log("Add item clicked")}
          />
        )
      )}
    </main>
  );
}
