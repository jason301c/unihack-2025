"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Look } from "@/app/lookbook/page";
import { Button } from "@/components/ui/button";
import { Share } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

type LookBookDetailProps = {
  looks: Look[];
  initialIndex: number;
};

export default function LookBookDetail({
  looks,
  initialIndex,
}: LookBookDetailProps) {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [api, setApi] = useState<CarouselApi | null>(null);
  useEffect(() => {
    if (!api) return;

    api.scrollTo(initialIndex);
    setActiveIndex(initialIndex);

    const onSelect = () => {
      // Ensure the index is within bounds
      console.log(api.selectedScrollSnap())
      setActiveIndex(api.selectedScrollSnap())
    };

    // Set initial active index and listen to carousel changes.
    api.on("select", onSelect);
  }, [api]);

  const activeLook = looks[activeIndex];

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex justify-between">
      {/* Active Look Title */}
      <h1 className="text-3xl font-medium mb-4 text-prim-darkest">
        {activeLook.name}
      </h1>
      <Button variant="ghost"><Share></Share></Button>
      </div>
      
      {/* Carousel Container with extra width for peeking */}
      <Carousel
        opts={{ align: "center",}}
        setApi={setApi}
        className="w-full max-w-3xl mx-auto"
      >
        {/* Add horizontal padding so first/last slides can center */}
        <CarouselContent className="px-8">
          {looks.map((look) => (
            <CarouselItem
              key={look.id}
              className="snap-center pl-4"
              style={{ width: "200px" }} // fixed width to allow peeking
            >
              <div className="relative h-60 rounded-lg shadow-md bg-gray-100">
                <Image
                  src={look.image}
                  alt={look.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Items Used for the active look */}
      <h2 className="text-xl font-semibold mb-2 text-center text-prim-darkest mt-8">
        Items Used
      </h2>
      <div className="mt-8 mb-6 flex justify-center gap-8">
        {activeLook.itemsUsed.slice(0, 2).map((item, idx) => (
          <Image
            key={idx}
            width={120}
            height={120}
            src={item}
            alt={`Item ${idx + 1}`}
            className="object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
