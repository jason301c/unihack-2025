"use client";

import React from "react";
import { X } from "lucide-react";
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black">Add to wardrobe</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-black"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <Button
            variant="secondary"
            className="w-full bg-prim-darkest hover:bg-prim-light hover:text-black text-white rounded-3xl py-6"
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
    </div>
  );
}
