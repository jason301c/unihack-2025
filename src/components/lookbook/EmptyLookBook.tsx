"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ILLUSTRATIONS from "../../../constants/illustrations";
import { useRouter } from "next/navigation";

export default function EmptyLookBook() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center p-6">
      <div>
        <h1 className="text-2xl font-medium mb-4 text-prim-darkest text-left">
          Your Look Book
        </h1>
        <p className="font-thin mb-8 max-w-md pr-24">
          Looks like you haven’t saved any looks yet. Choose an option below to
          put together an outfit in Live Look or add new looks to your wardrobe.
        </p>
      </div>

      {/* Bottom container for buttons and overlapping image */}
      <div className="mt-auto w-full flex flex-col items-center relative justify-between">
        {/* Absolute positioned illustration behind the buttons */}
        <div className="w-100 bottom-[180px] left-0 right-0 z-0 flex justify-center">
          <Image
            width={200}
            height={200}
            src={ILLUSTRATIONS.emptyLookBook}
            alt="No looks"
            className="object-contain w-auto max-h-[40vh]"
          />
        </div>

        {/* Buttons container with higher z-index so they sit on top */}
        <div className="z-10 space-y-4 w-full mb-16">
          <Button
            variant="secondary"
            className="w-full px-8 py-6 rounded-full"
            onClick={() => router.push("/lookbook")}
          >
            Head to Live Look
          </Button>
          <Button
            variant="default"
            className="w-full py-6 rounded-full"
            onClick={() => router.push("/wardrobe")}
          >
            Head to Wardrobe
          </Button>
        </div>
      </div>
    </div>
  );
}
