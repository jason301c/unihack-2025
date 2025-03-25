"use client";

import { useState } from "react";

export default function HackathonDisclaimer() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleDismiss = () => {
    setShowDisclaimer(false);
  };

  if (!showDisclaimer) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={handleDismiss}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Limited Features Version</h2>
        <p className="mb-3">
          This is a post-hackathon deployment of Weave that contains only the
          subset of features that were submitted to UNIHACK 2025.
        </p>
        <p className="mb-3">
          This version runs completely locally with no backend services, so some
          functionality may be limited.
        </p>
        <p className="mb-3">
          Thanks for checking us out, and here are links to our{" "}
          <a
            href="https://github.com/jason301c/unihack-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub repository
          </a>{" "}
          and{" "}
          <a
            href="https://devpost.com/software/weave-vn2xdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            DevPost submission
          </a>
          .
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Click anywhere outside this box to dismiss
        </p>
      </div>
    </div>
  );
}
