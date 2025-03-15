"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

type EmptyWardrobeProps = {
  onUploadFromRoll?: () => void;
  onTakePhoto?: () => void;
  onBrowseCatalogue?: () => void;
};

export default function EmptyWardrobe({
  onUploadFromRoll,
  onTakePhoto,
  onBrowseCatalogue,
}: EmptyWardrobeProps) {
  return (
    <div className="flex-grow flex flex-col items-center ">
      <p className="text-white font-xs mb-8 font-thin">
        Oops... No items found. Please choose one of the options below to add
        items.
      </p>
      <div className="relative w-40 h-40 bg-white mb-8 mx-auto rounded-md">
        <Image
          src="/placeholder.png"
          alt="No items placeholder"
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-3 w-full max-w-sm">
        <Button
          variant="secondary"
          className="w-full rounded-3xl"
          onClick={onUploadFromRoll}
        >
          Upload from Camera Roll
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-3xl"
          onClick={onTakePhoto}
        >
          Take Photo
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-3xl"
          onClick={onBrowseCatalogue}
        >
          Browse Catalogue
        </Button>
      </div>
    </div>
  );
}
