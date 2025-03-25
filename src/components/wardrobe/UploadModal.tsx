"use client";
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type UploadModalProps = {
  onClose: () => void;
  onUploadFromRoll: () => void;
  onTakePhoto: () => void;
};

export default function UploadModal({
  onClose,
  onUploadFromRoll,
  onTakePhoto,
}: UploadModalProps) {
  return (
    <div className="fixed inset-0 bg-prim-darkest/90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl text-black">Add to Wardrobe</h3>
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
        </div>
      </div>
    </div>
  );
}
