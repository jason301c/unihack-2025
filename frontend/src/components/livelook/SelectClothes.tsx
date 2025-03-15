"use client";

import { useState, useRef, MouseEvent, TouchEvent, useEffect } from "react";
import Image from "next/image";
import ILLUSTRATIONS from "../../../constants/illustrations";
import { ArrowLeft, ArrowUp, X, Move } from "lucide-react";
import Wardrobe from "@/components/livelook/Wardrobe";

interface SelectedClothing {
  id: string;
  imageUrl: string;
  type: "tops" | "bottoms";
  position: { x: number; y: number };
  scale: number;
}

interface SelectClothesProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function SelectClothes({ onBack, onNext }: SelectClothesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClothes, setSelectedClothes] = useState<SelectedClothing[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [itemOffset, setItemOffset] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClothingSelect = (clothing: Omit<SelectedClothing, "position" | "scale">) => {
    setSelectedClothes(prev => [...prev, { ...clothing, position: { x: 0, y: 0 }, scale: 1 }]);
  };

  const removeItem = (id: string) => {
    setActiveItem(null);
    setSelectedClothes(prev => prev.filter(item => item.id !== id));
  };

  const startDrag = (id: string, clientX: number, clientY: number) => {
    const item = selectedClothes.find(item => item.id === id);
    if (!item) return;

    setIsDragging(id);
    setDragStart({ x: clientX, y: clientY });
    setItemOffset(item.position);
  };

  const handleTouchStart = (id: string, e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];

    // Set active item immediately
    setActiveItem(id);
    
    // Start drag immediately
    startDrag(id, touch.clientX, touch.clientY);
  };

  const handleMouseDown = (id: string, e: MouseEvent<HTMLDivElement>) => {
    // Set active item immediately
    setActiveItem(id);
    
    // Start drag immediately
    startDrag(id, e.clientX, e.clientY);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !dragStart) return;

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    setSelectedClothes(prev => prev.map(item => {
      if (item.id === isDragging) {
        return {
          ...item,
          position: {
            x: itemOffset.x + deltaX,
            y: itemOffset.y + deltaY
          }
        };
      }
      return item;
    }));
  };

  const handleResizeStart = (id: string, e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const item = selectedClothes.find(item => item.id === id);
    if (!item) return;

    setIsResizing(id);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    setItemOffset({ x: item.scale, y: item.scale });
  };

  const handleResize = (clientX: number, clientY: number) => {
    if (!isResizing || !dragStart) return;

    const deltaY = (clientY - dragStart.y) / 100;
    const newScale = Math.max(0.2, Math.min(3, itemOffset.x + deltaY));

    setSelectedClothes(prev => prev.map(item => {
      if (item.id === isResizing) {
        return {
          ...item,
          scale: newScale
        };
      }
      return item;
    }));
  };

  useEffect(() => {
    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!isDragging && !isResizing) return;
      
      e.preventDefault();
      const touch = e.touches[0];
      
      if (isDragging) {
        handleMove(touch.clientX, touch.clientY);
      } else if (isResizing) {
        handleResize(touch.clientX, touch.clientY);
      }
    };

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      } else if (isResizing) {
        handleResize(e.clientX, e.clientY);
      }
    };

    const handleEnd = () => {
      setDragStart(null);
      setIsDragging(null);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isResizing, dragStart]);

  // Handle clicking outside to dismiss active item
  useEffect(() => {
    const handleDismiss = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (!activeItem) return;

      const target = e.target as HTMLElement;
      const isClothingItem = target.closest('.clothing-item');
      const isButton = target.closest('button');

      if (!isClothingItem && !isButton) {
        setActiveItem(null);
      }
    };

    document.addEventListener('mousedown', handleDismiss);
    document.addEventListener('touchstart', handleDismiss, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleDismiss);
      document.removeEventListener('touchstart', handleDismiss);
    };
  }, [activeItem]);

  const renderItems = (type: "tops" | "bottoms") => {
    return selectedClothes
      .filter(item => item.type === type)
      .map((item) => (
        <div 
          key={item.id}
          data-id={item.id}
          className={`fixed touch-none select-none clothing-item ${
            isDragging === item.id || isResizing === item.id ? 'z-50' : 'z-10'
          } cursor-move`}
          style={{
            transform: `translate(${item.position.x}px, ${item.position.y}px)`,
            transition: isDragging === item.id || isResizing === item.id ? 'none' : 'transform 0.2s ease-out',
            left: 0,
            top: 0,
            touchAction: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
          onTouchStart={(e) => handleTouchStart(item.id, e)}
          onMouseDown={(e) => handleMouseDown(item.id, e)}
        >
          <div 
            className="relative"
            style={{ 
              transform: `scale(${item.scale})`,
              transformOrigin: 'top left',
              willChange: 'transform'
            }}
          >
            <Image
              src={item.imageUrl}
              alt="Selected clothing"
              width={500}
              height={800}
              className={`${
                type === "tops" 
                  ? "object-contain pt-[15%] px-[15%] w-[50vh] h-[50vh]" 
                  : "object-fill w-[50vh] h-[50vh]"
              }`}
              draggable={false}
              unselectable="on"
            />
            {activeItem === item.id && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 transition-opacity"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
                <button
                  onTouchStart={(e) => handleResizeStart(item.id, e)}
                  onMouseDown={(e) => handleResizeStart(item.id, e)}
                  className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-2 transition-opacity cursor-se-resize"
                >
                  <Move className="h-4 w-4 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      ));
  };

  return (
    <div className="flex flex-col h-screen relative bg-white">
      {/* Header */}
      <header className="relative flex py-10 items-center h-16 px-4 z-[100] bg-white">
        <button className="text-prim-darkest" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Button to try it on (go next) */}
        <button
          onClick={onNext}
          className="absolute left-1/2 transform -translate-x-1/2 bg-prim-darkest text-prim-lightest px-4 py-2 rounded-xl shadow-md hover:opacity-90 transition flex items-center gap-2"
        >
          Try it on yourself!{" "}
          <Image
            src={"stars.svg"}
            alt="Icon"
            width={24}
            height={24}
            className="filter invert"
          />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        {/* Base mannequin */}
        <Image
          src={ILLUSTRATIONS.mannequin}
          alt="Mannequin"
          width={500}
          height={800}
          className="w-full h-full object-fill object-top"
          priority
        />
        
        {/* Render bottoms first (lower layer) */}
        {renderItems("bottoms")}
        
        {/* Render tops second (upper layer) */}
        {renderItems("tops")}
      </div>

      {/* Reopen Button - Fixed at Bottom */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="footer-button fixed bottom-0 w-full bg-prim-darkest text-prim-light text-lg font-semibold px-4 py-4 rounded-t-xl shadow-md hover:opacity-90 transition flex items-center justify-between z-[100]"
        >
          <span className="flex-1 text-center">Open Wardrobe</span>
          <ArrowUp className="w-6 h-6 text-prim-light" />
        </button>
      )}

      {/* Wardrobe Component */}
      <Wardrobe 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        onSelectItem={handleClothingSelect}
      />
    </div>
  );
}
