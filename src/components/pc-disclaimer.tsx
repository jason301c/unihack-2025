"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PCDisclaimerProps {
  onAccept: () => void;
}

export default function PCDisclaimer({ onAccept }: PCDisclaimerProps) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const isMobile = useIsMobile();

  // Effect to show disclaimer for PC users on first visit
  useEffect(() => {
    if (!isMobile) {
      setShowDisclaimer(true);
    } else {
      onAccept();
    }
  }, [isMobile, onAccept]);

  const handleAcceptDisclaimer = () => {
    setShowDisclaimer(false);
    onAccept();
  };

  if (!showDisclaimer) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4">Warning</h2>
        <p className="mb-6">
          For the best experience, please access Weave on your mobile device.
        </p>
        <p className="mb-6">
          If you&apos;re using a computer, you can simulate a mobile view by
          using your browser&apos;s inspect element tool.
        </p>
        <button
          onClick={handleAcceptDisclaimer}
          className="w-full py-3 bg-prim-default text-white rounded-full hover:bg-prim-darkest transition-colors"
        >
          Continue to Weave anyway
        </button>
      </div>
    </div>
  );
}
