"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type UploadModalProps = {
  onClose: () => void;
  onUploadFromRoll: () => void;
  onTakePhoto: () => void;
  onBrowseCatalogue: () => void;
};

export default function UploadModal({
  onClose,
  onUploadFromRoll,
  onTakePhoto,
  onBrowseCatalogue,
}: UploadModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Semi-transparent (or transparent) backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom panel */}
      <div className="relative bg-prim-default text-white p-6 rounded-t-3xl">
        <h2 className="text-xl font-bold mb-6">Choose an Option</h2>
        <div className="flex flex-col gap-3">
          <Button
            onClick={onUploadFromRoll}
            className="w-full bg-prim-darkest text-white hover:bg-prim-light hover:text-black rounded-full py-4"
          >
            Upload from Camera Roll
          </Button>
          <Button
            onClick={onTakePhoto}
            className="w-full bg-prim-darkest text-white rounded-full py-4 hover:bg-prim-light hover:text-black"
          >
            Open Camera &amp; Take Photo
          </Button>
          <Button
            onClick={onBrowseCatalogue}
            className="w-full bg-prim-darkest text-white rounded-full py-4 hover:bg-prim-light hover:text-black"
          >
            Browse Catalogue
          </Button>
        </div>
      </div>
    </div>
  );
}
