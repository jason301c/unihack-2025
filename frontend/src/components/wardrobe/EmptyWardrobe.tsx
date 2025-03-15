"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ILLUSTRATIONS from "../../../constants/illustrations";
import BackButton from "./BackButton";

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
    <div className="flex flex-col items-center justify-center">
      <header className="flex items-center justify-center mb-6 relative w-full">
        <BackButton />
        <div className="text-lg font-semibold text-black mx-auto">
          My Wardrobe
        </div>
      </header>
      <p className="text-black font-xs mb-8 font-thin pr-4">
        Oops... No items found. Please choose one of the options below to add
        items.
      </p>
      <div className="w-90 bottom-[180px] left-0 right-0 z-0 flex justify-center">
        <Image
          width={200}
          height={200}
          src={ILLUSTRATIONS.emptyWardrobe}
          alt="No looks"
          className="object-contain w-auto max-h-[40vh]"
        />
      </div>
      <div className="space-y-5 w-full max-w-sm px-4">
        <Button
          variant="secondary"
          className="text-white w-full rounded-3xl py-6 bg-prim-darkest hover:text-black hover:bg-prim-light"
          onClick={onUploadFromRoll}
        >
          Upload from Camera Roll
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-prim-darkest hover:bg-prim-light hover:text-black text-white rounded-3xl py-6"
          onClick={onTakePhoto}
        >
          Take Photo
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-prim-darkest hover:bg-prim-light hover:text-black text-white rounded-3xl py-6"
          onClick={onBrowseCatalogue}
        >
          Browse Catalogue
        </Button>
      </div>
    </div>
  );
}
