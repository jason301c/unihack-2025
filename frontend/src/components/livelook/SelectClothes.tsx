"use client";

import { useState } from "react";
import Image from "next/image";
import ILLUSTRATIONS from "../../../constants/illustrations";
import { ArrowLeft, ArrowUp } from "lucide-react";
import Wardrobe from "@/components/livelook/Wardrobe";

interface SelectClothesProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function SelectClothes({ onBack, onNext }: SelectClothesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen relative bg-white">
      {/* Header */}
      <header className="relative flex py-10 items-center h-16 px-4">
        <button className="text-prim-darkest" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Button to try it on (go next) */}
        <button
          onClick={onNext}
          className="absolute left-1/2 transform -translate-x-1/2 bg-prim-darkest text-prim-lightest px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition flex items-center gap-2"
        >
          Try it on yourself! <Image src={'stars.svg'} alt="Icon" width={24} height={24} className="filter invert" />
        </button>
      </header>

      {/* Main Content */}
    <div className="flex flex-1 overflow-hidden px-10">
      <Image
        src={ILLUSTRATIONS.mannequin}
        alt="Mannequin"
        width={500}
        height={800}
        className="w-full h-full object-fill object-top"
        priority
      />
    </div>

      {/* Reopen Button - Fixed at Bottom */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-0 w-full bg-prim-darkest text-prim-light text-lg font-semibold px-4 py-4 rounded-t-xl shadow-md hover:opacity-90 transition flex items-center justify-between"
        >
          <span className="flex-1 text-center">Open Wardrobe</span>
          <ArrowUp className="w-6 h-6 text-prim-light"/>
        </button>
      )}

      {/* Wardrobe Component */}
      <Wardrobe isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}