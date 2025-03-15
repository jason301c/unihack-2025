"use client";

import { useState, MouseEvent, TouchEvent, useEffect } from "react";
import Image from "next/image";
import ILLUSTRATIONS from "../../../../constants/illustrations";
import { ArrowLeft, ArrowUp, X, Move } from "lucide-react";
import Wardrobe from "@/components/livelook/select-clothes/Wardrobe";
import { useLiveLook } from "@/app/livelook/page";

interface SelectClothesProps {
  onBack?: () => void;
  onNext?: () => void;
}

export default function SelectClothes({ onBack, onNext }: SelectClothesProps) {
  const { 
    topClothing, 
    bottomClothing, 
    setTopClothing, 
    setBottomClothing 
  } = useLiveLook();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [itemOffset, setItemOffset] = useState({ x: 0, y: 0 });
  const [activeItem, setActiveItem] = useState<"top" | "bottom" | null>(null);
  
  // Determine what type of clothing should be selected next
  const selectionType = !topClothing ? "tops" : !bottomClothing ? "bottoms" : null;
  const canOpenWardrobe = selectionType !== null;

  // Guide messages based on selection state
  let wardrobeButtonText = "Open Wardrobe";
  if (selectionType === "tops") {
    wardrobeButtonText = "Select a Top";
  } else if (selectionType === "bottoms") {
    wardrobeButtonText = "Select a Bottom";
  } else if (topClothing && bottomClothing) {
    wardrobeButtonText = "Wardrobe Complete";
  }

  /*
    Function to handle selecting a clothing item from the wardrobe.
    This function is passed down to the Wardrobe component.
  */
  const handleClothingSelect = (clothing: { id: string; imageUrl: string; type: "tops" | "bottoms" }) => {
    const newItem = {
      id: clothing.id,
      imageUrl: clothing.imageUrl,
      position: { x: 0, y: 0 },
      scale: 1
    };

    if (clothing.type === "tops") {
      setTopClothing(newItem);
    } else {
      setBottomClothing(newItem);
    }
    setIsOpen(false);
  };

  /*
    Function to remove a clothing item from the mannequin.
    This function is called when the user clicks the "X" button on a clothing item.
  */
  const removeItem = (type: "tops" | "bottoms") => {
    setActiveItem(null);
    if (type === "tops") {
      setTopClothing(null);
    } else {
      setBottomClothing(null);
    }
  };

  /*
    Functions to handle dragging and resizing clothing items.
    These functions are called when the user interacts with a clothing item.
  */
  const startDrag = (type: "top" | "bottom", clientX: number, clientY: number) => {
    const item = type === "top" ? topClothing : bottomClothing;
    if (!item) return;

    setIsDragging(type);
    setDragStart({ x: clientX, y: clientY });
    setItemOffset(item.position);
  };

  /*
    Functions to handle dragging and resizing clothing items.
    These functions are called when the user interacts with a clothing item.
  */
  const handleTouchStart = (type: "top" | "bottom", e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    setActiveItem(type);
    startDrag(type, touch.clientX, touch.clientY);
  };

  /*
    Functions to handle dragging and resizing clothing items.
    These functions are called when the user interacts with a clothing item.
  */
  const handleMouseDown = (type: "top" | "bottom", e: MouseEvent<HTMLDivElement>) => {
    setActiveItem(type);
    startDrag(type, e.clientX, e.clientY);
  };

  /*
    Functions to handle dragging and resizing clothing items.
    These functions are called when the user interacts with a clothing item.
  */
  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !dragStart) return;

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    const newPosition = {
      x: itemOffset.x + deltaX,
      y: itemOffset.y + deltaY
    };

    if (isDragging === "top" && topClothing) {
      setTopClothing({ ...topClothing, position: newPosition });
    } else if (isDragging === "bottom" && bottomClothing) {
      setBottomClothing({ ...bottomClothing, position: newPosition });
    }
  };

  /*
    Functions to handle dragging and resizing clothing items.
    These functions are called when the user interacts with a clothing item.
  */
  const handleResizeStart = (type: "top" | "bottom", e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const item = type === "top" ? topClothing : bottomClothing;
    if (!item) return;

    setIsResizing(type);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    setItemOffset({ x: item.scale, y: item.scale });
  };

  /*
    Functions to handle dragging and resizing clothing items.
    These functions are called when the user interacts with a clothing item.
  */
  const handleResize = (clientX: number, clientY: number) => {
    if (!isResizing || !dragStart) return;

    const deltaY = (clientY - dragStart.y) / 100;
    const newScale = Math.max(0.2, Math.min(3, itemOffset.x + deltaY));

    if (isResizing === "top" && topClothing) {
      setTopClothing({ ...topClothing, scale: newScale });
    } else if (isResizing === "bottom" && bottomClothing) {
      setBottomClothing({ ...bottomClothing, scale: newScale });
    }
  };

  /*
    Functions to handle dragging and resizing clothing items.
    These functions are called when the user interacts with a clothing item.
  */
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
  }, [isDragging, isResizing, handleMove, handleResize]);

  /*
    Function to dismiss the active clothing item when clicking outside of it.
    This function is called when the user clicks outside of a clothing item.
  */
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

  // Render a clothing item
  const renderClothingItem = (item: typeof topClothing, type: "top" | "bottom") => {
    if (!item) return null;
    
    return (
      <div 
        key={item.id}
        data-id={item.id}
        className={`fixed touch-none select-none clothing-item ${
          isDragging === type || isResizing === type ? 'z-50' : 'z-10'
        } cursor-move`}
        style={{
          transform: `translate(${item.position.x}px, ${item.position.y}px)`,
          transition: isDragging === type || isResizing === type ? 'none' : 'transform 0.2s ease-out',
          left: 0,
          top: 0,
          touchAction: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none'
        }}
        onTouchStart={(e) => handleTouchStart(type, e)}
        onMouseDown={(e) => handleMouseDown(type, e)}
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
            alt={`Selected ${type}`}
            width={500}
            height={800}
            className={`${
              type === "top"
                ? "object-contain pt-[15%] px-[15%] w-[50vh] h-[50vh]"
                : "object-fill w-[50vh] h-[50vh]"
            }`}
            draggable={false}
            unselectable="on"
          />
          {activeItem === type && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeItem(type === "top" ? "tops" : "bottoms");
                }}
                className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 transition-opacity"
              >
                <X className="h-4 w-4 text-white" />
              </button>
              <button
                onTouchStart={(e) => handleResizeStart(type, e)}
                onMouseDown={(e) => handleResizeStart(type, e)}
                className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-2 transition-opacity cursor-se-resize"
              >
                <Move className="h-4 w-4 text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen relative bg-white">
      {/* Header */}
      <header className="relative flex py-10 items-center h-16 px-4 z-[100] bg-white">
        <button className="text-prim-darkest" onClick={onBack}>
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Button to try it on (go next) - Only enabled when at least one item is selected */}
        <button
          onClick={onNext}
          disabled={!(topClothing || bottomClothing)}
          className={`absolute left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-xl shadow-md flex items-center gap-2 ${
            topClothing || bottomClothing
              ? "bg-prim-darkest text-prim-lightest hover:opacity-90 transition"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Try it on yourself!{" "}
          <Image
            src={"stars.svg"}
            alt="Icon"
            width={24}
            height={24}
            className={topClothing && bottomClothing ? "filter invert" : "opacity-50"}
          />
        </button>
      </header>

      {/* Selection guidance text */}
      {selectionType && (
        <div className="w-full text-center text-prim-darkest font-medium py-2 bg-green-100 bg-opacity-50">
          {selectionType === "tops" ? "Select a top first" : "Now select a bottom"}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 relative h-[85vh]">
        {/* Base mannequin */}
        <div className="w-full flex justify-center items-center pt-8">
          <Image
            src={ILLUSTRATIONS.mannequin}
            alt="Mannequin"
            width={1200}
            height={3000}
            className="h-[95vh] w-auto object-contain"
            priority
          />
        </div>
        
        {/* Render bottom first (lower layer) */}
        {renderClothingItem(bottomClothing, "bottom")}
        
        {/* Render top second (upper layer) */}
        {renderClothingItem(topClothing, "top")}
      </div>

      {/* Reopen Button - Fixed at Bottom */}
      <button
        onClick={() => canOpenWardrobe && setIsOpen(true)}
        disabled={!canOpenWardrobe}
        className={`footer-button fixed bottom-0 w-full text-lg font-semibold px-4 py-4 rounded-t-xl shadow-md flex items-center justify-between z-[100] ${
          canOpenWardrobe
            ? "bg-prim-darkest text-prim-light hover:opacity-90 transition"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        <span className="flex-1 text-center">{wardrobeButtonText}</span>
        {canOpenWardrobe && <ArrowUp className="w-6 h-6 text-prim-light" />}
      </button>

      {/* Wardrobe Component */}
      {canOpenWardrobe && (
        <Wardrobe 
          isOpen={isOpen} 
          onOpenChange={setIsOpen} 
          onSelectItem={handleClothingSelect}
          selectionType={selectionType as "tops" | "bottoms"}
        />
      )}
    </div>
  );
}
